import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          href="//data.commercelayer.app/assets/fonts/eina01.min.css"
          rel="stylesheet"
        />
        <link
          href="//data.commercelayer.app/assets/fonts/fontawesome.min.css"
          rel="stylesheet"
        />
        <link
          rel="shortcut icon"
          type="image/x-icon"
          href="https://data.commercelayer.app/assets/images/favicons/favicon.ico"
        />
        {/* <link
          href="//data.commercelayer.app/assets/css/commercelayer.min.css"
          rel="stylesheet"
          key="Commerce Layer Style"
        /> */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
