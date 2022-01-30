import { Server } from 'miragejs'

export function getAllRecipients(context: Server) {
  context.get('/recipients')
}
