import React, { useContext, FunctionComponent } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import _ from 'lodash'
import Layout from '@components/Layout'
import {
  CommerceLayer,
  Price,
  PricesContainer,
  VariantsContainer,
  VariantSelector,
  OrderContainer,
  ItemContainer,
  AddToCartButton,
  OrderStorage,
} from '@commercelayer/react-components'
import LayoutContext from '@context/LayoutContext'
import { useGetToken } from '@hooks/GetToken'
import { useRouter } from 'next/router'
import locale from '@locale/index'
import { parseImg, parseLanguageCode } from '@utils/parser'
import { cmsFunctions } from '@utils/cms'
import { Product, Country } from '@typings/models'

const AddToCartCustom = (props: any) => {
  const { className, label, disabled, handleClick } = props
  const { handleAnimation } = useContext(LayoutContext)
  const customHandleClick = async (e: any) => {
    const { success } = await handleClick(e)
    if (success && handleAnimation) handleAnimation(e)
  }
  return (
    <button
      disabled={disabled}
      className={className}
      onClick={customHandleClick}
    >
      {label}
    </button>
  )
}

type Props = {
  product: Product
  clientId: string
  endpoint: string
  countryCode: string
  lang: string
  marketId: string
  buildLanguages?: Country[]
  cms: string
  countries: Country[]
}

const ProductPage: FunctionComponent<Props> = ({
  product,
  clientId,
  endpoint,
  countryCode,
  lang = 'en-US',
  marketId,
  buildLanguages,
  cms,
  countries,
}) => {
  const router = useRouter()
  const token = useGetToken({
    clientId,
    endpoint,
    scope: marketId,
    countryCode: router.query?.countryCode as string,
  })
  const imgUrl = parseImg(_.first(product?.images)?.url as string, cms)
  const firstVariantCode = _.first(product?.variants)?.code
  const variantOptions = product?.variants?.map((variant) => {
    return {
      label: variant.size.name,
      code: variant.code,
      lineItem: {
        name: product.name,
        imageUrl: _.first(variant.images)?.url,
      },
    }
  })
  const handleBackTo = (e: any) => {
    e.preventDefault()
    router.back()
  }
  const languageCode = parseLanguageCode(lang, 'toLowerCase', true)
  return !product ? null : (
    <CommerceLayer accessToken={token} endpoint={endpoint}>
      <OrderStorage persistKey={`order-${countryCode}`}>
        <OrderContainer attributes={{ languageCode }}>
          <Layout
            cms={cms}
            title={product.name}
            lang={lang}
            buildLanguages={buildLanguages}
            countries={countries}
          >
            <ItemContainer>
              <div className="container mx-auto max-w-screen-lg px-5 lg:px-0 text-sm text-gray-700">
                <a href="#" onClick={handleBackTo}>
                  <img src="/back.svg" className="w-5 h-5 inline-block" />
                  <p className="ml-2 hover:underline inline-block align-middle">
                    {locale[lang].backToAllProducts}
                  </p>
                </a>
              </div>
              <div className="container mx-auto max-w-screen-lg py-10 lg:py-16 flex flex-row">
                <div className="flex flex-wrap sm:flex-nowrap sm:space-x-5 px-5 lg:px-0">
                  <div className="w-full pb-5 lg:pb-0">
                    <img
                      alt={product.name}
                      className="w-full object-center rounded border border-gray-200"
                      src={imgUrl}
                    />
                  </div>
                  <div className="w-full">
                    <h2 className="text-sm title-font text-gray-500 tracking-widest">
                      BRAND
                    </h2>
                    <h1 className="text-gray-900 text-3xl title-font font-medium my-3">
                      {product.name}
                    </h1>
                    <p className="leading-relaxed">{product.description}</p>
                    <div className="flex items-center border-b-2 border-gray-200 py-5">
                      <div className="flex items-center">
                        <div className="relative" data-children-count="1">
                          <VariantsContainer>
                            <VariantSelector
                              placeholder={locale[lang].selectSize as string}
                              options={_.sortBy(variantOptions, 'label')}
                              className="rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-blue-500 text-base pl-3 pr-10"
                            />
                          </VariantsContainer>
                          <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                            <svg
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              className="w-4 h-4"
                              viewBox="0 0 24 24"
                            >
                              <path d="M6 9l6 6 6-6"></path>
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center pt-5">
                      <span className="title-font font-medium text-2xl text-gray-900">
                        <PricesContainer>
                          <Price
                            skuCode={firstVariantCode}
                            className="text-green-600 mr-1"
                            compareClassName="text-gray-500 line-through text-lg"
                          />
                        </PricesContainer>
                      </span>
                      <AddToCartButton
                        label={locale[lang].addToCart as string}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm md:text-base font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {AddToCartCustom}
                      </AddToCartButton>
                    </div>
                  </div>
                </div>
              </div>
            </ItemContainer>
          </Layout>
        </OrderContainer>
      </OrderStorage>
    </CommerceLayer>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  const lang = params?.lang as string
  const cms = process.env.BUILD_CMS
  const countryCode =
    params?.countryCode || process.env.BUILD_COUNTRY?.toLowerCase()
  const slug = params?.product
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
  const product = _.has(cmsFunctions, `${cms}GetProduct`)
    ? await cmsFunctions[`${cms}GetProduct`](slug, lang)
    : {}
  return {
    props: {
      product,
      clientId: process.env.CL_CLIENT_ID,
      endpoint: process.env.CL_ENDPOINT,
      lang,
      countryCode,
      marketId: `market:${country?.marketId}`,
      buildLanguages,
      cms: process.env.BUILD_CMS,
      countries,
    },
    revalidate: 60,
  }
}

export default ProductPage
