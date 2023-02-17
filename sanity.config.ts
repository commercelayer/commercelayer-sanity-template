import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import schemas from "./schemas/schemaTypes";
import { Logo } from "./plugins/studioLogo";

const title = process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE || "[Studio] Commerce Layer Sanity Starter";
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION!;

export default defineConfig({
  title,
  basePath: "/studio",
  projectId,
  dataset,
  plugins: [deskTool(), visionTool({ defaultApiVersion: apiVersion })],
  schema: {
    types: schemas
  },
  studio: {
    components: {
      logo: Logo
    }
  }
});
