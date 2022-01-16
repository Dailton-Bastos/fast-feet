import React from 'react'

import { Box, useDisclosure } from '@chakra-ui/react'

import { Logo } from './Logo'
import { Navigation } from './Navigation'

export const Sidebar = () => {
  const { isOpen, onToggle } = useDisclosure({
    defaultIsOpen: true,
  })
  return (
    <Box
      as="aside"
      bgColor="white"
      h="100%"
      left="0"
      pos="fixed"
      px={isOpen ? '14px' : '0'}
      py="6px"
      top="0"
      w={isOpen ? 64 : 20}
    >
      <Logo isOpen={isOpen} handleClick={onToggle} />

      <Navigation isOpen={isOpen} handleClick={onToggle} />
    </Box>
  )
}
