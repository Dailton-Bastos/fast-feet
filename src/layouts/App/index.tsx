import React from 'react'

import { useDisclosure } from '@chakra-ui/react'

import { Header } from '~/components/Header'
import { Sidebar } from '~/components/Sidebar'
import { DrawerProvider } from '~/contexts/DrawerContext'

interface AppLayoutProps {
  children: React.ReactNode
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const { isOpen, onToggle } = useDisclosure({
    defaultIsOpen: true,
  })

  return (
    <DrawerProvider>
      <Header isOpen={isOpen} />
      <Sidebar isOpen={isOpen} handleClick={onToggle} />
      <main>{children}</main>
    </DrawerProvider>
  )
}

export const appLayout = (page: React.ReactElement) => {
  return <AppLayout>{page}</AppLayout>
}
