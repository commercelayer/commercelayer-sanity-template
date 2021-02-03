export default {
  name: "catalog",
  title: "Catalog",
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
      id: "taxonomies",
      name: "Taxonomies",
      type: "array",
      required: true,
      of: [
        {
          type: "reference",
          to: {
            type: "taxonomy",
          },
        },
      ],
    },
  ],
};
