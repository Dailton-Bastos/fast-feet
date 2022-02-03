import { Request, Response } from 'miragejs'

import { generateJwtAndRefreshToken } from '../auth'
import { AppSchema, CreateSessionDTO, UserSession } from '../auth/types'

export const createSession = (schema: AppSchema, request: Request) => {
  const attrs = JSON.parse(request.requestBody) as unknown as CreateSessionDTO

  const user: UserSession = schema.db.users.findBy({ email: attrs.email })

  if (!user || attrs.password !== user.password) {
    return new Response(401, undefined, {
      message: 'E-mail or password incorrect.',
    })
  }

  const { name, email, avatar, permissions, roles } = user

  const { token, refreshToken } = generateJwtAndRefreshToken(email, {
    permissions: user.permissions,
    roles: user.roles,
  })

  return {
    name,
    email,
    avatar,
    token,
    refreshToken,
    permissions,
    roles,
  }
}
