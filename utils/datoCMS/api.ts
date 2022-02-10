import _ from 'lodash'
import { request } from '../datocmsClient'

const datoCMSAllTaxonomies = async (catalogId: string) => {
  const query = `{
    allCatalogs(filter: {id: {eq:"${catalogId}"}}) {
      taxonomies {
        name
        label
        taxons {
          name
          label
          products {
            name
            description
            reference
            slug
            images {
              url
              alt
            }
            variants {
              name
              code
              size {
                name
              }
            }
          }
        }
      }
    }
  }`

  const data = await request({ query: query, variables: {}, preview: true });
  const catologs = data.allCatalogs || [];
  return catologs.map((catolog: { taxonomies: any; }) => catolog.taxonomies)[0]
}

const datoCMSGetProduct = async (slug: string) => {
  const query = `{
    product(filter: {slug: {eq:"${slug}"}}) {
      name
      id
      description
      images {
        url
        alt
      }
      variants {
        name
        code
        size {
          name
        }
        images {
          url
          alt
        }
      }
    }
  }`

  const data = await request({ query: query, variables: {}, preview: true });
  return data.product || [];
}

const parsedCountries = (countries: any[]) => {
  return countries.map(country => {
    return {
      ...country,
      defaultLocale: country.defaultlocale,
    }
  })
}

const datoCMSAllCountries = async () => {
  const query = `{
    allCountries {
      name
      code
      marketId
      defaultlocale
      image{
        url
        alt
      }
      catalog {
        id
        name
        taxonomies {
          label
          name
          taxons {
            name
            label
            products {
              name
              description
              reference
              slug
              images {
                url
                alt
              }
              }
            }
          }
        }
      }
      
    }  
`
  const data = await request({ query: query, variables: {}, preview: true });
  return parsedCountries(data.allCountries || [])
}

export default {
  datoCMSAllCountries,
  datoCMSAllTaxonomies,
  datoCMSGetProduct,
}

