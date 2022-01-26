import { Request, Response, Server } from 'miragejs'

import { generateJwtAndRefreshToken } from '../auth'
import { CreateSessionDTO, AppSchema, UserSession } from '../auth/types'

export function registerSessionRoutes(context: Server) {
  context.post('/sessions', function (schema: AppSchema, request: Request) {
    const { email, password } = JSON.parse(
      request.requestBody
    ) as unknown as CreateSessionDTO

    const user: UserSession = schema.db.users.findBy({ email })

    if (!user || password !== user.password) {
      return new Response(
        401,
        { error: 'true' },
        { message: 'E-mail or password incorrect.' }
      )
    }

    const { name, avatar, permissions, roles } = user

    const { token, refreshToken } = generateJwtAndRefreshToken(email, {
      permissions: user.permissions,
      roles: user.roles,
    })

    return new Response(
      201,
      { error: 'false' },
      { name, email, token, refreshToken, avatar, permissions, roles }
    )
  })
}
