import React from "react";
import { CommerceLayer, Order, OrderStorage } from "@commercelayer/react-components";
import Layout from "@components/Layout";
import { Country } from "@typings/models";

type Props = {
  children: React.ReactNode;
  buildLanguages?: Country[];
  lang: string;
  clToken: string;
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
    <CommerceLayer accessToken={clToken}>
      <OrderStorage persistKey={`cl_order-${countryCode}`}>
        <Order attributes={{ language_code: languageCode, return_url, cart_url }}>
          <Layout
            pageTitle={pageTitle}
            buildLanguages={buildLanguages}
            lang={lang}
            countryCode={countryCode}
            countries={countries}
          >
            {children}
          </Layout>
        </Order>
      </OrderStorage>
    </CommerceLayer>
  );
};

export default Page;
