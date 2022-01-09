import React from 'react'

import { ChakraProvider } from '@chakra-ui/react'

import { theme } from '../styles/theme'

interface AppStoreProps {
  children: React.ReactNode
}

export const AppStorage = ({ children }: AppStoreProps) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>
}
