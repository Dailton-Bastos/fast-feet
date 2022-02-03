import { Recipients } from '../recipients/types'

export type Deliveries = {
  recipient: Recipients
  deliveryman: number
  status: 'pending' | 'shipped' | 'cancelled' | 'delivered'
  recipient_signature: string
  shipped_at?: string
  delivered_at?: string
  cancelled_at?: string
  created_at: string
  updated_at: string
}
