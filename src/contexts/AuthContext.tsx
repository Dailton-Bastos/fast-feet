import React from 'react'

import { useToast } from '@chakra-ui/react'
import Router from 'next/router'
import { parseCookies, destroyCookie } from 'nookies'

import { api } from '~/services/apiClient'
import { setCookie } from '~/utils/setCookies'

type User = {
  id: string
  name: string
  avatar?: string
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
  signOut: () => void
  user: User | undefined
  isAuthenticated: boolean
}

type AuthProviderProps = {
  children: React.ReactNode
}

export const AuthContext = React.createContext({} as AuthContextData)

let authChannel: BroadcastChannel

export const signOut = () => {
  destroyCookie(undefined, 'fastfeet.token')
  destroyCookie(undefined, 'fastfeet.refreshToken')

  authChannel.postMessage('signOut')

  return Router.push('/')
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = React.useState<User>()
  const toast = useToast()

  const isAuthenticated = !!user

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post('sessions', {
        email,
        password,
      })

      const { token, refreshToken, permissions, roles, id, name, avatar } =
        response.data

      setCookie('fastfeet.token', token)

      setCookie('fastfeet.refreshToken', refreshToken)

      setUser({
        id,
        name,
        avatar,
        email,
        permissions,
        roles,
      })

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`

      Router.push('/dashboard')
    } catch (error) {
      toast({
        title: 'Falha no login!',
        description: 'Email ou senha incorreto!',
        position: 'bottom-left',
        status: 'error',
        isClosable: true,
      })
      signOut()
    }
  }

  React.useEffect(() => {
    const { 'fastfeet.token': token } = parseCookies()

    async function getUser() {
      try {
        const response = await api.get('/me')
        const { id, name, avatar, email, permissions, roles } = response.data

        setUser({ id, name, avatar, email, permissions, roles })
      } catch (err) {
        toast({
          title: 'Ocorreu um erro!',
          description: 'Tente novamente!',
          position: 'bottom-left',
          status: 'error',
          isClosable: true,
        })
        signOut()
      }
    }

    if (token) {
      getUser()
    }
  }, [toast])

  React.useEffect(() => {
    authChannel = new BroadcastChannel('auth')

    authChannel.onmessage = (message) => {
      switch (message.data) {
        case 'signOut':
          signOut()
          authChannel.close()
          break

        default:
          break
      }
    }
  }, [])

  return (
    <AuthContext.Provider value={{ signIn, signOut, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => React.useContext(AuthContext)
