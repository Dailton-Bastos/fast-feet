import jwt from 'jsonwebtoken'
import { Response } from 'miragejs'

import { auth } from '~/mock-api/auth/config'
import { AppSchema, AuthRequest, DecodedToken } from '~/mock-api/auth/types'

export function checkAuthMiddleware(schema: AppSchema, request: AuthRequest) {
  const { Authorization } = request.requestHeaders

  if (!Authorization) {
    return new Response(
      201,
      { error: 'true' },
      {
        errors: {
          code: 'token.invalid',
          message: 'Token not present.',
        },
      }
    )
  }

  const [, token] = Authorization?.split(' ')

  if (!token) {
    return new Response(
      201,
      { error: 'true' },
      {
        errors: {
          code: 'token.invalid',
          message: 'Token not present.',
        },
      }
    )
  }

  try {
    const decoded = jwt.verify(token as string, auth.secret) as DecodedToken

    request.user = decoded.sub
  } catch (error) {
    return new Response(
      201,
      { error: 'true' },
      {
        errors: {
          code: 'token.expired',
          message: 'Token invalid.',
        },
      }
    )
  }
}
