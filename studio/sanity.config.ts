import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import schemas from "./schemas/schemaTypes";
import { Logo } from "./plugins/studio-logo/logo";

export default defineConfig({
  title: import.meta.env.SANITY_STUDIO_PROJECT_TITLE,
  projectId: import.meta.env.SANITY_STUDIO_PROJECT_ID,
  dataset: import.meta.env.SANITY_STUDIO_DATASET,
  plugins: [deskTool(), visionTool()],
  schema: {
    types: schemas,
  },
  studio: {
    components: {
      logo: Logo,
    },
  },
});
