import { v4 as uuid } from 'uuid'

import { RefreshTokensStore } from './types'

export const tokens: RefreshTokensStore = new Map()

export function createRefreshToken(email: string) {
  const currentUserTokens = tokens.get(email) ?? []
  const refreshToken = uuid()

  tokens.set(email, [...currentUserTokens, refreshToken])

  return refreshToken
}
