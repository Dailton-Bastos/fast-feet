import { Server } from 'miragejs'

import { getAllRecipients } from './list.routes'

export function registerRecipientsRoutes(context: Server) {
  return {
    getAllRecipients: getAllRecipients(context),
  }
}
