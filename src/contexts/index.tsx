import React from 'react'

import { ChakraProvider } from '@chakra-ui/react'

import { theme } from '~/styles/theme'

import { AuthProvider } from './AuthContext'

interface AppStoreProps {
  children: React.ReactNode
}

export const AppStorage = ({ children }: AppStoreProps) => {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>{children}</AuthProvider>
    </ChakraProvider>
  )
}
