import { GoFileSubmodule } from 'react-icons/go'

export default {
  name: 'catalog',
  title: 'Catalog',
  description: '',
  type: 'document',
  icon: GoFileSubmodule,
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'localeString',
      validation: (rule) => rule.required(),
    },
    {
      name: 'taxonomies',
      title: 'Taxonomies',
      type: 'array',
      validation: (rule) => rule.required(),
      of: [
        {
          type: 'reference',
          to: {
            type: 'taxonomy',
          },
        },
      ],
    },
  ],
}
