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
      type: "text",
    },
    {
      id: "images",
      name: "Images",
      type: "image",
      validation: (rule) => rule.required(),
    },
  ],
};
