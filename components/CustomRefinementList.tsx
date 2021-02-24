import _ from 'lodash'
import { Highlight, connectRefinementList } from 'react-instantsearch-dom'

type Props = {
  items: {
    label: string
    isRefined: boolean
    value: string
    count: number
  }[]
  isFromSearch: boolean
  refine: (value: string) => void
  searchForItems: (value: string) => void
  createURL: (value: string) => string
}

const RefinementList = ({ items, isFromSearch, refine, createURL }: Props) => (
  <ul className="bg-white rounded-md -space-y-px">
    {_.isEmpty(items) ? (
      <li>
        <div
          className={`border-gray-200  border rounded-md p-4 my-1 cursor-pointer`}
        >
          <label
            className={`flex items-center text-sm justify-between cursor-pointer`}
          >
            <p className="ml-3 font-medium text-sm text-gray-900 flex-grow">
              No results found{' '}
            </p>
            <span className="bg-gray-100 text-gray-600 ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium leading-5">
              {0}
            </span>
          </label>
        </div>
      </li>
    ) : (
      items.map((item) => (
        <li key={item.label}>
          <div
            className={`${
              item.isRefined
                ? `bg-blue-50 border-blue-200 z-10`
                : 'border-gray-200'
            }  border rounded-md p-4 my-1 cursor-pointer`}
            onClick={(event) => {
              event.preventDefault()
              refine(item.value)
            }}
          >
            <label
              className={`flex items-center text-sm justify-between cursor-pointer`}
            >
              <a
                className="ml-3 font-medium text-sm text-gray-900 flex-grow"
                href={createURL(item.value)}
              >
                {isFromSearch ? (
                  <Highlight attribute="label" hit={item} />
                ) : (
                  item.label
                )}{' '}
              </a>
              <span
                className={`${
                  item.isRefined
                    ? 'bg-gray-900 text-gray-50'
                    : 'bg-gray-100 text-gray-600'
                } ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium leading-5`}
              >
                {item.count}
              </span>
            </label>
          </div>
        </li>
      ))
    )}
  </ul>
)

export default connectRefinementList(RefinementList as any)
