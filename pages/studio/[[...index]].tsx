// import Head from "next/head";
import { NextStudio } from "next-sanity/studio";
import { StudioLayout, StudioProvider } from "sanity";
import config from "../../sanity.config";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return (
    <>
      <NextStudio config={config}>
        <StudioProvider config={config}>
          <StudioLayout />
        </StudioProvider>
      </NextStudio>
    </>
  );
}
