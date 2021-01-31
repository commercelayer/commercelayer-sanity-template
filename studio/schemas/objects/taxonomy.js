export default {
  name: "taxonomy",
  title: "Taxonomy",
  description: "",
  type: "object",
  fields: [
    {
      id: "name",
      name: "Name",
      type: "string",
      localized: true,
      required: true,
      validations: [
        {
          unique: true,
        },
      ],
      disabled: false,
      omitted: false,
    },
    {
      id: "label",
      name: "Label",
      type: "string",
      localized: true,
      required: false,
      validations: [],
      disabled: false,
      omitted: false,
    },
    {
      id: "taxons",
      name: "Taxons",
      type: "array",
      of: [
        {
          type: "url",
          validations: [
            {
              urlContentType: ["taxon"],
            },
          ],
          urlType: "Entry",
        },
      ],
      localized: false,
      required: true,
      validations: [],
      disabled: false,
      omitted: false,
    },
  ],
};
