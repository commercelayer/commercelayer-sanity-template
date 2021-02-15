import { BsFillImageFill } from 'react-icons/bs'

export default {
  name: 'productImage',
  title: 'Product Image',
  description: '',
  type: 'document',
  icon: BsFillImageFill,
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'images',
      title: 'Images',
      type: 'image',
      validation: (rule) => rule.required(),
    },
  ],
}
