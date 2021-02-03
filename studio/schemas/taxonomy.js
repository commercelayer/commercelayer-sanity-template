export default {
  name: "taxonomy",
  title: "Taxonomy",
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
      id: "taxons",
      name: "Taxons",
      type: "array",
      required: true,
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
