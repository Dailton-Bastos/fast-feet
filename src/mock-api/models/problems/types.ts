import { BelongsTo } from 'miragejs/-types'

export type Problem = {
  descriptions: string[]
  delivery: BelongsTo<string>
  created_at: string
  updated_at: string
}
