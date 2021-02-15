import { BsSquareHalf } from 'react-icons/bs'

export default {
  name: 'taxon',
  title: 'Taxon',
  description: '',
  type: 'document',
  icon: BsSquareHalf,
  fields: [
    {
      id: 'name',
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    },
    {
      id: 'label',
      name: 'label',
      title: 'Label',
      type: 'string',
    },
    {
      id: 'slug',
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'Name',
      },
      validation: (rule) => rule.required(),
    },
    {
      id: 'description',
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      id: 'images',
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
      id: 'products',
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
      id: 'taxons',
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
