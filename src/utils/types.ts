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
  id: number
  name: string
  contact: string
  avatar: string
  createdAt: string
  updatedAt: string
}

export type Address = {
  id: number
  recipientId: string
  zip_code: string
  street: string
  number: string
  complement?: string
  city: string
  neighborhood: string
  state: string
  createdAt: string
  updatedAt: string
}

export type Recipient = {
  id: number
  name: string
  addresses: Address[]
  formattedAddresses?: Address[]
  deliveries: Delivery[]
  contact: string
  createdAt: string
  updatedAt: string
}

export type Delivery = {
  productName: string
  id: string
  recipient: Recipient
  deliveryman: Deliveryman
  problems: string
  selectedAddress: Address
  status: 'pending' | 'shipped' | 'cancelled' | 'delivered'
  formattedStatus: {
    name: string
    color: string
    bgColor: string
  }
  signature: string
  shippedAt: string
  deliveredAt: string
  cancelledAt: string
  createdAt: string
  updatedAt: string
}

export type DeliveriesProblems = {
  id: string
  delivery: Delivery
  deliveryId: string
  descriptions: string[]
  preview: string
  createdAt: string
  updatedAt: string
}

export type RecipientAndAddressFormData = Address & Recipient

export type UserProfile = {
  id: string
  name: string
  email: string
  avatar: string
  createdAt: string
  updatedAt: string
}
