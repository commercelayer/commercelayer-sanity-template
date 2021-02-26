import {SanityDocument} from '@sanity/types'
import {ApiError, StreamError, StreamResult} from './types'

export function isStreamError(result: StreamResult | undefined): result is StreamError {
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

export function getError(body: ApiError): string {
  if (typeof body === 'object' && 'error' in body && 'message' in body) {
    return body.message || body.error
  }

  return '<unknown error>'
}

export function isRelevantDocument(doc: SanityDocument): boolean {
  return !doc._id.startsWith('_.')
}
