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
      validation: (rule) => rule.required(),
    },
    {
      id: "code",
      name: "Code",
      type: "string",
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
      validation: (rule) => rule.required(),
    },
    {
      id: "size",
      name: "Size",
      type: "array",
      of: [
        {
          type: "reference",
          to: {
            type: "size",
          },
        },
      ],
      validation: (rule) => rule.required(),
    },
  ],

  preview: {
    select: {
      title: "Name",
      media: "Images[0]",
    },
  },
};
