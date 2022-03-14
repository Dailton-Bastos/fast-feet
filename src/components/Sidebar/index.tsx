import React from 'react'

import { Box, Progress, useBreakpointValue } from '@chakra-ui/react'

import { useMounted } from '~/hooks/useMounted'
import { DisclosureProps } from '~/utils/types'

import { Drawer } from './Drawer'
import { Header } from './Header'
import { Navigation } from './Navigation'

export const Sidebar = ({ isOpen, handleClick }: DisclosureProps) => {
  const isMobile = useBreakpointValue({ base: true, lg: false })

  const { hasMounted } = useMounted()

  if (!hasMounted) {
    return <Progress size="sm" isIndeterminate colorScheme="purple" />
  }

  if (isMobile) {
    return (
      <Drawer>
        <Navigation />
      </Drawer>
    )
  }
  return (
    <Box
      as="aside"
      bgColor="white"
      h="100%"
      left="0"
      pos="fixed"
      py="6px"
      top="0"
      zIndex="dropdown"
    >
      <Header isOpen={isOpen} handleClick={handleClick} />

      <Box
        shadow="lg"
        height="100%"
        w={isOpen ? 64 : 20}
        transition="width 0.5s"
      >
        <Navigation isOpen={isOpen} handleClick={handleClick} />
      </Box>
    </Box>
  )
}
