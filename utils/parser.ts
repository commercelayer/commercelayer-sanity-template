import _ from 'lodash'

export const parseCategoryName = (categoryName: string): string =>
  categoryName.toLowerCase().trim().replace('&', 'and').split(' ').join('-')

export const parseProductName = (productName: string): string =>
  _.first(productName.toLowerCase().trim().split(' ').join('-').split('-(')) ||
  ''
export const parseLanguageCode = (
  languageCode: string,
  style?: 'toUpperCase' | 'toLowerCase',
  firstCode?: boolean
): string => {
  const code =
    (firstCode
      ? _.first(languageCode?.split('-'))
      : _.last(languageCode?.split('-'))) || languageCode
  return style === 'toLowerCase' ? code?.toLowerCase() : code?.toUpperCase()
}

export const parseLocale = (
  locale: string,
  replaceString: '-' | '_',
  splitString: '-' | '_',
  style: 'uppercase' | 'lowercase' = 'uppercase'
): string => {
  if (!locale) return ''
  const splitCode = locale.split(splitString)
  const lastCode =
    style === 'uppercase'
      ? splitCode[1]?.toUpperCase()
      : splitCode[1]?.toLowerCase()
  return `${splitCode[0]}${replaceString}${lastCode}`
}

export const parseImg = (url: string, cms: string) => {
  const sanityImg = cms === 'sanity' ? '&bg=FFF' : ''
  return `${url}?fm=jpg&q=75${sanityImg}`
}
