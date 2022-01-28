import { Server } from 'miragejs'

import { getAllDeliverymen } from './list.routes'

export function registerDeliverymenRoutes(context: Server) {
  return {
    getAllDeliverymen: getAllDeliverymen(context),
  }
}
