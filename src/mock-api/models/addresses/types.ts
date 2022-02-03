import { BelongsTo } from 'miragejs/-types'

export type Address = {
  zipCode: string
  street: string
  number: string
  complement?: string
  city: string
  neighborhood: string
  state: string
  recipient: BelongsTo<string>
  created_at: string
  updated_at: string
}
