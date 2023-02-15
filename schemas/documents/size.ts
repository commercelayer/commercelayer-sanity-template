import { GiWeight } from "react-icons/gi";
import { defineField, defineType } from "sanity";
import supportedLanguages from "../locale/supportedLanguages";

const baseLanguage = supportedLanguages.find((l) => l.isDefault) || supportedLanguages[0];

export default defineType({
  name: "size",
  title: "Size",
  description: "Weight in grams",
  type: "document",
  icon: GiWeight,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "localeString",
      validation: (rule) => rule.required().error("A name is required")
    })
  ],

  preview: {
    select: {
      title: `name.${baseLanguage.id}`
    }
  }
});
