import { createServer } from 'miragejs'

import { factories } from './factories'
import { models } from './models'
import { registerUserRoutes } from './routes/user.routes'

export function makeServer({ environment = 'development' } = {}) {
  const server = createServer({
    environment,

    models,

    factories,

    seeds: (_server) => {
      _server.create('user', {
        name: 'Distribuidora FastFeet',
        email: 'admin@fastfeet.com',
        avatar: 'https://bit.ly/kent-c-dodds',
        permissions: ['users.list', 'users.create', 'deliverymen.rank'],
        roles: ['administrator'],
      })
      _server.create('user', {
        name: 'Dailton Bastos',
        email: 'dailtonbastos@gmail.com',
        permissions: ['users.list', 'deliverymen.list'],
        roles: ['editor'],
      })
    },

    routes() {
      this.namespace = '/mock-api'
      this.timing = 750

      registerUserRoutes(this)

      this.namespace = ''
      this.passthrough()
    },
  })

  return server
}
