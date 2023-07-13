import _ from "lodash";
import React, { useState, useEffect } from "react";
import { GetStaticProps, GetStaticPaths, NextPage } from "next";
import IframeResizer from "iframe-resizer-react";
import { useOrderContainer } from "@commercelayer/react-components/hooks/useOrderContainer";
import Page from "@components/Page";
import { useGetToken } from "@hooks/GetToken";
import { Country } from "@typings/models";
import { parseLanguageCode, parseEndpoint } from "@utils/parser";
import sanityApi from "@utils/sanity/api";

type CartProps = {
  countryCode: string;
  slug: string;
  clToken: string;
};

type Props = {
  lang: string;
  countries: Country[];
  country: Country;
  buildLanguages: Country[];
};

const CartIframe: React.FC<CartProps> = ({ countryCode, slug, clToken }) => {
  const [cartUrl, setCartUrl] = useState<string | null>(null);
  const { reloadOrder, order } = useOrderContainer();

  useEffect(() => {
    let isMounted = true;

    (async () => {
      if (isMounted) {
        if (clToken && slug) {
          const persistKey = `cl_order-${countryCode}`;
          const orderFromStorage = localStorage.getItem(persistKey);

          if (orderFromStorage === null) {
            setCartUrl(
              `https://${slug}.commercelayer.app/cart/null?embed=true&accessToken=${clToken}`
            );
          } else {
            if (order !== undefined) {
              setCartUrl(
                `https://${slug}.commercelayer.app/cart/${order.id}?embed=true&accessToken=${clToken}`
              );
            }
          }
        }
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [slug, order, clToken, countryCode]);

  return (
    <div className="container mx-auto max-w-screen-lg px-5 lg:px-0">
      {cartUrl && (
        <IframeResizer
          checkOrigin={false}
          onMessage={(event) => {
            if (event.message.type === "update") {
              reloadOrder();
            }
          }}
          style={{ width: "1px", minWidth: "100%" }}
          src={cartUrl}
        />
      )}
    </div>
  );
};

const ShoppingBagPage: NextPage<Props> = ({ lang, buildLanguages = [], countries, country }) => {
  const languageCode = parseLanguageCode(lang, "toLowerCase", true);
  const countryCode = country?.code.toLowerCase() as string;
  const clMarketId = country?.marketId as string;
  const clEndpoint = process.env.NEXT_PUBLIC_CL_ENDPOINT as string;
  const clSlug = parseEndpoint(clEndpoint);
  const clToken = useGetToken({
    scope: clMarketId,
    countryCode: countryCode
  });

  return !lang ? null : (
    <Page
      buildLanguages={buildLanguages}
      lang={lang}
      clToken={clToken}
      clEndpoint={clEndpoint}
      languageCode={languageCode}
      countryCode={countryCode}
      countries={countries}
    >
      <CartIframe countryCode={countryCode} slug={clSlug} clToken={clToken} />
    </Page>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const lang = params?.lang as string;
  const countryCode = params?.countryCode as string;
  const countries = await sanityApi.getAllCountries(lang);
  const country = countries.find((country: Country) => country.code.toLowerCase() === countryCode);
  const buildLanguages = _.compact(
    process.env.BUILD_LANGUAGES?.split(",").map((l) => {
      const country = countries.find((country: Country) => country.code === parseLanguageCode(l));
      return !_.isEmpty(country) ? country : null;
    })
  );

  return {
    props: {
      lang,
      countries,
      country,
      buildLanguages
    }
  };
};

export default ShoppingBagPage;
