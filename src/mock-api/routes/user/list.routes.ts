import { Server } from 'miragejs'

export function getAllUsers(context: Server) {
  context.get('/users')
}
