import { EnvObject } from '../typings/env'
import sanityApi from './sanity/api'

export const cmsList = () => {
  const { BUILD_CMS } = process.env as EnvObject
  return BUILD_CMS
}

export const cmsFunctions: Record<string, any> = {
  ...sanityApi
}
