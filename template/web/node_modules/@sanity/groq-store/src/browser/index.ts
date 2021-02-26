import {groqStore as groqStoreApi} from '../groqStore'
import {Config, GroqStore} from '../types'
import {getDocuments} from './getDocuments'
import {assertEnvSupport} from './support'

export function groqStore(config: Config): GroqStore {
  assertEnvSupport()

  if (config.token) {
    throw new Error('`token` option not currently supported in browser')
  }

  return groqStoreApi(config, {
    EventSource: window.EventSource,
    getDocuments,
  })
}

export {default as groq} from 'groq'
export {Subscription, GroqStore} from '../types'
