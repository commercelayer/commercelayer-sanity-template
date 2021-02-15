import { MdFlag } from 'react-icons/md'

export default {
  name: 'country',
  title: 'Country',
  description: '',
  type: 'document',
  icon: MdFlag,
  fields: [
    {
      id: 'name',
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    },
    {
      id: 'code',
      name: 'code',
      title: 'Code',
      type: 'string',
      validation: (rule) => rule.required().min(2).max(4),
    },
    {
      id: 'catalog',
      name: 'catalog',
      title: 'Catalog',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: {
            type: 'catalog',
          },
        },
      ],
      validation: (rule) => rule.required(),
    },
    {
      id: 'marketId',
      name: 'marketId',
      title: 'MarketId',
      type: 'string',
    },
    {
      id: 'image',
      name: 'image',
      title: 'Image',
      type: 'image',
      validation: (rule) => rule.required(),
    },
    {
      id: 'defaultLocale',
      name: 'defaultLocale',
      title: 'DefaultLocale',
      type: 'string',
    },
    {
      id: 'domain',
      name: 'domain',
      title: 'Domain',
      type: 'string',
    },
  ],

  preview: {
    select: {
      title: 'Name',
      media: 'Image',
    },
  },
}
