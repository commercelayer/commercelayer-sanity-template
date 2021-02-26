import { createClient, ContentfulClientApi, Entry } from 'contentful'
import {
  ContentfulProduct,
  ContentfulCountry,
  ContentfulCatalog,
  ContentfulTaxonomy,
  ContentfulTaxon,
} from './typings'
import _ from 'lodash'
// import { parseProductName } from '../parser'
import { Taxonomy, Taxon } from '../../typings/models'

const contentfulCredential = {
  space: process.env.CONTENTFUL_SPACE_ID as string,
  accessToken: process.env.CONTENTFUL_DELIVERY_ACCESS_TOKEN as string,
}

const client =
  process.env.BUILD_CMS === 'contentful'
    ? createClient(contentfulCredential)
    : null

type GetClient = () => ContentfulClientApi | null

const getClient: GetClient = () => client

export type Country = Entry<{
  name: string
  code: string
  catalog: Entry<ContentfulCatalog>
  defaultLocale: string
  market_id: string
  domain: string
  image: ImageEntry
}>

function parseCountry({ fields, sys }: Country) {
  const catalog = {
    ...fields.catalog.fields,
    id: fields.catalog.sys.id,
  }
  return {
    ...fields,
    catalog,
    id: sys.id,
    image: parseImage(fields.image),
  }
}

type ImageEntry = Entry<{
  title: string
  file: {
    url: string
    contentType: string
  }
}>

function parseImage(entry: ImageEntry) {
  return {
    title: entry.fields.title,
    url: entry.fields.file.url,
  }
}

type CountryEntries = {
  items: Country[]
}

function parseCountryEntries(entries: CountryEntries, cb = parseCountry) {
  return entries?.items?.map(cb)
}

const getLocale = (locale: string) => {
  const lang = locale.split('-')
  return lang.length > 1
    ? `${lang[0].toLowerCase()}-${lang[1].toUpperCase()}`
    : _.first(lang)
}

export const contentfulAllCountries = async (locale = 'en-US') => {
  const newLocale = getLocale(locale)
  const countries = await getClient().getEntries({
    content_type: 'country',
    order: 'fields.name',
    locale: newLocale,
  })
  return parseCountryEntries(countries as CountryEntries)
}

function parseTaxonomies(
  catalogs: ContentfulCatalog[],
  items: Taxonomy[] = []
) {
  catalogs.map((catalog) => {
    catalog.fields.taxonomies.map((taxonomy: ContentfulTaxonomy) => {
      const { fields } = taxonomy
      const taxons = fields.taxons.map((taxon: ContentfulTaxon) => {
        const products = !_.isEmpty(taxon.fields.products)
          ? taxon.fields.products.map((product) => {
              const images = product.fields.images.map((image) => {
                const url = image.fields.file.url
                return { ...image.fields, url }
              })
              const variants = product.fields.variants.map(
                (variant) => variant.fields
              )
              return { ...product.fields, images, variants }
            })
          : []
        return { ...taxon.fields, products }
      })
      items.push({ ...fields, taxons })
    })
  })
  return items
}
function parseProduct(product?: ContentfulProduct) {
  if (!product) return {}
  const p = product.fields
  const variants = p.variants.map((variant) => {
    const images = variant.fields.images.map((image) => {
      const url = image.fields.file.url
      return { ...image.fields, url }
    })
    const size = variant.fields.size.fields
    return {
      ...variant.fields,
      images,
      size,
    }
  })
  const images = p.images.map((image) => {
    const url = image.fields.file.url
    return { ...image.fields, url }
  })
  return {
    ...p,
    variants,
    images,
  }
}

export async function getAllProducts(locale = 'en-US') {
  const categories: any = await getClient().getEntries({
    content_type: 'category',
    locale: getLocale(locale),
  })
  return parseTaxonomies(categories.items)
}

export const contentfulAllTaxonomies = async (
  catalogId: string,
  locale = 'en-US'
) => {
  const catalog: any = await getClient().getEntries({
    content_type: 'catalog',
    'sys.id': catalogId,
    locale: getLocale(locale),
    include: 4,
  })
  return parseTaxonomies(catalog.items)
}

export const contentfulAllTaxons = async (
  locale = 'en-US'
): Promise<Taxon[]> => {
  const taxons: any = await getClient().getEntries({
    content_type: 'taxon',
    locale: getLocale(locale),
    include: 2,
  })
  return taxons.items.map((taxon: ContentfulTaxon) => taxon.fields)
}

export async function contentfulGetProduct(slug: string, locale = 'en-US') {
  const lang = getLocale(locale)
  const products = await getClient().getEntries<ContentfulProduct['fields']>({
    content_type: 'product',
    include: 2,
    locale: lang,
    'fields.slug[localeCode]': slug,
  })
  const item = _.first(
    products.items.filter((product) => product.fields.slug === slug)
  )
  return parseProduct(item)
}

export const getAllProductsByLocale = async () => {
  const { BUILD_LANGUAGES } = process.env
  const languages = BUILD_LANGUAGES as string
  const promises: any[] = []
  languages.split(',').forEach((language) => {
    promises.push(getAllProducts(language))
  })
  try {
    const products = await Promise.all(promises)
    return _.concat([], ...products)
  } catch (err) {
    console.log('err products', err)
    debugger
    return []
  }
}

export async function getCountry(countryCode: string, locale = 'en-US') {
  const { items } = await getClient().getEntries<ContentfulCountry['fields']>({
    content_type: 'country',
    include: 2,
    locale: getLocale(locale),
    'fields.code': countryCode.toUpperCase(),
  })
  return _.first(items)
}

export default {
  contentfulAllCountries,
  contentfulAllTaxonomies,
  contentfulGetProduct,
}
