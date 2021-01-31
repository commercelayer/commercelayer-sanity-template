export default {
  name: "variant",
  title: "Product variant",
  description: "",
  type: "object",
  fields: [
    {
      id: "name",
      name: "Name",
      type: "string",
      localized: true,
      required: true,
      validations: [],
      disabled: false,
      omitted: false,
    },
    {
      id: "code",
      name: "Code",
      type: "string",
      localized: false,
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
      id: "size",
      name: "Size",
      type: "url",
      localized: false,
      required: true,
      validations: [
        {
          urlContentType: ["size"],
        },
      ],
      disabled: false,
      omitted: false,
      urlType: "Entry",
    },
  ],
};
