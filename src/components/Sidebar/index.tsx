import React from 'react'

import { Box } from '@chakra-ui/react'

import { DisclosureProps } from '~/utils/types'

import { Header } from './Header'
import { Navigation } from './Navigation'

export const Sidebar = ({ isOpen, handleClick }: DisclosureProps) => {
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
      <Header isOpen={isOpen} handleClick={handleClick} />

      <Navigation isOpen={isOpen} handleClick={handleClick} />
    </Box>
  )
}
