import {templateManifest, TemplateManifest} from './manifest'
import {ZodError} from 'zod'
import {Invalid, ManifestError, Valid} from '../common/error'

export {ManifestError}

export function parse(input: any): Valid<TemplateManifest> | Invalid {
  try {
    templateManifest.parse(input)
  } catch (err) {
    if (!(err instanceof ZodError)) {
      throw err
    }
    return {
      type: 'invalid',
      errors: err.errors.map((err): ManifestError => ({path: err.path, message: err.message})),
      manifest: input
    }
  }
  return {type: 'valid', manifest: input}
}
