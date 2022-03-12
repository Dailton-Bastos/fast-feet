import { BelongsTo, HasMany } from 'miragejs/-types'

export type Delivery = {
  product_name: string
  recipient: BelongsTo<string>
  deliveryman: BelongsTo<string>
  problems: HasMany<string>
  status: 'pending' | 'shipped' | 'cancelled' | 'delivered'
  signature: string
  shipped_at: string
  delivered_at: string
  cancelled_at: string
  created_at: string
  updated_at: string
}
