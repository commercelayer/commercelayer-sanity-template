import { MdShoppingCart } from 'react-icons/md'

export default {
  name: 'product',
  title: 'Product',
  description: '',
  type: 'document',
  icon: MdShoppingCart,
  fields: [
    {
      id: 'name',
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    },
    {
      id: 'description',
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      id: 'slug',
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'Name',
        maxLength: 200,
      },
      validation: (rule) => rule.required(),
    },
    {
      id: 'reference',
      name: 'reference',
      title: 'Reference',
      type: 'string',
      validation: (rule) => rule.required(),
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
      validation: (rule) => rule.required(),
    },
    {
      id: 'variants',
      name: 'variants',
      title: 'Variants',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: {
            type: 'variant',
          },
        },
      ],
      validation: (rule) => rule.required(),
    },
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'slug.current',
      media: 'images.0.images',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title,
        subtitle: `/${subtitle}`,
        media: media,
      }
    },
  },
}
