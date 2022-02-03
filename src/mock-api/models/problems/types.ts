import { BelongsTo } from 'miragejs/-types'

export type Problem = {
  description: string
  delivery: BelongsTo<string>
  created_at: string
  updated_at: string
}
