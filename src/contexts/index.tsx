import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

import { ChakraProvider } from '@chakra-ui/react'

import { theme } from '~/styles/theme'

import { AuthProvider } from './AuthContext'
import { QueryContextProvider } from './QueryContext'

interface AppStoreProps {
  children: React.ReactNode
}

const queryClient = new QueryClient()

export const AppStorage = ({ children }: AppStoreProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <QueryContextProvider>
          <AuthProvider>{children}</AuthProvider>
        </QueryContextProvider>
      </ChakraProvider>
    </QueryClientProvider>
  )
}
