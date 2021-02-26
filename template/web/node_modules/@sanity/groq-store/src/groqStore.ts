import groq from 'groq'
import deepEqual from 'fast-deep-equal'
import {throttle} from 'throttle-debounce'
import {SanityDocument} from '@sanity/types'
import {parse, evaluate} from 'groq-js'
import {Config, EnvImplementations, GroqSubscription, GroqStore, Subscription} from './types'
import {getSyncingDataset} from './syncingDataset'

export function groqStore(config: Config, envImplementations: EnvImplementations): GroqStore {
  let documents: SanityDocument[] = []
  const executeThrottled = throttle(config.subscriptionThrottleMs || 50, executeAllSubscriptions)
  const activeSubscriptions: GroqSubscription[] = []

  let dataset: Subscription & {loaded: Promise<void>}

  async function loadDataset() {
    if (!dataset) {
      dataset = getSyncingDataset(
        config,
        (docs) => {
          documents = docs
          executeThrottled()
        },
        envImplementations
      )
    }

    await dataset.loaded
  }

  async function query<R = any>(groqQuery: string, params?: Record<string, unknown>): Promise<R> {
    await loadDataset()
    const tree = parse(groqQuery)
    const result = await evaluate(tree, {dataset: documents, params})
    return result.get()
  }

  async function getDocument(documentId: string): Promise<SanityDocument | null> {
    await loadDataset()
    return query(groq`*[_id == $id][0]`, {id: documentId})
  }

  async function getDocuments(documentIds: string[]): Promise<(SanityDocument | null)[]> {
    await loadDataset()
    const subQueries = documentIds.map((id) => `*[_id == "${id}"][0]`).join(',\n')
    return query(`[${subQueries}]`)
  }

  function subscribe<R = any>(
    groqQuery: string,
    params: Record<string, unknown>,
    callback: (error: Error | undefined, result?: R) => void
  ): Subscription {
    if (!config.listen) {
      throw new Error('Cannot use `subscribe()` without `listen: true`')
    }

    // @todo Execute the query against an empty dataset for validation purposes

    // Store the subscription so we can re-run the query on new data
    const subscription = {query: groqQuery, params, callback}
    activeSubscriptions.push(subscription)

    let unsubscribed = false
    const unsubscribe = () => {
      if (unsubscribed) {
        return Promise.resolve()
      }

      unsubscribed = true
      activeSubscriptions.splice(activeSubscriptions.indexOf(subscription), 1)
      return Promise.resolve()
    }

    executeQuerySubscription(subscription)
    return {unsubscribe}
  }

  function executeQuerySubscription(subscription: GroqSubscription) {
    return query(subscription.query, subscription.params)
      .then((res) => {
        if ('previousResult' in subscription && deepEqual(subscription.previousResult, res)) {
          return
        }

        subscription.previousResult = res
        subscription.callback(undefined, res)
      })
      .catch((err) => {
        subscription.callback(err)
      })
  }

  function executeAllSubscriptions() {
    activeSubscriptions.forEach(executeQuerySubscription)
  }

  function close() {
    executeThrottled.cancel()
    return dataset ? dataset.unsubscribe() : Promise.resolve()
  }

  return {query, getDocument, getDocuments, subscribe, close}
}
