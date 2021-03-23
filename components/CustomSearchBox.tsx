import { connectSearchBox } from 'react-instantsearch-dom'

type Props = {
  currentRefinement: string
  isSearchStalled: boolean
  placeholder?: string
  className?: string
  refine: (value: string) => void
}

const SearchBox = ({
  currentRefinement,
  isSearchStalled,
  refine,
  className = 'w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md',
  placeholder = 'Search products...',
}: Props) => (
  <form noValidate action="" role="search">
    <input
      className={className}
      type="search"
      placeholder={placeholder}
      value={currentRefinement}
      onChange={(event) => refine(event.currentTarget.value)}
    />
    {/* <button onClick={() => refine('')}>Reset query</button> */}
    {isSearchStalled ? 'My search is stalled' : ''}
  </form>
)

export default connectSearchBox(SearchBox)
