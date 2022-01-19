import React from 'react'

import { useDisclosure, UseDisclosureReturn } from '@chakra-ui/react'

interface DrawerProviderProps {
  children: React.ReactNode
}

type DrawerContextData = UseDisclosureReturn

export const DrawerContext = React.createContext({} as DrawerContextData)

export const DrawerProvider = ({ children }: DrawerProviderProps) => {
  const disclosure = useDisclosure()

  return (
    <DrawerContext.Provider value={disclosure}>
      {children}
    </DrawerContext.Provider>
  )
}

export const useDrawer = () => React.useContext(DrawerContext)
