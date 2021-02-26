import {SanityDocument} from '@sanity/types'
import {EnvImplementations} from '../types'

type StreamError = {error: {description?: string; type: string}}
type StreamResult = SanityDocument | StreamError

export const getDocuments: EnvImplementations['getDocuments'] = async function getDocuments({
  projectId,
  dataset,
  token,
  documentLimit,
}: {
  projectId: string
  dataset: string
  token?: string
  documentLimit?: number
}): Promise<SanityDocument[]> {
  const url = `https://${projectId}.api.sanity.io/v1/data/export/${dataset}`
  const headers = token ? {Authorization: `Bearer ${token}`} : undefined
  const response = await fetch(url, {credentials: 'include', headers})

  if (response.status !== 200) {
    throw new Error(`Error streaming dataset: ${getError(await response.json())}`)
  }

  const stream = getDocumentStream(response.body)
  const reader = stream.getReader()

  const documents: SanityDocument[] = []
  let result
  let document
  do {
    result = await reader.read()
    document = result.value

    if (isStreamError(document)) {
      throw new Error(`Error streaming dataset: ${document.error}`)
    } else if (document && isRelevantDocument(document)) {
      documents.push(document)
    }

    if (documentLimit && documents.length > documentLimit) {
      reader.cancel('Reached document limit')
      throw new Error(`Error streaming dataset: Reached limit of ${documentLimit} documents`)
    }
  } while (!result.done)

  return documents
}

function getDocumentStream(body: Response['body']): ReadableStream<StreamResult> {
  if (!body) {
    throw new Error('Failed to read body from response')
  }

  let reader: ReadableStreamDefaultReader<Uint8Array> | undefined
  let cancelled = false

  function cancel() {
    cancelled = true
    if (reader) {
      reader.cancel()
    }
  }

  return new ReadableStream<SanityDocument>({
    start(controller): void | PromiseLike<void> {
      reader = body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''

      reader
        .read()
        .then(processResult)
        .catch((err) => controller.error(err))

      async function processResult(result: ReadableStreamReadResult<Uint8Array>): Promise<void> {
        if (result.done) {
          if (cancelled) {
            return
          }

          buffer = buffer.trim()
          if (buffer.length === 0) {
            controller.close()
            return
          }

          controller.enqueue(JSON.parse(buffer))
          controller.close()
          return
        }

        buffer += decoder.decode(result.value, {stream: true})
        const lines = buffer.split('\n')

        for (let i = 0; i < lines.length - 1; ++i) {
          const line = lines[i].trim()
          if (line.length === 0) {
            continue
          }

          try {
            controller.enqueue(JSON.parse(line))
          } catch (err) {
            controller.error(err)
            cancel()
            return
          }
        }

        buffer = lines[lines.length - 1]

        if (!reader) {
          return
        }

        try {
          processResult(await reader.read())
        } catch (err) {
          controller.error(err)
        }
      }
    },

    cancel,
  })
}

function isStreamError(result: StreamResult | undefined): result is StreamError {
  if (!result) {
    return false
  }

  if (!('error' in result) || typeof result.error !== 'object' || result.error === null) {
    return false
  }

  return (
    'description' in result.error &&
    typeof (result as StreamError).error.description === 'string' &&
    !('_id' in result)
  )
}

function getError(body: any): string {
  if (typeof body === 'object' && 'error' in body && 'message' in body) {
    return body.message || body.error
  }

  return '<unknown error>'
}

function isRelevantDocument(doc: SanityDocument): boolean {
  return !doc._id.startsWith('_.')
}
