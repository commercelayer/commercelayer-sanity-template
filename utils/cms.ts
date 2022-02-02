import sanityApi from './sanity/api'
import datoCmsAPi from './datoCMS/api'
export const cmsList = () => {
  return process.env.BUILD_CMS
}

export const cmsFunctions: Record<string, any> = {
  ...sanityApi,
  ...datoCmsAPi
}
