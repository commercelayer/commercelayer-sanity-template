import React, { FunctionComponent, useState } from 'react'
import { useRouter } from 'next/router'
import _ from 'lodash'
import { Transition } from '@headlessui/react'
import { Country } from '@typings/models'
import locale from '@locale/index'

type Props = {
  options: Country[]
}

const LanguageSelector: FunctionComponent<Props> = ({ options }) => {
  const [show, setShow] = useState(false)
  const {
    push,
    query: { searchBy, lang, countryCode },
  } = useRouter()
  const optionComponents = options.map(
    ({ code, name, image, defaultLocale }) => {
      return {
        value: defaultLocale?.toLowerCase(),
        name,
        image,
        code: code?.toLowerCase(),
      }
    }
  )
  const selectedOption = _.first(
    optionComponents.filter(({ value }) => value === lang)
  )
  const handleChange = (defaultLocale: string) => {
    searchBy
      ? push(`/${countryCode}/${defaultLocale}?searchBy=${searchBy}`)
      : push(`/${countryCode}/${defaultLocale}`)
    setShow(!show)
  }
  return (
    <div>
      <div className="mt-1 relative">
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded="true"
          aria-labelledby="listbox-label"
          onClick={() => setShow(!show)}
          className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <span className="flex items-center">
            <span className="flex-shrink-0 text-gray-700 truncate capitalize">
              {locale[lang as string].language}:{' '}
            </span>
            <img
              src={selectedOption?.image?.url}
              alt={selectedOption?.name}
              className="block ml-3 mt-0.5 w-6"
            />
          </span>
          <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </button>

        <Transition
          show={show}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="absolute mt-1 w-full rounded-md bg-white shadow-lg"
            onMouseLeave={() => setShow(false)}
          >
            <ul
              title="Languages"
              tabIndex={-1}
              role="listbox"
              aria-labelledby="listbox-label"
              aria-activedescendant="listbox-item-3"
              className="max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
            >
              {optionComponents.map(({ value, name, image }, k) => {
                const selected = value === selectedOption?.value
                return (
                  <li
                    key={k}
                    role="option"
                    className={`cursor-default select-none relative py-2 pl-3 pr-9 hover:text-gray-50 hover:bg-blue-500 ${
                      selected ? '' : 'text-gray-900'
                    }`}
                    onClick={() => handleChange(value)}
                  >
                    <div className="flex items-center">
                      <img
                        src={image?.url}
                        alt={name}
                        className="flex-shrink-0 w-6"
                      />
                      <span
                        className={`${
                          selected ? 'font-semibold' : 'font-normal'
                        } ml-3 block font-normal capitalize truncate`}
                      >
                        {locale[lang as string].languages[value as string]}
                      </span>
                    </div>
                    {/* Highlighted: "text-white", Not Highlighted: "text-indigo-600" */}
                    <span
                      className={`${
                        selected ? 'text-gray-900' : 'hidden'
                      } absolute inset-y-0 right-0 flex items-center pr-4 hover:bg-blue-500`}
                    >
                      <svg
                        className="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>
        </Transition>
      </div>
    </div>
  )
}

export default LanguageSelector
