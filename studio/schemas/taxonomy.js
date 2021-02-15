import { SiElasticstack } from 'react-icons/si'

export default {
  name: 'taxonomy',
  title: 'Taxonomy',
  description: '',
  type: 'document',
  icon: SiElasticstack,
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
      id: 'taxons',
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
}
