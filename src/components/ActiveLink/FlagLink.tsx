import React from 'react'

import { Flex, Box } from '@chakra-ui/react'
import Link, { LinkProps } from 'next/link'

interface FlagLinkProps extends LinkProps {
  isOpen?: boolean
  active: boolean
  children: React.ReactNode
}

export const FlagLink = ({
  isOpen,
  active,
  children,
  ...rest
}: FlagLinkProps) => {
  if (!isOpen && active) {
    return (
      <Flex h="100%" pos="relative" w="100%">
        <Box bg="purple.500" h="100%" left="0" pos="absolute" top="0" w="1" />
        <Link {...rest}>{children}</Link>
      </Flex>
    )
  }
  return <Link {...rest}>{children}</Link>
}
