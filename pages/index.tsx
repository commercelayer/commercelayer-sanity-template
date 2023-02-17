import Link from "next/link";
import { GetStaticProps } from "next";
import Layout from "@components/Layout";
import Countries from "@components/Countries";
import { cmsList } from "@utils/cms";
import _ from "lodash";
import { searchEngineList } from "@utils/search";
import { cmsFunctions } from "@utils/cms";

type Props = {
  [key: string]: any;
  countries: any[];
  cms: "sanity";
  searchEngine?: "algolia";
};

const IndexPage = (props: Props) => {
  const { cms, searchEngine, countries } = props;
  return (
    <Layout showMenu={false} cms={cms}>
      <div className="pb-10 px-5 md:px-0 max-w-screen-lg mx-auto container">
        <Countries items={countries} cms={cms} searchBy={searchEngine} />
      </div>
      {/* Consider removing this in production */}
      <Link
        href="/studio"
        target="_blank"
        rel="noreferrer noopener"
        className="text-center block text-sm text-gray-700 hover:text-gray-900"
      >
        Go to Sanity Studio &rarr;
      </Link>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const cms = cmsList();
  const searchEngine = searchEngineList();
  const countries = _.has(cmsFunctions, `${cms}AllCountries`) ? await cmsFunctions[`${cms}AllCountries`]() : [];
  return {
    props: {
      countries,
      cms,
      searchEngine
    },
    revalidate: false
  };
};

export default IndexPage;
