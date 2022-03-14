import React from 'react'

import { Box, Flex, useDisclosure } from '@chakra-ui/react'

import Footer from '~/components/Footer'
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
      <Flex direction="column" minH="100vh">
        <Header isOpen={isOpen} />
        <Sidebar isOpen={isOpen} handleClick={onToggle} />
        <Box
          as="main"
          px={['0', null, null, '20']}
          pt="5"
          mt={['12', '20']}
          flex="1"
        >
          {children}
        </Box>
        <Footer />
      </Flex>
    </DrawerProvider>
  )
}

export const appLayout = (page: React.ReactElement) => {
  return <AppLayout>{page}</AppLayout>
}
