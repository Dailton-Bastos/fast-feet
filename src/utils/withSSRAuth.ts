import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next'
import { destroyCookie, parseCookies } from 'nookies'

import { AuthTokenError } from '~/services/errors/AuthTokenError'

export function withSSRAuth<P>(fn: GetServerSideProps<P>) {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx)

    if (!cookies['fastfeet.token']) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      }
    }

    try {
      return await fn(ctx)
    } catch (error) {
      if (error instanceof AuthTokenError) {
        destroyCookie(ctx, 'fastfeet.token')
        destroyCookie(ctx, 'fastfeet.refreshToken')

        return {
          redirect: {
            destination: '/',
            permanent: false,
          },
        }
      } else {
        return {
          redirect: {
            destination: '/deliveries',
            permanent: false,
          },
        }
      }
    }
  }
}
