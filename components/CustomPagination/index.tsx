import { connectPagination } from 'react-instantsearch-dom'
import { FunctionComponent } from 'react'
import Prev from './Prev'
import Next from './Next'

export interface CustomPaginationProps {
  currentRefinement: number
  nbPages: number
  refine: (page: number) => void
  createURL: (page: number) => string
  showPrevious?: boolean
  showNext?: boolean
  showFirst?: boolean
  showLast?: boolean
}

const Pagination: FunctionComponent<CustomPaginationProps> = ({
  currentRefinement,
  nbPages,
  refine,
  createURL,
  showPrevious = true,
  showNext = true,
}) => {
  const items = new Array(nbPages).fill(null).map((_, index) => {
    const page = index + 1
    const isSelected = currentRefinement === page
    const selected = isSelected
      ? 'border-t-2 border-blue-500 pt-4 px-4 inline-flex items-center text-sm font-medium text-blue-600'
      : 'border-t-2 border-transparent pt-4 px-4 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300'
    return (
      <a
        key={index}
        className={selected}
        href={createURL(page)}
        onClick={(event) => {
          event.preventDefault()
          refine(page)
          window.scrollTo(0, 0)
        }}
        aria-current={isSelected && 'page'}
      >
        {page}
      </a>
    )
  })
  return (
    <nav className="border-t border-gray-200 px-4 flex items-center justify-between sm:px-0">
      <Prev {...{ showPrevious, currentRefinement, refine, createURL }} />
      <div className="hidden md:-mt-px md:flex">{items}</div>
      <Next {...{ showNext, currentRefinement, refine, createURL, nbPages }} />
    </nav>
  )
}

const CustomPagination = connectPagination(Pagination)

export default CustomPagination
