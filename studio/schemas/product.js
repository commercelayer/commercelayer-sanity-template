import { MdShoppingCart } from 'react-icons/md'
import supportedLanguages from './locale/supportedLanguages'

const baseLanguage = supportedLanguages.find((l) => l.isDefault)

export default {
  name: 'product',
  title: 'Product',
  description: '',
  type: 'document',
  icon: MdShoppingCart,
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'localeString',
      validation: (rule) => rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'localeText',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'localeSlug',
      validation: (rule) => rule.required(),
    },
    {
      name: 'reference',
      title: 'Reference',
      type: 'string',
      validation: (rule) => rule.required(),
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
      title: `name.${baseLanguage.id}`,
      subtitle: `slug.${baseLanguage.id}.current`,
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
