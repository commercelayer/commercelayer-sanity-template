import { EnvObject } from '../typings/env'

export const searchEngineList = () => {
  const { BUILD_SEARCH_ENGINE } = process.env as EnvObject
  return BUILD_SEARCH_ENGINE || ''
}
