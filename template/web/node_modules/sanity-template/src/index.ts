import * as v1 from './manifest/v1'
import * as v2 from './manifest/v2'
import * as migrate from './manifest/migrate'
import {toCurrent} from './manifest/migrate'
import {Invalid, Valid} from './manifest/common/error'

export {v1}
export {v2}
export {v2 as current}

export function parseAsCurrent(allegedTemplate: any): Invalid | Valid<v2.TemplateManifest> {
  const parsed = migrate.parse(allegedTemplate)
  if (parsed.type === 'invalid') {
    return parsed
  }
  return {type: 'valid', manifest: toCurrent(parsed.manifest)}
}
