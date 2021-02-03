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
      required: true,
      validations: [
        {
          unique: true,
        },
      ],
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
      validations: [
        {
          unique: true,
        },
      ],
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
          type: "url",
          validations: [
            {
              urlMimetypeGroup: ["image"],
            },
            {
              assetFileSize: {
                min: null,
                max: 5242880,
              },
            },
          ],
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
