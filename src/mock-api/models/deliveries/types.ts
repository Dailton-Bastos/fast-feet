import { BelongsTo, HasMany } from 'miragejs/-types'

export type Delivery = {
  recipient: BelongsTo<string>
  deliveryman: BelongsTo<string>
  problems: HasMany<string>
  status: {
    name: 'pending' | 'shipped' | 'cancelled' | 'delivered'
    color: string
    bgColor: string
  }
  signature: string
  shipped_at?: string
  delivered_at?: string
  cancelled_at?: string
  created_at: string
  updated_at: string
}
