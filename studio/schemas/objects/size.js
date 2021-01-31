export default {
  name: "size",
  title: "Weight in grams",
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
  ],
};
