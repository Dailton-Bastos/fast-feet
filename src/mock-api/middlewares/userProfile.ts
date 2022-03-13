import { Response } from 'miragejs'

import { AppSchema, UserRequest, UserSession } from '../auth/types'
import { checkAuthMiddleware } from './checkAuthMiddleware'

export const me = (schema: AppSchema, request: UserRequest) => {
  const hasError = checkAuthMiddleware(request)

  if (!hasError) {
    const email = request.user

    const user: UserSession = schema.db.users.findBy({ email })

    if (!user) {
      return new Response(401, undefined, { message: 'User not found.' })
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      permissions: user.permissions,
      roles: user.roles,
    }
  }

  return hasError
}
