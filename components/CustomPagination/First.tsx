import { CustomPaginationProps } from '.'
import { FunctionComponent } from 'react'

type FirstProps = Pick<
  CustomPaginationProps,
  'showFirst' | 'currentRefinement' | 'createURL' | 'refine'
>

const First: FunctionComponent<FirstProps> = ({
  showFirst,
  currentRefinement,
  createURL,
  refine,
}) => {
  const disabled =
    currentRefinement === 1 ? 'cursor-not-allowed opacity-25' : ''
  return !showFirst ? null : (
    <li className={`pagination`}>
      <a
        className={disabled}
        href={createURL(1)}
        onClick={(event) => {
          event.preventDefault()
          if (currentRefinement > 1) {
            refine(1)
            window.scrollTo(0, 0)
          }
        }}
      >
        {'<<'}
      </a>
    </li>
  )
}

export default First
