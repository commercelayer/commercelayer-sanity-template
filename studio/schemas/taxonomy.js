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
      validation: (rule) => rule.required(),
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
      validation: (rule) => rule.required(),
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
