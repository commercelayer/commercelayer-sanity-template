export default {
  name: "taxon",
  title: "Taxon",
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
      id: "label",
      name: "Label",
      type: "string",
    },
    {
      id: "slug",
      name: "Slug",
      type: "slug",
      options: {
        source: "Name",
      },
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
      type: "array",
      of: [
        {
          type: "reference",
          to: {
            type: "productImage",
          },
        },
      ],
    },
    {
      id: "products",
      name: "Products",
      type: "array",
      of: [
        {
          type: "reference",
          to: {
            type: "product",
          },
        },
      ],
    },
    {
      id: "taxons",
      name: "Taxons",
      type: "array",
      of: [
        {
          type: "reference",
          to: {
            type: "taxon",
          },
        },
      ],
    },
  ],
};
