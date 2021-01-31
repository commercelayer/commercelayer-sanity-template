export default {
  name: "catalog",
  title: "Catalog",
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
      id: "taxonomies",
      name: "Taxonomies",
      type: "array",
      of: [
        {
          type: "url",
          validations: [
            {
              urlContentType: ["taxonomy"],
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
