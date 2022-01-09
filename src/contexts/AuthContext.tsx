import React from 'react'

import Router from 'next/router'

import { api } from '~/services/api'
import { setCookie } from '~/utils/setCookies'

type User = {
  email: string
  permissions: string[]
  roles: string[]
}

type SignInCredentials = {
  email: string
  password: string
}

type AuthContextData = {
  signIn: (credentials: SignInCredentials) => Promise<void>
  user: User | undefined
  isAuthenticated: boolean
}

type AuthProviderProps = {
  children: React.ReactNode
}

export const AuthContext = React.createContext({} as AuthContextData)

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = React.useState<User>()

  const isAuthenticated = !!user

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post('sessions', {
        email,
        password,
      })

      const { token, refreshToken, permissions, roles } = response.data

      setCookie('fastfeet.token', token)

      setCookie('fastfeet.refreshToken', refreshToken)

      setUser({
        email,
        permissions,
        roles,
      })

      Router.push('/deliveries')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => React.useContext(AuthContext)
