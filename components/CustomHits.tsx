import { connectHits } from 'react-instantsearch-dom'
import Link from 'next/link'
import { useRouter } from 'next/router'
import _ from 'lodash'
import locale from '@locale/index'

type Props = {
  hits: {
    name: string
    image: string
    reference: string
    formattedAmount: string
    formattedCompareAtAmount: string
    description: string
    category: string
    objectID: string
    slug: string
  }[]
}

const Hits = ({ hits }: Props) => {
  const {
    query: { lang, countryCode },
  } = useRouter()
  return _.isEmpty(hits) ? (
    <div className="w-full text-gray-900 h-96">
      <p>{locale[lang as string].emptyProducts}</p>
    </div>
  ) : (
    <ul className="md:pt-7 space-y-12 sm:grid sm:grid-cols-1 md:grid-cols-3 xl:grid-cols-3 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:gap-x-8">
      {hits.map((hit) => {
        const {
          objectID,
          image,
          name,
          reference,
          formattedAmount,
          formattedCompareAtAmount,
          slug,
        } = hit
        return (
          <li key={objectID}>
            <Link
              href={`/[countryCode]/[lang]/[productName]`}
              as={`/${countryCode}/${lang}/${slug}`}
            >
              <div className="flex flex-col h-full shadow-lg rounded-lg p-5 md:p-3 cursor-pointer hover:opacity-75 hover:shadow-2xl">
                <div className="aspect-w-3 aspect-h-2 mb-5 b">
                  <img className="object-contain" src={`${image}`} alt={name} />
                </div>
                <div className="text-base leading-6 font-medium space-y-1 justify-self-start h-full">
                  <h3>{name}</h3>
                  <p className="text-gray-700 text-sm">{reference}</p>
                </div>
                <div className="justify-self-end mt-5">
                  <ul className="flex justify-between space-x-1 items-center">
                    <li>
                      <span className="text-green-600 mr-1 text-base md:text-sm">
                        {formattedAmount}
                      </span>
                      <span className="text-gray-500 line-through text-sm md:text-xs">
                        {formattedCompareAtAmount}
                      </span>
                    </li>
                    <li>
                      <a className="inline-flex uppercase items-center p-3 md:p-2 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        {locale[lang as string].viewMore}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export default connectHits(Hits)
