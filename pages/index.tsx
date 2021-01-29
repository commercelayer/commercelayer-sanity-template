import { GetStaticProps } from "next";
import Error from "next/error";
import { useRouter } from "next/router";
import { getClient, usePreviewSubscription } from "../utils/sanity";

const query = `//groq
  *[_type == "product" && defined(slug.current)]
`;

function IndexPage() {
  return (
    <div className="m-20">
      <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
        Sanity Ecommerce starter built with Next.js, Commerce Layer, and
        deployed to Netlify.
      </h2>
    </div>
  );
}

export default IndexPage;
