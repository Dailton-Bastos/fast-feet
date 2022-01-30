import type { ReactElement, ReactNode } from 'react'

import type { NextPage } from 'next'
import type { AppProps } from 'next/app'

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export interface DisclosureProps {
  isOpen?: boolean
  handleClick?: () => void
}

export type Deliveryman = {
  id: string
  name: string
  email: string
  avatar: string
  createdAt: string
  updatedAt: string
}
