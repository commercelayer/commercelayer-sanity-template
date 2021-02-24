import { EnvObject } from '../typings/env'
import contentfulApi from './contentful/api'
import datoApi from './dato/api'
import sanityApi from './sanity/api'

export const cmsList = () => {
  const { BUILD_CMS } = process.env as EnvObject
  return BUILD_CMS
}

export const cmsFunctions: Record<string, any> = {
  ...contentfulApi,
  ...datoApi,
  ...sanityApi,
}
