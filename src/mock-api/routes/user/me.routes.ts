import { Server, Response } from 'miragejs'

import { AppSchema, AuthRequest, UserSession } from '~/mock-api/auth/types'
import { checkAuthMiddleware } from '~/mock-api/middlewares/checkAuthMiddleware'

export function getUser(context: Server) {
  context.get('/me', function (schema: AppSchema, request: AuthRequest) {
    checkAuthMiddleware(schema, request)

    const email = request.user

    const user: UserSession = schema.db.users.findBy({ email })

    if (!user) {
      return new Response(
        401,
        { error: 'true' },
        { message: 'User not found.' }
      )
    }

    return new Response(
      201,
      { error: 'false' },
      {
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        permissions: user.permissions,
        roles: user.roles,
      }
    )
  })
}
