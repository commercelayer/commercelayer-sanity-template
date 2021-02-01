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
            max: 2,
          },
        },
      ],
      disabled: false,
      omitted: false,
    },
    {
      id: "catalog",
      name: "Catalog",
      type: "url",
      localized: false,
      required: true,
      validations: [
        {
          urlContentType: ["catalog"],
        },
      ],
      disabled: false,
      omitted: false,
      urlType: "Entry",
    },
    {
      id: "marketId",
      name: "MarketId",
      type: "string",
      localized: false,
      required: false,
      validations: [],
      disabled: false,
      omitted: false,
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
      disabled: false,
      omitted: false,
      urlType: "Asset",
    },
    {
      id: "defaultLocale",
      name: "DefaultLocale",
      type: "string",
      localized: false,
      required: false,
      validations: [],
      disabled: false,
      omitted: false,
    },
    {
      id: "domain",
      name: "Domain",
      type: "url",
      localized: false,
      required: false,
      validations: [],
      disabled: false,
      omitted: false,
    },
  ],

  preview: {
    select: {
      title: "Name",
      media: "Image",
      countryCode: "Code"
    },
    prepare({title, media, countryCode}) {
      return {
        title: `(${countryCode}) ${title}`,
        media: media
      }
    }
  }
};
