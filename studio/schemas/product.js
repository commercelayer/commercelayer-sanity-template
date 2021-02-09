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
      validation: (rule) => rule.required(),
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
      validation: (rule) => rule.required(),
    },
    {
      id: "reference",
      name: "Reference",
      type: "string",
      validation: (rule) => rule.required(),
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
      validation: (rule) => rule.required(),
    },
  ],

  preview: {
    select: {
      title: "Name",
      subtitle: "Slug.current",
      media: "Images.0.Images",
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
