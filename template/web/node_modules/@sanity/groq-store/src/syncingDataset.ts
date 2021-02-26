import {SanityDocument} from '@sanity/types'
import {listen} from './listen'
import {getPublishedId} from './drafts'
import {applyPatchWithoutRev} from './patch'
import {Config, EnvImplementations, MutationEvent, Subscription} from './types'

const DEBOUNCE_MS = 25

function noop() {
  return Promise.resolve()
}

export function getSyncingDataset(
  config: Config,
  onNotifyUpdate: (docs: SanityDocument[]) => void,
  {getDocuments, EventSource}: EnvImplementations
): Subscription & {loaded: Promise<void>} {
  const {projectId, dataset, listen: useListener, overlayDrafts, documentLimit} = config

  if (!useListener) {
    const loaded = getDocuments({projectId, dataset, documentLimit}).then(onUpdate).then(noop)
    return {unsubscribe: noop, loaded}
  }

  const indexedDocuments = new Map<string, SanityDocument>()

  // undefined until the listener has been set up and the initial export is done
  let documents: SanityDocument[] | undefined

  // holds any mutations that happen while fetching documents so they can be applied after updates
  const buffer: MutationEvent[] = []

  // Return a promise we can resolve once we've established a listener and reconciled any mutations
  let onDoneLoading: () => void
  let onLoadError: (error: Error) => void
  const loaded = new Promise<void>((resolve, reject) => {
    onDoneLoading = resolve
    onLoadError = reject
  })

  // We don't want to flush updates while we're in the same transaction, so a normal
  // throttle/debounce wouldn't do it. We need to wait and see if the next mutation is
  // within the same transaction as the previous, and if not we can flush. Of course,
  // we can't wait forever, so an upper threshold of X ms should be counted as "ok to flush"
  let stagedDocs: SanityDocument[] | undefined
  let previousTrx: string | undefined
  let flushTimeout: number | undefined

  const listener = listen(EventSource, config, {
    next: onMutationReceived,
    open: onOpen,
    error: (error: Error) => onLoadError(error),
  })

  return {unsubscribe: listener.unsubscribe, loaded}

  async function onOpen() {
    const initial = await getDocuments({projectId, dataset, documentLimit})
    documents = applyBufferedMutations(initial, buffer)
    documents.forEach((doc) => indexedDocuments.set(doc._id, doc))
    onUpdate(documents)
    onDoneLoading()
  }

  function onMutationReceived(msg: MutationEvent) {
    if (documents) {
      applyMutation(msg)
      scheduleUpdate(documents, msg)
    } else {
      buffer.push(msg)
    }
  }

  function scheduleUpdate(docs: SanityDocument[], msg: MutationEvent) {
    clearTimeout(flushTimeout)

    if (previousTrx !== msg.transactionId && stagedDocs) {
      // This is a new transaction, meaning we can immediately flush any pending
      // doc updates if there are any
      onUpdate(stagedDocs)
      previousTrx = undefined
    } else {
      previousTrx = msg.transactionId
      stagedDocs = docs.slice()
    }

    flushTimeout = setTimeout(onUpdate, DEBOUNCE_MS, docs.slice())
  }

  function onUpdate(docs: SanityDocument[]) {
    stagedDocs = undefined
    flushTimeout = undefined
    previousTrx = undefined
    onNotifyUpdate(overlayDrafts ? overlay(docs) : docs)
  }

  function applyMutation(msg: MutationEvent) {
    if (!msg.effects || msg.documentId.startsWith('_.')) {
      return
    }

    const document = indexedDocuments.get(msg.documentId) || null
    replaceDocument(msg.documentId, applyPatchWithoutRev(document, msg.effects.apply))
  }

  function replaceDocument(id: string, document: SanityDocument | null) {
    const current = indexedDocuments.get(id)
    const docs = documents || []
    const position = current ? docs.indexOf(current) : -1

    if (position === -1 && document) {
      // Didn't exist previously, but was now created. Add it.
      docs.push(document)
      indexedDocuments.set(id, document)
    } else if (document) {
      // Existed previously and still does. Replace it.
      docs.splice(position, 1, document)
      indexedDocuments.set(id, document)
    } else {
      // Existed previously, but is now deleted. Remove it.
      docs.splice(position, 1)
      indexedDocuments.delete(id)
    }
  }
}

function applyBufferedMutations(
  documents: SanityDocument[],
  mutations: MutationEvent[]
): SanityDocument[] {
  // Group by document ID
  const groups = new Map<string, MutationEvent[]>()
  mutations.forEach((mutation) => {
    const group = groups.get(mutation.documentId) || []
    group.push(mutation)
    groups.set(mutation.documentId, group)
  })

  // Discard all mutations that happened before our current document
  groups.forEach((group, id) => {
    const document = documents.find((doc) => doc._id === id)
    if (!document) {
      // @todo handle
      // eslint-disable-next-line no-console
      console.warn('Received mutation for missing document %s', id)
      return
    }

    // Mutations are sorted by timestamp, apply any that arrived after
    // we fetched the initial documents
    let hasFoundRevision = false
    let current: SanityDocument | null = document
    group.forEach((mutation) => {
      hasFoundRevision = hasFoundRevision || mutation.previousRev === document._rev
      if (!hasFoundRevision) {
        return
      }

      if (mutation.effects) {
        current = applyPatchWithoutRev(current, mutation.effects.apply)
      }
    })

    // Replace the indexed documents
    documents.splice(documents.indexOf(document), 1, current)
  })

  return documents
}

function overlay(documents: SanityDocument[]): SanityDocument[] {
  const overlayed = new Map<string, SanityDocument>()

  documents.forEach((doc) => {
    const existing = overlayed.get(getPublishedId(doc))
    if (doc._id.startsWith('drafts.')) {
      // Drafts always overlay
      overlayed.set(getPublishedId(doc), pretendThatItsPublished(doc))
    } else if (!existing) {
      // Published documents only override if draft doesn't exist
      overlayed.set(doc._id, doc)
    }
  })

  return Array.from(overlayed.values())
}

// Strictly speaking it would be better to allow groq-js to resolve `draft.<id>`,
// but for now this will have to do
function pretendThatItsPublished(doc: SanityDocument): SanityDocument {
  return {...doc, _id: getPublishedId(doc)}
}
