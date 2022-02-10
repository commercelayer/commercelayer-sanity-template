import {
  Country,
  Product,
  Size,
  Taxon,
  Taxonomy,
  Variant,
} from '@typings/models'

export interface DatoCMSCountry extends Omit<Country, 'name'> {
  name: Record<string, string>
}

export interface DatoCMSTaxonomy extends Omit<Taxonomy, 'name' | 'taxons'> {
  name: Record<string, string>
  label: Record<string, string>
  taxons: DatoCMSTaxon[]
}

export interface DatoCMSTaxon extends Omit<Taxon, 'name' | 'products'> {
  name: Record<string, string>
  label: Record<string, string>
  products: DatoCMSProduct[]
}

export interface DatoCMSProduct
  extends Omit<Product, 'name' | 'description' | 'slug' | 'variants'> {
  name: Record<string, string>
  slug: Record<string, { current: string }>
  description: Record<string, string>
  variants: DatoCMSVariant[]
}

export interface DatoCMSVariant extends Omit<Variant, 'name' | 'size'> {
  name: Record<string, string>
  size: DatoCMSSize
}

export interface DatoCMSSize extends Omit<Size, 'name'> {
  name: Record<string, any>
}
