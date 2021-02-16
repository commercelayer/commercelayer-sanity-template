import { BsSquareHalf } from 'react-icons/bs'
import supportedLanguages from './locale/supportedLanguages'

const baseLanguage = supportedLanguages.find((l) => l.isDefault)

export default {
  name: 'taxon',
  title: 'Taxon',
  description: '',
  type: 'document',
  icon: BsSquareHalf,
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'localeString',
      validation: (rule) => rule.required(),
    },
    {
      name: 'label',
      title: 'Label',
      type: 'localeString',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'localeSlug',
      options: {
        source: 'Name',
      },
      validation: (rule) => rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'localeText',
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: {
            type: 'productImage',
          },
        },
      ],
    },
    {
      name: 'products',
      title: 'Products',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: {
            type: 'product',
          },
        },
      ],
    },
    {
      name: 'taxons',
      title: 'Taxons',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: {
            type: 'taxon',
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: `name.${baseLanguage.id}`,
    },
  },
}
