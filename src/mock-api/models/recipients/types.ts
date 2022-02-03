import { HasMany } from 'miragejs/-types'

export type Recipient = {
  name: string
  addresses: HasMany<string>
  deliveries: HasMany<string>
  contact: string
  created_at: string
  updated_at: string
}
