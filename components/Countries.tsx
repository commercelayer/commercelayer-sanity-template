import React, { FunctionComponent } from 'react'
import Link from 'next/link'
import _ from 'lodash'
import { Country } from '@typings/models'

type Item = Omit<Country, 'image'> & {
  image: { title: string; url: string }
}

type Props = {
  items: Item[]
  cms?: string
  searchBy?: string
}

const Countries: FunctionComponent<Props> = ({ items, searchBy }) => {
  const countries = items.map(({ image, defaultLocale, code }, key) => {
    const lang = _.first(defaultLocale.toLowerCase().split(','))
    const countryCode = code.toLowerCase()
    const href = !_.isEmpty(searchBy)
      ? {
          pathname: `/[countryCode]/[lang]`,
          query: {
            searchBy,
            countryCode,
            lang,
          },
        }
      : {
          pathname: `/[countryCode]/[lang]`,
          query: {
            countryCode,
            lang,
          },
        }
    return (
      <Link key={key} href={href}>
        <div className="cursor-pointer">
          <img
            className="w-full border rounded hover:opacity-75"
            src={image.url}
          />
        </div>
      </Link>
    )
  })
  return (
    <div className="bg-white shadow-md p-10 max-w-screen-sm mx-auto rounded">
      <h1 className="text-xl md:text-2xl mb-8">Choose your country</h1>
      <div className="grid grid-cols-2 gap-y-14 gap-x-16 md:grid-cols-4 md:gap-y-8 md:gap-x-12">
        {countries}
      </div>
    </div>
  )
}

export default Countries
