import React, { useState } from 'react'
import Layout from '@components/Layout'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import locale from '@locale/index'
import { InstantSearch, Configure } from 'react-instantsearch-dom'
import { searchClient } from '@utils/algolia'
import CustomPagination from '@components/CustomPagination'
import {
  CommerceLayer,
  OrderContainer,
  OrderStorage,
} from '@commercelayer/react-components'
import { useGetToken } from '@hooks/GetToken'
import { parseLanguageCode, parseLocale } from '@utils/parser'
import _ from 'lodash'
import { useRouter } from 'next/router'
import { cmsFunctions } from '@utils/cms'
import Taxonomies from '@components/Taxonomies'
import queryString from 'query-string'
import CustomSearchBox from '@components/CustomSearchBox'
import CustomRefinementList from '@components/CustomRefinementList'
import CustomSortBy from '@components/CustomSortBy'
import CustomHits from '@components/CustomHits'
import { Country } from '@typings/models'

type Props = {
  lang: string
  cms: string
  taxonomies: any
  country: {
    code: string
    defaultLocale: string
    marketId: string
  }
  clientId: string
  endpoint: string
  searchEngine: string
  buildLanguages?: Country[]
  countries?: any[]
}

const FilterPage: NextPage<Props> = ({
  country,
  taxonomies,
  clientId,
  endpoint,
  searchEngine,
  buildLanguages = [],
  countries = [],
  lang,
  cms,
}) => {
  const {
    query: { countryCode, searchBy, lang: currentLang },
    push,
    asPath,
  } = useRouter()
  const parseUrl = queryString.parseUrl(asPath)
  const showSearch = _.has(parseUrl.query, 'searchBy')
  const [activeAlgolia, setActiveAlgolia] = useState(showSearch)
  const code = country?.code.toLowerCase()
  const marketId = country?.marketId || 'all'
  const token = useGetToken({
    clientId,
    endpoint,
    scope: `market:${marketId}`,
    countryCode: countryCode as string,
  })
  const indexLang = parseLocale(currentLang as string, '-', '-')
  const indexName = `${cms}_${code}_${indexLang}`
  const handleActiveAlgolia = () => {
    setActiveAlgolia(!activeAlgolia)
    !!searchBy
      ? push(`/${countryCode}/${lang}`)
      : push(`/${countryCode}/${lang}?searchBy=${searchEngine}`)
  }
  const languageCode = parseLanguageCode(lang, 'toLowerCase', true)
  return !endpoint ? null : (
    <CommerceLayer accessToken={token} endpoint={endpoint}>
      <OrderStorage persistKey={`order-${code}`}>
        <OrderContainer attributes={{ language_code: languageCode }}>
          <Layout
            title="Commerce Layer Starter"
            buildLanguages={buildLanguages}
            countries={countries}
            lang={lang}
            cms={cms}
          >
            {showSearch ? (
              <InstantSearch searchClient={searchClient} indexName={indexName}>
                <Configure facetingAfterDistinct />
                <div className="px-3 lg:px-0 container mx-auto max-w-screen-lg flex flex-wrap sm:flex-nowrap">
                  <div className="flex-shrink md:flex-shrink-0 md:pr-4 pb-4 w-full sm:w-auto">
                    <div className="flex items-center mb-5 mt-3">
                      <button
                        type="button"
                        aria-pressed="false"
                        aria-labelledby="toggleLabel"
                        className={`${
                          activeAlgolia ? 'bg-blue-500' : 'bg-gray-200'
                        } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                        onClick={handleActiveAlgolia}
                      >
                        <span className="sr-only">Enable algolia</span>
                        <span
                          aria-hidden="true"
                          className={`${
                            activeAlgolia ? 'translate-x-5' : 'translate-x-0'
                          } inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                        ></span>
                      </button>
                      <span className="ml-3" id="toggleLabel">
                        <img title="Algolia" src="/algolia.svg" />
                      </span>
                    </div>
                    <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide mb-4">
                      {locale[lang].categories}:
                    </h2>
                    <CustomRefinementList
                      attribute={locale[lang].algoliaCategory}
                    />
                  </div>
                  <div className="my-5 md:my-0 sm:ml-10 lg:col-span-2 w-full">
                    <div className="flex flex-row flex-wrap md:flex-nowrap items-center justify-center px-4 md:px-0 md:justify-between mt-1 mb-3.5 space-x-5">
                      <div className="w-full lg:w-9/12">
                        <CustomSearchBox />
                      </div>
                      <div className="flex flex-row items-center space-x-5 w-full md:w-1/2 lg:w-auto mt-1 md:mt-0">
                        <div className="flex-shrink-0">
                          <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">
                            {locale[lang].sortBy}:
                          </h2>
                        </div>
                        <div className="w-full flex-shrink">
                          <CustomSortBy
                            defaultRefinement={indexName}
                            items={[
                              {
                                value: `${indexName}`,
                                label: locale[lang].featured,
                              },
                              {
                                value: `${indexName}_price_desc`,
                                label: locale[lang].highestPrice,
                              },
                              {
                                value: `${indexName}_price_asc`,
                                label: locale[lang].lowestPrice,
                              },
                            ]}
                          />
                        </div>
                      </div>
                    </div>
                    <CustomHits />
                    <div className="mt-10">
                      <CustomPagination showFirst />
                    </div>
                  </div>
                </div>
              </InstantSearch>
            ) : (
              <Taxonomies
                cms={cms}
                taxonomies={taxonomies}
                algoliaStatus={activeAlgolia}
                activeAlgolia={handleActiveAlgolia}
                searchEngine={!_.isEmpty(searchEngine)}
              />
            )}
          </Layout>
        </OrderContainer>
      </OrderStorage>
    </CommerceLayer>
  )
}

export default FilterPage

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const lang = params?.lang as string
    const cms = process.env.BUILD_CMS
    const countryCode =
      params?.countryCode || process.env.BUILD_COUNTRY?.toLowerCase()
    const countries = _.has(cmsFunctions, `${cms}AllCountries`)
      ? await cmsFunctions[`${cms}AllCountries`](lang)
      : {}
    const buildLanguages = _.compact(
      process.env.BUILD_LANGUAGES?.split(',').map((l) => {
        const country = countries.find(
          (country: Country) => country.code === parseLanguageCode(l)
        )
        return !_.isEmpty(country) ? country : null
      })
    )
    const country = countries.find(
      (country: Country) => country.code.toLowerCase() === countryCode
    )
    const taxonomies = _.has(cmsFunctions, `${cms}AllTaxonomies`)
      ? await cmsFunctions[`${cms}AllTaxonomies`](country.catalog.id, lang)
      : {}
    return {
      props: {
        country,
        countries,
        taxonomies,
        clientId: process.env.CL_CLIENT_ID,
        endpoint: process.env.CL_ENDPOINT,
        buildLanguages,
        searchEngine: process.env.BUILD_SEARCH_ENGINE || '',
        lang,
        cms,
      },
      revalidate: 60,
    }
  } catch (err:any) {
    console.error(err)
    return {
      props: {
        clientId: process.env.CL_CLIENT_ID,
        endpoint: process.env.CL_ENDPOINT,
        errors: err.message,
      },
      revalidate: 60,
    }
  }
}
