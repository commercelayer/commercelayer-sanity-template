import { MdFlag } from 'react-icons/md'
import supportedLanguages from './locale/supportedLanguages'

const baseLanguage = supportedLanguages.find((l) => l.isDefault)

export default {
  name: 'country',
  title: 'Country',
  description: '',
  type: 'document',
  icon: MdFlag,
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'localeString',
      validation: (rule) => rule.required(),
    },
    {
      name: 'code',
      title: 'Code',
      type: 'string',
      validation: (rule) => rule.required().min(2).max(4),
    },
    {
      name: 'catalog',
      title: 'Catalog',
      type: 'reference',
      to: [
        {
          type: 'catalog',
        },
      ],
      validation: (rule) => rule.required(),
    },
    {
      name: 'marketId',
      title: 'Market Id',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      validation: (rule) => rule.required(),
    },
    {
      name: 'defaultLocale',
      title: 'DefaultLocale',
      type: 'string',
    },
    {
      name: 'domain',
      title: 'Domain',
      type: 'string',
    },
  ],

  preview: {
    select: {
      title: `name.${baseLanguage.id}`,
      media: 'image',
    },
  },
}
