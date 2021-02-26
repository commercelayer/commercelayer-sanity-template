import { Entry } from 'contentful'
import {
  Size,
  Variant,
  Product,
  Taxon,
  Taxonomy,
  Catalog,
} from '../../../typings/models'
import { Country } from '../api'

type ContentfulImage = Entry<{
  title: string
  file: {
    url: string
    details: {
      size: number
      image: {
        width: number
        height: number
      }
    }
    filename: string
    contentType: string
  }
}>

export type ContentfulSize = Entry<Size>

export type ContentfulVariant = Entry<
  {
    images: ContentfulImage[]
    size: ContentfulSize
  } & Variant
>

export type ContentfulProduct = Entry<
  {
    variants: ContentfulVariant[]
    images: ContentfulImage[]
  } & Product
>

export type ContentfulTaxon = Entry<
  {
    images: ContentfulImage[]
    products: ContentfulProduct[]
    taxons: ContentfulTaxon[]
  } & Taxon
>

export type ContentfulTaxonomy = Entry<
  {
    name: string
    taxons: ContentfulTaxon[]
  } & Taxonomy
>

export type ContentfulCatalog = Entry<
  {
    taxonomies: ContentfulTaxonomy[]
  } & Catalog
>

export interface ProductForPage {
  locale: string
  categoryName: string
  name: string
}

export type ContentfulCountry = Entry<
  Country['fields'] & {
    catalogue: ContentfulCatalog
    image: ContentfulImage
    marketId: string
  }
>
