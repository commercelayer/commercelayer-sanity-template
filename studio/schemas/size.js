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
      validation: (rule) => rule.required(),
    },
  ],
};
