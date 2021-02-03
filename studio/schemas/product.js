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
    },
    {
      id: "description",
      name: "Description",
      type: "text",
    },
    {
      id: "slug",
      name: "Slug",
      type: "slug",
      options: {
        source: "Name",
        maxLength: 200,
      },
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
      required: false,
      validations: [
        {
          unique: true,
        },
      ],
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
      id: "variants",
      name: "Variants",
      type: "array",
      of: [
        {
          type: "reference",
          to: {
            type: "variant",
          },
        },
      ],
    },
  ],

  preview: {
    select: {
      title: "Name",
      subtitle: "Slug.current",
      media: "Images[0]",
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title,
        subtitle: `/${subtitle}`,
        media: media,
      };
    },
  },
};
