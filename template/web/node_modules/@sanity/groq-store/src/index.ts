/**
 * Note: Entry point for _browser_ build is in browser/index.ts
 */
import EventSource from 'eventsource'
import {groqStore as groqStoreApi} from './groqStore'
import {Config, EnvImplementations, GroqStore} from './types'
import {getDocuments} from './node/getDocuments'
import {assertEnvSupport} from './node/support'

export function groqStore(config: Config): GroqStore {
  assertEnvSupport()

  return groqStoreApi(config, {
    EventSource: (EventSource as any) as EnvImplementations['EventSource'],
    getDocuments,
  })
}

export {default as groq} from 'groq'
export {Subscription, GroqStore} from './types'
