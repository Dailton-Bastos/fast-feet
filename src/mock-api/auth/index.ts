import jwt from 'jsonwebtoken'

import { auth } from './config'
import { createRefreshToken } from './database'

export function generateJwtAndRefreshToken(
  email: string,
  payload: object = {}
) {
  const token = jwt.sign(payload, auth.secret, {
    subject: email,
    expiresIn: auth.expiresIn,
  })

  const refreshToken = createRefreshToken(email)

  return { token, refreshToken }
}
