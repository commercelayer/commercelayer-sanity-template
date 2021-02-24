import { CustomPaginationProps } from '.'
import { FunctionComponent } from 'react'

type LastProps = Pick<
  CustomPaginationProps,
  'showLast' | 'currentRefinement' | 'createURL' | 'refine' | 'nbPages'
>

const Last: FunctionComponent<LastProps> = ({
  showLast,
  currentRefinement,
  createURL,
  refine,
  nbPages,
}) => {
  const disabled =
    currentRefinement === nbPages ? 'cursor-not-allowed opacity-25' : ''
  return !showLast ? null : (
    <li className={`pagination`}>
      <a
        className={disabled}
        href={createURL(nbPages)}
        onClick={(event) => {
          event.preventDefault()
          if (currentRefinement < nbPages) {
            refine(nbPages)
            window.scrollTo(0, 0)
          }
        }}
      >
        {'>>'}
      </a>
    </li>
  )
}

export default Last
