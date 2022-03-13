import React from 'react'

import { useDisclosure, UseDisclosureReturn } from '@chakra-ui/react'
import { useRouter } from 'next/router'

interface DrawerProviderProps {
  children: React.ReactNode
}

type DrawerContextData = UseDisclosureReturn

export const DrawerContext = React.createContext({} as DrawerContextData)

export const DrawerProvider = ({ children }: DrawerProviderProps) => {
  const disclosure = useDisclosure()
  const router = useRouter()

  React.useEffect(() => {
    disclosure.onClose()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath])

  return (
    <DrawerContext.Provider value={disclosure}>
      {children}
    </DrawerContext.Provider>
  )
}

export const useDrawer = () => React.useContext(DrawerContext)
