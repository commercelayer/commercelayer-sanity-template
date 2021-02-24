import {
  Catalog,
  Taxonomy,
  Taxon,
  Product,
  Variant,
} from '../../../typings/models'

export interface DatoImage {
  url: string
}

export type DatoCatalog = Catalog & {
  taxonomies: DatoTaxonomy[]
}

export type DatoTaxonomy = Taxonomy & {
  taxons: DatoTaxon[]
}

export type DatoTaxon = Taxon & {
  images: DatoImage[]
  products: DatoProduct[]
}

export type DatoProduct = Product & {
  images: DatoImage[]
  variants: DatoVariant[]
}

export type DatoVariant = Variant & {
  images: DatoImage[]
}
