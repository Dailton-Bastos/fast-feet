import axios, { AxiosError } from 'axios'
import { parseCookies } from 'nookies'

import { setCookie } from '~/utils/setCookies'

let cookies = parseCookies()

export const api = axios.create({
  baseURL: 'http://localhost:3333',
})

api.defaults.headers.common[
  'Authorization'
] = `Bearer ${cookies['fastfeet.token']}`

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      if (error.response.data?.code === 'token.expired') {
        cookies = parseCookies()

        const { 'fastfeet.refreshToken': refreshToken } = cookies

        const response = await api.post('/refresh', {
          refreshToken,
        })

        const { token } = response.data

        setCookie('fastfeet.token', token)
        setCookie('fastfeet.refreshToken', response.data.refreshToken)

        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      }
    }
  }
)
