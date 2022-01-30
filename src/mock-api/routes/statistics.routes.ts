import { Server, Response } from 'miragejs'

export function registerStatisticsRoutes(context: Server) {
  context.get('/statistics', function (schema) {
    const total = {
      users: schema.all('user').length,
      deliverymen: schema.all('deliveryman').length,
      recipients: schema.all('recipient').length,
    }

    return new Response(201, {}, { total })
  })
}
