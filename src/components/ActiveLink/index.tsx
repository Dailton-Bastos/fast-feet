import React from 'react'

import { LinkProps } from 'next/link'
import { useRouter } from 'next/router'

import { FlagLink } from './FlagLink'

interface ActiveLinkProps extends LinkProps {
  isOpen: boolean | undefined
  shouldMatchExactHref?: boolean
  children: React.ReactElement
}

export const ActiveLink = ({
  isOpen,
  shouldMatchExactHref = false,
  children,
  ...rest
}: ActiveLinkProps) => {
  const { asPath } = useRouter()

  let isActive = Boolean(
    shouldMatchExactHref && (asPath === rest.href || asPath || rest.as)
  )

  if (
    !shouldMatchExactHref &&
    (asPath.startsWith(String(rest.href)) || asPath.startsWith(String(rest.as)))
  ) {
    isActive = true
  }

  return (
    <FlagLink isOpen={isOpen} active={isActive} {...rest}>
      {React.cloneElement(children, {
        color: isActive ? 'purple.500' : 'inherit',
      })}
    </FlagLink>
  )
}
