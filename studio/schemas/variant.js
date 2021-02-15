import { GrMultiple } from 'react-icons/gr'

export default {
  name: 'variant',
  title: 'Variant',
  description: '',
  type: 'document',
  icon: GrMultiple,
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    },
    {
      name: 'code',
      title: 'Code',
      type: 'string',
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
      validation: (rule) => rule.required(),
    },
    {
      name: 'size',
      title: 'Size',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: {
            type: 'size',
          },
        },
      ],
      validation: (rule) => rule.required(),
    },
  ],

  preview: {
    select: {
      title: 'name',
      media: 'images.0.images',
    },
  },
}
