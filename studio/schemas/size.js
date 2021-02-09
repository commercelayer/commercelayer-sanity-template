import { GiResize } from "react-icons/gi";

export default {
  name: "size",
  title: "Size",
  description: "Weight in grams",
  type: "document",
  icon: GiResize,
  fields: [
    {
      id: "name",
      name: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    },
  ],
};
