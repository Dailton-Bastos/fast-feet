import React from 'react'

import { Box, useDisclosure } from '@chakra-ui/react'

import { Header } from '~/components/Header'
import { Sidebar } from '~/components/Sidebar'
import { DrawerProvider } from '~/contexts/DrawerContext'

interface AppLayoutProps {
  children: React.ReactNode
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const { isOpen, onToggle } = useDisclosure()

  return (
    <DrawerProvider>
      <Header isOpen={isOpen} />
      <Sidebar isOpen={isOpen} handleClick={onToggle} />
      <Box as="main" px={['0', null, null, '20']} pt="5" mt={['12', '20']}>
        {children}
      </Box>
    </DrawerProvider>
  )
}

export const appLayout = (page: React.ReactElement) => {
  return <AppLayout>{page}</AppLayout>
}
