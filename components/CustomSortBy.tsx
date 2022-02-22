import { connectSortBy } from 'react-instantsearch-dom'

type Props = {
  items: {
    label: string
    value: string
    isRefined: boolean
  }[]
  refine: (value: string) => void
  createURL: (value: string) => string
}

const SortBy = ({ items, refine }: Props) => (
  <select
    title="Sort by"
    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
    onChange={(event) => {
      refine(event.currentTarget.value)
    }}
  >
    {items.map((item) => (
      <option key={item.value} value={item.value}>
        {item.label}
      </option>
    ))}
  </select>
)

export default connectSortBy(SortBy)
