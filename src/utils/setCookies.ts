import { GetServerSidePropsContext } from 'next'
import { setCookie as cookies } from 'nookies'

export const setCookie = (
  name: string,
  value: string,
  ctx?: GetServerSidePropsContext | undefined
) => {
  return cookies(ctx, name, value, {
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: '/',
  })
}
