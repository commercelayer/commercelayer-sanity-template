import React, { FunctionComponent, Fragment } from 'react'

export interface SocialIcon {
  href: string
  src: string
  alt: string
}

type Props = {
  items: SocialIcon[]
}

const SocialIcons: FunctionComponent<Props> = ({ items }) => {
  const icons = items.map(({ href, src, alt }, key) => {
    return (
      <a
        key={key}
        href={href}
        className="mt-6 md:mt-0 md:flex-grow md:text-right"
      >
        <img src={`/${src}`} className="inline w-6 mx-2" alt={alt} />
      </a>
    )
  })
  return <Fragment>{icons}</Fragment>
}

export default SocialIcons
