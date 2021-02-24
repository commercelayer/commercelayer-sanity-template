import { CustomPaginationProps } from '.'
import { FunctionComponent } from 'react'

type PrevProps = Pick<
  CustomPaginationProps,
  'showPrevious' | 'currentRefinement' | 'createURL' | 'refine'
>
const Prev: FunctionComponent<PrevProps> = ({
  showPrevious,
  currentRefinement,
  createURL,
  refine,
}) => {
  const prevPage = currentRefinement - 1
  const disabled = prevPage === 0 ? 'cursor-not-allowed opacity-25' : ''
  return !showPrevious ? null : (
    <div className="-mt-px w-0 flex-1 flex">
      <a
        className={`border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 ${disabled}`}
        href={createURL(prevPage)}
        onClick={(event) => {
          event.preventDefault()
          if (prevPage > 0) {
            refine(prevPage)
            window.scrollTo(0, 0)
          }
        }}
      >
        <svg
          className="mr-3 h-5 w-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        Previous
      </a>
    </div>
  )
}

export default Prev
