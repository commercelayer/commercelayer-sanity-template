export default {
  name: "size",
  title: "Size",
  description: "Weight in grams",
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
  ],
};
