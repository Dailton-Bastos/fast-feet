import { v4 as uuid } from 'uuid'

import { RefreshTokensStore } from './types'

export const tokens: RefreshTokensStore = new Map()

export function createRefreshToken(email: string) {
  const currentUserTokens = tokens.get(email) ?? []
  const refreshToken = uuid()

  tokens.set(email, [...currentUserTokens, refreshToken])

  localStorage.tokens = JSON.stringify(Array.from(tokens.entries()))

  return refreshToken
}

export function checkRefreshTokenIsValid(email: string, refreshToken: string) {
  const token: RefreshTokensStore = new Map(JSON.parse(localStorage.tokens))

  const storedRefreshTokens = token.get(email) ?? []

  return storedRefreshTokens.some((storedToken) => storedToken === refreshToken)
}

export function invalidateRefreshToken(email: string, refreshToken: string) {
  const token: RefreshTokensStore = new Map(JSON.parse(localStorage.tokens))

  const storedRefreshTokens = token.get(email) ?? []

  tokens.set(
    email,
    storedRefreshTokens.filter((storedToken) => storedToken !== refreshToken)
  )
}
