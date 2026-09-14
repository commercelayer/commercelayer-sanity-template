import _ from "lodash";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useGetToken } from "@hooks/GetToken";
import Page from "@components/Page";
import Hero from "@components/Hero";
import Taxonomies from "@components/Taxonomies";
import { Country, Taxonomy } from "@typings/models";
import { parseLanguageCode } from "@utils/parser";
import sanityApi from "@utils/sanity/api";

type Props = {
  lang: string;
  countries: Country[];
  country: Country;
  taxonomies: Taxonomy[];
  buildLanguages: Country[];
};

const HomePage: NextPage<Props> = ({ lang, countries, country, taxonomies, buildLanguages }) => {
  const languageCode = parseLanguageCode(lang, "toLowerCase", true);
  const countryCode = country?.code.toLowerCase() as string;
  const clMarketCode = country?.marketCode as string;
  const clToken = useGetToken({
    scope: `market:code:${clMarketCode}`,
    countryCode: countryCode
  });

  return !lang ? null : (
    <Page
      buildLanguages={buildLanguages}
      lang={lang}
      clToken={clToken}
      languageCode={languageCode}
      countryCode={countryCode}
      countries={countries}
    >
      <Hero lang={lang} />
      <Taxonomies taxonomies={taxonomies} />
    </Page>
  );
};

export default HomePage;

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
  const taxonomies = await sanityApi.getAllTaxonomies(country.catalog.id, lang);
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
      taxonomies,
      buildLanguages
    },
    revalidate: 60
  };
};
