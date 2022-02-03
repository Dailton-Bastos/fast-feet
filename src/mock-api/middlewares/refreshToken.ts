import { Response } from 'miragejs'

import { generateJwtAndRefreshToken } from '../auth'
import {
  checkRefreshTokenIsValid,
  invalidateRefreshToken,
} from '../auth/database'
import {
  AppSchema,
  RefreshToken,
  UserRequest,
  UserSession,
} from '../auth/types'
import { addUserInformationToRequest } from './addUserInformationToRequest'

export const refreshToken = (schema: AppSchema, request: UserRequest) => {
  const hasError = addUserInformationToRequest(request)

  const { refreshToken }: RefreshToken = JSON.parse(request.requestBody)

  const email = request.user

  const user: UserSession = schema.db.users.findBy({ email })

  if (!hasError) {
    if (!user) {
      return new Response(401, undefined, { message: 'User not found.' })
    }

    if (!refreshToken) {
      return new Response(401, undefined, {
        message: 'Refresh token is required.',
      })
    }

    const isValidRefreshToken = checkRefreshTokenIsValid(
      user.email,
      refreshToken
    )

    if (!isValidRefreshToken) {
      return new Response(401, undefined, {
        message: 'Refresh token is invalid.',
      })
    }

    invalidateRefreshToken(user.email, refreshToken)
  }

  const { token, refreshToken: newRefreshToken } = generateJwtAndRefreshToken(
    user.email,
    {
      permissions: user.permissions,
      roles: user.roles,
    }
  )

  return {
    token,
    refreshToken: newRefreshToken,
    permissions: user.permissions,
    roles: user.roles,
  }
}
