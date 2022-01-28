import { createServer } from 'miragejs'

import { factories } from './factories'
import { models } from './models'
import { registerDeliverymenRoutes } from './routes/deliveryman'
import { registerRefreshToken } from './routes/refresh.routes'
import { registerSessionRoutes } from './routes/session.routes'
import { registerUserRoutes } from './routes/user'

export function makeServer({ environment = 'development' } = {}) {
  const server = createServer({
    environment,

    models,

    factories,

    seeds: (_server) => {
      _server.create('user', {
        name: 'Distribuidora FastFeet',
        email: 'admin@fastfeet.com',
        permissions: ['users.list', 'users.create', 'deliverymen.rank'],
        roles: ['administrator'],
      })
      _server.create('user', {
        name: 'Dailton Bastos',
        email: 'dailtonbastos@gmail.com',
      })

      _server.createList('user', 23)
      _server.createList('deliveryman', 12)
    },

    routes() {
      this.namespace = '/mock-api'
      this.timing = 750

      registerSessionRoutes(this)
      registerUserRoutes(this)
      registerRefreshToken(this)
      registerDeliverymenRoutes(this)

      this.namespace = ''
      this.passthrough()
    },
  })

  return server
}
