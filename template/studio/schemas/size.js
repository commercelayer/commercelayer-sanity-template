import { GiResize } from 'react-icons/gi'
import supportedLanguages from './locale/supportedLanguages'

const baseLanguage = supportedLanguages.find((l) => l.isDefault)

export default {
  name: 'size',
  title: 'Size',
  description: 'Weight in grams',
  type: 'document',
  icon: GiResize,
  fields: [
    {
      id: 'name',
      name: 'name',
      title: 'Name',
      type: 'localeString',
      validation: (rule) => rule.required(),
    },
  ],
  preview: {
    select: {
      title: `name.${baseLanguage.id}`,
    },
  },
}
