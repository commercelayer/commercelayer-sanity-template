import {SanityDocument} from '@sanity/types'

export function isDraft(doc: SanityDocument): boolean {
  return doc._id.startsWith('drafts.')
}

export function getPublishedId(document: SanityDocument): string {
  return isDraft(document) ? document._id.slice(7) : document._id
}
