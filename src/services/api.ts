import axios, { AxiosError } from 'axios'
import { GetServerSidePropsContext } from 'next'
import { parseCookies } from 'nookies'

import { signOut } from '~/contexts/AuthContext'
import { setCookie } from '~/utils/setCookies'

import { AuthTokenError } from './errors/AuthTokenError'

type FailedRequestQueueParams = Array<{
  onSuccess: (value: string) => void
  onFailed: (err: AxiosError) => void
}>

let isRefreshing = false
let failedRequestQueue: FailedRequestQueueParams = []

export function setupAPIClient(ctx?: GetServerSidePropsContext) {
  let cookies = parseCookies(ctx)

  const api = axios.create({
    baseURL: 'http://localhost:3000/mock-api',
  })

  api.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${cookies['fastfeet.token']}`

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        if (error.response.data?.code === 'token.expired') {
          cookies = parseCookies(ctx)

          const { 'fastfeet.refreshToken': refreshToken } = cookies
          const originalConfig = error.config

          if (!isRefreshing) {
            isRefreshing = true

            api
              .post('/refresh', {
                refreshToken,
              })
              .then((response) => {
                const { token } = response.data
                setCookie('fastfeet.token', token, ctx)
                setCookie(
                  'fastfeet.refreshToken',
                  response.data.refreshToken,
                  ctx
                )
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`

                failedRequestQueue.forEach((request) =>
                  request.onSuccess(token)
                )
                failedRequestQueue = []
              })
              .catch((err) => {
                failedRequestQueue.forEach((request) => request.onFailed(err))
                failedRequestQueue = []

                if (process.browser) {
                  signOut()
                }
              })
              .finally(() => {
                isRefreshing = false
              })
          }

          return new Promise((resolve, reject) => {
            failedRequestQueue.push({
              onSuccess: (token) => {
                if (originalConfig.headers) {
                  originalConfig.headers['Authorization'] = `Bearer ${token}`
                  return resolve(api(originalConfig))
                }
              },
              onFailed: (err) => reject(err),
            })
          })
        } else {
          if (process.browser) {
            signOut()
          } else {
            return Promise.reject(new AuthTokenError())
          }
        }
      }

      return Promise.reject(error)
    }
  )

  return api
}
