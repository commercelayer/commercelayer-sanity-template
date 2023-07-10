import React from "react";
import { CommerceLayer, OrderContainer, OrderStorage } from "@commercelayer/react-components";
import Layout from "@components/Layout";
import { Country } from "@typings/models";

type Props = {
  children: React.ReactNode;
  buildLanguages?: Country[];
  lang: string;
  clToken: string;
  clEndpoint: string;
  languageCode: string;
  countryCode: string;
  countries?: any[];
  pageTitle?: string;
};

const Page: React.FC<Props> = ({
  children,
  buildLanguages,
  lang,
  clToken,
  clEndpoint,
  languageCode,
  countryCode,
  countries,
  pageTitle
}) => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const isEnvEmpty = siteUrl === "";

  const return_url = isEnvEmpty ? undefined : `${siteUrl}/${countryCode}/${lang}`;
  const cart_url = isEnvEmpty ? undefined : `${siteUrl}/${countryCode}/${lang}/cart`;

  return (
    <CommerceLayer accessToken={clToken} endpoint={clEndpoint}>
      <OrderStorage persistKey={`cl_order-${countryCode}`}>
        <OrderContainer attributes={{ language_code: languageCode, return_url, cart_url }}>
          <Layout
            pageTitle={pageTitle}
            buildLanguages={buildLanguages}
            lang={lang}
            countryCode={countryCode}
            countries={countries}
          >
            {children}
          </Layout>
        </OrderContainer>
      </OrderStorage>
    </CommerceLayer>
  );
};

export default Page;
