import { Registry, Request } from 'miragejs'
import Schema from 'miragejs/orm/schema'

import user from '../models/users'
import { User } from '../models/users/types'

type AppRegistry = Registry<{ user: typeof user }, Record<string, never>>

export type AppSchema = Schema<AppRegistry>

export type CreateSessionDTO = {
  email: string
  password: string
}

export type UserSession = User

export type RefreshTokensStore = Map<string, string[]>

export type DecodedToken = {
  sub: string
}

export type AuthRequest = Request & {
  user?: string
}

export type RefreshToken = {
  refreshToken: string | undefined
}
