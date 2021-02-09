import { MdFlag } from "react-icons/md";

export default {
  name: "country",
  title: "Country",
  description: "",
  type: "document",
  icon: MdFlag,
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
      validation: (rule) => rule.required().min(2).max(4),
    },
    {
      id: "catalog",
      name: "Catalog",
      type: "array",
      of: [
        {
          type: "reference",
          to: {
            type: "catalog",
          },
        },
      ],
      validation: (rule) => rule.required(),
    },
    {
      id: "marketId",
      name: "MarketId",
      type: "string",
    },
    {
      id: "image",
      name: "Image",
      type: "image",
      validation: (rule) => rule.required(),
    },
    {
      id: "defaultLocale",
      name: "DefaultLocale",
      type: "string",
    },
    {
      id: "domain",
      name: "Domain",
      type: "string",
    },
  ],

  preview: {
    select: {
      title: "Name",
      media: "Image",
    },
  },
};
