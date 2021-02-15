import { GoFileSubmodule } from 'react-icons/go'

export default {
  name: 'catalog',
  title: 'Catalog',
  description: '',
  type: 'document',
  icon: GoFileSubmodule,
  fields: [
    {
      id: 'name',
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    },
    {
      id: 'taxonomies',
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
