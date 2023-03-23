import React from "react";
import NextHead from "next/head";

type Props = {
  productName?: string;
};

const title = process.env.NEXT_PUBLIC_SITE_NAME || "Commerce Layer Sanity Template";
const description =
  "A multi-country ecommerce template built with Commerce Layer, Next.js, Sanity studio, and deployed to Netlify.";
const keywords =
  "Commerce Layer, Reactjs, Nextjs, Sanity Studio, Netlify, Nextjs Template, Sanity Template, Sanity Ecommerce Template, Ecommerce Template, Ecommerce, Mobile Ecommerce, Mobile Ecommerce Site, Sanity Ecommerce Site, Nextjs Ecommerce Site ";
const url = process.env.NEXT_PUBLIC_SITE_URL || "https://commercelayer-sanity-template.netlify.app";
const twitterHandle = "@commercelayer";
const ogImage = "/preview.jpg";
const favicon = "//data.commercelayer.app/assets/images/favicons/favicon.ico";
const touchIcon = "/seo/ios/192.png";

const SEOHead: React.FunctionComponent<Props> = ({ productName }) => {
  return (
    <NextHead>
      <title>{productName ? `${title} : ${productName}` : title}</title>
      <meta name="description" content={description} />
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <link rel="manifest" href="/manifest.json" />
      <meta name="theme-color" content="#000000" />
      <meta name="keywords" content={keywords} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={twitterHandle} />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content="Commerce Layer Sanity Starter Logo" />
      <meta name="twitter:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="900" />
      <meta property="og:image:height" content="600" />

      <link rel="apple-touch-icon" sizes="192x192" href={touchIcon} />
      <meta name="application-name" content={title} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content={title} />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />

      <meta name="msapplication-config" content="none" />
      <meta name="msapplication-TileColor" content="#FFFFFF" />
      <meta name="msapplication-tap-highlight" content="yes" />

      <link rel="shortcut icon" type="image/x-icon" href={favicon} />
      <meta name="msapplication-TileColor" content="#FFFFFF" />
      <meta name="theme-color" content="#000000" />
    </NextHead>
  );
};

export default SEOHead;
