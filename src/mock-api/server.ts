import { createServer } from 'miragejs'

import { factories } from './factories'
import { models } from './models'
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
        password: '123456',
        avatar: 'https://bit.ly/kent-c-dodds',
        permissions: ['users.list', 'users.create', 'deliverymen.rank'],
        roles: ['administrator'],
      })
      _server.create('user', {
        name: 'Dailton Bastos',
        email: 'dailtonbastos@gmail.com',
        password: '123456',
        permissions: ['users.list', 'deliverymen.list'],
        roles: ['editor'],
      })
    },

    routes() {
      this.namespace = '/mock-api'
      this.timing = 750

      registerSessionRoutes(this)
      registerUserRoutes(this)

      this.namespace = ''
      this.passthrough()
    },
  })

  return server
}
