export type User = {
  id: string
  name: string
  email: string
  password?: string
  avatar?: string
  permissions: string[]
  roles: string[]
  created_at: string
  updated_at: string
}
