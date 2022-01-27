import { Server, Response } from 'miragejs'

import {
  AppSchema,
  AuthRequest,
  RefreshToken,
  UserSession,
} from '~/mock-api/auth/types'

import { generateJwtAndRefreshToken } from '../auth'
import {
  checkRefreshTokenIsValid,
  invalidateRefreshToken,
} from '../auth/database'
import { addUserInformationToRequest } from '../middlewares/addUserInformationToRequest'

export function registerRefreshToken(context: Server) {
  context.post('/refresh', function (schema: AppSchema, request: AuthRequest) {
    const hasError = addUserInformationToRequest(request)

    const { refreshToken }: RefreshToken = JSON.parse(request.requestBody)

    const email = request.user

    const user: UserSession = schema.db.users.findBy({ email })

    if (!hasError) {
      if (!user) {
        return new Response(
          401,
          { error: 'true' },
          { message: 'User not found.' }
        )
      }

      if (!refreshToken) {
        return new Response(
          401,
          { error: 'true' },
          { message: 'Refresh token is required.' }
        )
      }

      const isValidRefreshToken = checkRefreshTokenIsValid(
        user.email,
        refreshToken
      )

      if (!isValidRefreshToken) {
        return new Response(
          401,
          { error: 'true' },
          { message: 'Refresh token is invalid.' }
        )
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

    return new Response(
      201,
      { error: 'false' },
      {
        token,
        refreshToken: newRefreshToken,
        permissions: user.permissions,
        roles: user.roles,
      }
    )
  })
}
