import _ from 'lodash'
import React, { Fragment, useEffect, useState } from 'react'
import ProductsList from './ProductsList'
// import Link from 'next/link'

type Props = {
  taxonomies: {
    name: string
    label?: string
    taxons: any[]
  }[]
  cms: string
  activeAlgolia: () => void
  algoliaStatus: boolean
  searchEngine: boolean
  lang?: string
}

const Taxonomies = ({
  taxonomies,
  activeAlgolia,
  algoliaStatus,
  searchEngine,
}: Props) => {
  const [on, setOn] = useState<Record<string, number>>({ '0': 0 })
  const [currentProducts, setCurrentProducts] = useState([])
  useEffect(() => {
    if (!_.isEmpty(taxonomies)) {
      _.map(on, (v, k: number) => {
        setCurrentProducts(taxonomies[k].taxons[v].products || [])
      })
    }
  }, [on, taxonomies])
  const taxonomy = taxonomies?.map((t, k) => {
    const taxonCard = t.taxons.map((taxon, i) => {
      const { name, products, label } = taxon
      const pQuantity = products?.length || 0
      const initialName = label || name
      const checkedKey = { [`${k}`]: i }
      const checked = on[`${k}`] === i
      const disabled = pQuantity === 0
      return (
        <li key={i}>
          {/* <!-- On: "bg-indigo-50 border-indigo-200 z-10", Off: "border-gray-200" --> */}
          <div
            className={`${
              checked ? `bg-blue-50 border-blue-200 z-10` : 'border-gray-200'
            } ${
              disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            } border rounded-md p-4 my-1`}
            onClick={() => !disabled && setOn(checkedKey)}
          >
            <label
              className={`${
                disabled ? 'cursor-not-allowed' : 'cursor-pointer'
              } flex items-center text-sm justify-between`}
            >
              <span className="ml-3 font-medium text-sm text-gray-900 flex-grow">
                {initialName}
              </span>
              <span
                className={`${
                  checked
                    ? 'bg-gray-900 text-gray-50'
                    : 'bg-gray-100 text-gray-600'
                } ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium leading-5`}
              >
                {pQuantity}
              </span>
            </label>
          </div>
        </li>
      )
    })
    return (
      <div className="my-4" key={k}>
        <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide mb-4">
          {t?.label || t.name}
        </h2>
        <fieldset>
          <legend className="sr-only">Taxon</legend>
          <ul className=" bg-white rounded-md -space-y-px">{taxonCard}</ul>
        </fieldset>
      </div>
    )
  })
  return (
    <div className="px-3 lg:px-0 container mx-auto max-w-screen-lg flex flex-wrap sm:flex-nowrap">
      <div className="flex-shrink md:flex-shrink-0 md:pr-4 w-full sm:w-auto">
        <div className={`flex items-center mb-5 mt-${searchEngine ? 3 : 14}`}>
          {!searchEngine ? null : (
            <Fragment>
              <button
                type="button"
                aria-pressed="false"
                aria-labelledby="toggleLabel"
                className={`${
                  algoliaStatus ? 'bg-blue-500' : 'bg-gray-200'
                } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                onClick={activeAlgolia}
              >
                <span className="sr-only">Enable algolia</span>
                <span
                  aria-hidden="true"
                  className={`${
                    algoliaStatus ? 'translate-x-5' : 'translate-x-0'
                  } inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                ></span>
              </button>
              <span className="ml-3" id="toggleLabel">
                <img title="Algolia" src="/algolia.svg" />
              </span>
            </Fragment>
          )}
        </div>
        {taxonomy}
      </div>
      <div className="w-full mt-6">
        <ProductsList products={currentProducts} />
      </div>
    </div>
  )
}

export default Taxonomies
