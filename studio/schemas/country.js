export default {
  name: "country",
  title: "Country",
  description: "",
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
        {
          size: {
            min: 2,
            max: 4,
          },
        },
      ],
    },
    {
      id: "catalog",
      name: "Catalog",
      type: "array",
      required: true,
      of: [
        {
          type: "reference",
          to: {
            type: "catalog",
          },
        },
      ],
    },
    {
      id: "marketId",
      name: "MarketId",
      type: "string",
    },
    {
      id: "image",
      name: "Image",
      type: "url",
      localized: false,
      required: false,
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
      countryCode: "Code",
    },
    prepare({ title, media, countryCode }) {
      return {
        title: `(${countryCode}) ${title}`,
        media: media,
      };
    },
  },
};
