import axios from 'axios'
import _ from 'lodash'
import { DatoCatalog } from './typings'
import { parseLocale } from '../parser'

const fetchDatoAPI = async (query: string, url = '') => {
  const { DATO_API_TOKEN } = process.env
  const client = axios.create({
    baseURL: 'https://graphql.datocms.com/',
    timeout: 1000,
    headers: {
      Authorization: `Bearer ${DATO_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
  })
  const params = JSON.stringify({ query })
  return await client.post(url, params)
}

export const datoAllCountries = async (locale: string = 'en-US') => {
  const lang = parseLocale(locale, '_', '-')
  const query = `{
    allCountries(locale: ${lang}) {
      code
      id
      image {
        url
      }
      marketid
      name
      domain
      defaultlocale
      catalog {
        id
      }
    }
  }`
  try {
    const {
      data: { data },
    } = await fetchDatoAPI(query)
    return data.allCountries.map((country: any) => {
      country['marketId'] = country['marketid']
      country['defaultLocale'] = country['defaultlocale']
      delete country['marketid']
      delete country['defaultlocale']
      return country
    })
  } catch (error) {
    console.error(error)
    return null
  }
}

export const datoAllTaxonomies = async (
  catalogId: string,
  locale: string = 'en-US'
) => {
  const lang = parseLocale(locale, '_', '-')
  const query = `{
    allCatalogs(locale: ${lang}, filter: {id: {eq: "${catalogId}"}}) {
      id
      name
      taxonomies {
        name
        label
        taxons {
          id
          name
          label
          products {
            id
            images {
              url
            }
            name
            reference
            slug
            variants {
              code
            }
          }
        }
      }
    }
  }`
  try {
    const {
      data: { data },
    } = await fetchDatoAPI(query)
    const catalog = _.first<DatoCatalog>(data.allCatalogs)
    return catalog?.taxonomies
  } catch (error) {
    console.error(error)
    return null
  }
}

export const datoGetProduct = async (slug: string, locale = 'en-US') => {
  const lang = parseLocale(locale, '_', '-')
  const query = `{
    product(filter: {slug: {eq: "${slug}"}}, locale: ${lang}) {
      id
      images {
        url
      }
      name
      reference
      slug
      description
      variants {
        images {
          url
        }
        code
        name
        size {
          name
        }
      }
    }
  }`
  try {
    const {
      data: { data },
    } = await fetchDatoAPI(query)
    return data?.product
  } catch (error) {
    console.error(error)
    return null
  }
}

export default {
  datoAllCountries,
  datoAllTaxonomies,
  datoGetProduct,
}
