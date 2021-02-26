import { Price, PricesContainer } from '@commercelayer/react-components'
import { Product } from '@typings/models'
import _ from 'lodash'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import locale from '@locale/index'

type Props = {
  products: Product[]
}

const ProductsList = ({ products }: Props) => {
  const {
    query: { countryCode, lang },
  } = useRouter()
  return (
    <div className="mt-10 sm:ml-10 lg:col-span-2">
      <ul className="md:pt-7 space-y-12 sm:grid sm:grid-cols-1 md:grid-cols-3 xl:grid-cols-3 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:gap-x-8">
        {products.map(
          ({ images, name, variants, reference, slug }, key: number) => {
            const img = _.first(images)?.url
            const code = _.first(variants)?.code
            return (
              <li key={key}>
                <Link
                  href={`/[countryCode]/[lang]/[productName]`}
                  as={`/${countryCode}/${lang}/${slug}`}
                  passHref
                >
                  <div className="flex flex-col h-full shadow-lg rounded-lg p-5 md:p-3 cursor-pointer hover:opacity-75 hover:shadow-2xl">
                    <div className="aspect-w-3 aspect-h-2 mb-5">
                      <img className="object-contain" src={`${img}`} alt="" />
                    </div>
                    <div className="text-base leading-6 font-medium space-y-1 justify-self-start h-full">
                      <h3>{name}</h3>
                      <p className="text-gray-700 text-sm">{reference}</p>
                    </div>
                    <div className="justify-self-end mt-5">
                      <ul className="flex justify-between space-x-1 items-center">
                        <li>
                          <PricesContainer skuCode={code}>
                            <Price
                              className="text-green-600 mr-1 text-base md:text-sm"
                              compareClassName="text-gray-500 line-through text-sm md:text-xs"
                            />
                          </PricesContainer>
                        </li>
                        <li>
                          <a className="inline-flex uppercase items-center p-2 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            {locale[lang as string].viewMore}
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </Link>
              </li>
            )
          }
        )}
      </ul>
    </div>
  )
}

export default ProductsList
