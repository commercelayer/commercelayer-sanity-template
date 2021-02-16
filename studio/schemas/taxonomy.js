import { SiElasticstack } from 'react-icons/si'
import supportedLanguages from './locale/supportedLanguages'

const baseLanguage = supportedLanguages.find((l) => l.isDefault)

export default {
  name: 'taxonomy',
  title: 'Taxonomy',
  description: '',
  type: 'document',
  icon: SiElasticstack,
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
      name: 'taxons',
      title: 'Taxons',
      type: 'array',
      validation: (rule) => rule.required(),
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
