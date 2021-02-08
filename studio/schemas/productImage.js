export default {
  name: "productImage",
  title: "Product Image",
  description: "",
  type: "document",
  fields: [
    {
      id: "name",
      name: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    },
    {
      id: "description",
      name: "Description",
      type: "string",
    },
    {
      id: "images",
      name: "Images",
      type: "image",
      validation: (rule) => rule.required(),
    },
  ],
};
