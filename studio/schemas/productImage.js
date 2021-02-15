import { BsFillImageFill } from 'react-icons/bs'

export default {
  name: 'productImage',
  title: 'Product Image',
  description: '',
  type: 'document',
  icon: BsFillImageFill,
  fields: [
    {
      id: 'name',
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    },
    {
      id: 'description',
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      id: 'images',
      name: 'images',
      title: 'Images',
      type: 'image',
      validation: (rule) => rule.required(),
    },
  ],
}
