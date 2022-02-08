import { HasMany } from 'miragejs/-types'

export type Deliveryman = {
  name: string
  contact: string
  avatar?: string
  deliveries: HasMany<string>
  created_at: string
  updated_at: string
}
