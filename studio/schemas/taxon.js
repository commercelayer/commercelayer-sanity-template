import { BsSquareHalf } from 'react-icons/bs'

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
      type: 'string',
      validation: (rule) => rule.required(),
    },
    {
      name: 'label',
      title: 'Label',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'Name',
      },
      validation: (rule) => rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
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
}
