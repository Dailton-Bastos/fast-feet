import decode from 'jwt-decode'
import { Response } from 'miragejs'

import { AuthRequest, DecodedToken } from '~/mock-api/auth/types'

export function addUserInformationToRequest(request: AuthRequest) {
  const { Authorization } = request.requestHeaders

  if (!Authorization) {
    return new Response(
      401,
      { error: 'true' },
      {
        code: 'token.invalid',
        message: 'Token not present.',
      }
    )
  }

  const [, token] = Authorization?.split(' ')

  if (!token) {
    return new Response(
      401,
      { error: 'true' },
      {
        code: 'token.invalid',
        message: 'Token not present.',
      }
    )
  }

  try {
    const decoded = decode(token as string) as DecodedToken

    request.user = decoded.sub
  } catch (error) {
    return new Response(
      401,
      { error: 'true' },
      {
        code: 'token.expired',
        message: 'Token invalid.',
      }
    )
  }
}
