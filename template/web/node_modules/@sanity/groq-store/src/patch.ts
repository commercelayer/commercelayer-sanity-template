import {SanityDocument} from '@sanity/types'
import {applyPatch} from 'mendoza'

export function applyPatchWithoutRev(
  doc: SanityDocument | null,
  patch: unknown[]
): SanityDocument | null {
  const patchDoc = {...doc} as Omit<SanityDocument, '_rev'>
  delete patchDoc._rev
  return applyPatch(patchDoc, patch)
}
