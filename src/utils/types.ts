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
  contact: string
  avatar: string
  createdAt: string
  updatedAt: string
}

export type Address = {
  zipCode: string
  street: string
  number: string
  complement?: string
  city: string
  neighborhood: string
  state: string
  created_at: string
  updated_at: string
}

export type Recipient = {
  name: string
  addresses: Address[]
  deliveries: Delivery[]
  contact: string
  created_at: string
  updated_at: string
}

export type Delivery = {
  id: string
  recipient: Recipient
  deliveryman: Deliveryman
  problems: string
  status: 'pending' | 'shipped' | 'cancelled' | 'delivered'
  signature: string
  shipped_at?: string
  delivered_at?: string
  cancelled_at?: string
  created_at: string
  updated_at: string
}
