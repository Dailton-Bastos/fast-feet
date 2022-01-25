import { Server } from 'miragejs'

export function registerUserRoutes(context: Server) {
  context.get('/users')
  context.get('/users/:id')
}
