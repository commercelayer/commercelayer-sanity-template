export default {
  name: "variant",
  title: "Variant",
  description: "",
  type: "document",
  fields: [
    {
      id: "name",
      name: "Name",
      type: "string",
      required: true,
    },
    {
      id: "code",
      name: "Code",
      type: "string",
      required: true,
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
      id: "size",
      name: "Size",
      type: "array",
      required: true,
      of: [
        {
          type: "reference",
          to: {
            type: "size",
          },
        },
      ],
    },
  ],
};
