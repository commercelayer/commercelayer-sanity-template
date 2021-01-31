export default {
  name: "taxon",
  title: "Taxon",
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
      id: "slug",
      name: "Slug",
      type: "slug",
      options: {
        source: 'Name'
      },
      localized: true,
      required: false,
      validations: [
        {
          unique: true,
        },
      ],
      disabled: false,
      omitted: false,
    },
    {
      id: "description",
      name: "Description",
      type: "text",
      localized: true,
      required: false,
      validations: [],
      disabled: false,
      omitted: false,
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
          urlType: "Asset",
        },
      ],
      localized: false,
      required: false,
      validations: [],
      disabled: false,
      omitted: false,
    },
    {
      id: "products",
      name: "Products",
      type: "array",
      of: [
        {
          type: "url",
          validations: [
            {
              urlContentType: ["product"],
            },
          ],
          urlType: "Entry",
        },
      ],
      localized: false,
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
      required: false,
      validations: [],
      disabled: false,
      omitted: false,
    },
  ],
};
