export default {
  name: "product",
  title: "Product",
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
      id: "description",
      name: "Description",
      type: "text",
      localized: true,
      required: false,
      disabled: false,
      omitted: false,
    },
    {
      id: "slug",
      name: "Slug",
      type: "slug",
      options: {
        source: 'Name',
        maxLength: 200
      },
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
      id: "reference",
      name: "Reference",
      type: "string",
      localized: false,
      required: false,
      validations: [
        {
          unique: true,
        },
      ],
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
      disabled: false,
      omitted: false,
    },
    {
      id: "variants",
      name: "Variants",
      type: "array",
      of: [
        {
          type: "url",
          validations: [
            {
              urlContentType: ["variant"],
            },
          ],
          urlType: "Entry",
        },
      ],
      localized: false,
      required: false,
      disabled: false,
      omitted: false,
    },
  ],

  preview: {
    select: {
      title: "Name",
      subtitle: "Slug.current",
      media: "Images[0]",
    },
    prepare({title, subtitle, media}) {
      return {
        title: title,
        subtitle: `/${subtitle}`,
        media: media
      }
    }
  }
};
