import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import schemas from "./schemas/schemaTypes";
import { Logo } from "./plugins/studioLogo";
import { productionUrl } from "plugins/productionUrl";

const title =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE ||
  "Commerce Layer Sanity Studio";
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION!;

export default defineConfig({
  title,
  basePath: "/studio",
  projectId,
  dataset,
  plugins: [
    deskTool(),
    visionTool({ defaultApiVersion: apiVersion }),
    productionUrl({
      apiVersion,
      previewSecretId: "preview.secret",
      types: schemas.map((schema) => schema.name),
    }),
  ],
  schema: {
    types: schemas,
  },
  studio: {
    components: {
      logo: Logo,
    },
  },
});
