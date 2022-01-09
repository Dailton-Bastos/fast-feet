import axios, { AxiosError } from 'axios'
import { parseCookies } from 'nookies'

import { setCookie } from '~/utils/setCookies'

type FailedRequestQueueParams = Array<{
  onSuccess: (value: string) => void
  onFailed: (err: AxiosError) => void
}>

let cookies = parseCookies()
let isRefreshing = false
let failedRequestQueue: FailedRequestQueueParams = []

export const api = axios.create({
  baseURL: 'http://localhost:3333',
})

api.defaults.headers.common[
  'Authorization'
] = `Bearer ${cookies['fastfeet.token']}`

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      if (error.response.data?.code === 'token.expired') {
        cookies = parseCookies()

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
              setCookie('fastfeet.token', token)
              setCookie('fastfeet.refreshToken', response.data.refreshToken)
              api.defaults.headers.common['Authorization'] = `Bearer ${token}`

              failedRequestQueue.forEach((request) => request.onSuccess(token))
              failedRequestQueue = []
            })
            .catch((err) => {
              failedRequestQueue.forEach((request) => request.onFailed(err))
              failedRequestQueue = []
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
      }
    }
  }
)
