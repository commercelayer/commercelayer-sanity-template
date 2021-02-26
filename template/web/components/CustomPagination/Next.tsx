import { CustomPaginationProps } from '.'
import { FunctionComponent } from 'react'

type NextProps = Pick<
  CustomPaginationProps,
  'showNext' | 'currentRefinement' | 'createURL' | 'refine' | 'nbPages'
>
const Next: FunctionComponent<NextProps> = ({
  showNext,
  currentRefinement,
  createURL,
  refine,
  nbPages,
}) => {
  const nextPage = currentRefinement + 1
  const disabled =
    currentRefinement === nbPages || nbPages === 0
      ? 'cursor-not-allowed opacity-25'
      : ''
  return !showNext ? null : (
    <div className="-mt-px w-0 flex-1 flex justify-end">
      <a
        className={`border-t-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 ${disabled}`}
        href={createURL(nextPage)}
        onClick={(event) => {
          event.preventDefault()
          if (currentRefinement !== nbPages) {
            refine(nextPage)
            window.scrollTo(0, 0)
          }
        }}
      >
        Next
        <svg
          className="ml-3 h-5 w-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </a>
    </div>
  )
}

export default Next
