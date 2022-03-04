import { BelongsTo, HasMany } from 'miragejs/-types'

export type Delivery = {
  recipient: BelongsTo<string>
  deliveryman: BelongsTo<string>
  problems: HasMany<string>
  status: 'pending' | 'shipped' | 'cancelled' | 'delivered'
  signature: string
  shipped_at?: Date
  delivered_at?: Date
  cancelled_at?: Date
  created_at: string
  updated_at: string
}
