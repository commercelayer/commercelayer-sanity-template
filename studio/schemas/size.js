import { GiResize } from 'react-icons/gi'

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
}
