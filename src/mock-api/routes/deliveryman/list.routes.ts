import { Server } from 'miragejs'

export function getAllDeliverymen(context: Server) {
  context.get('/deliverymen')
}
