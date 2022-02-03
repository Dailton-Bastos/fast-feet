import { createServer } from 'miragejs'

import { UserRequest } from './auth/types'
import { factories } from './factories'
import { createSession } from './middlewares/createSession'
import { refreshToken } from './middlewares/refreshToken'
import { me } from './middlewares/userProfile'
import { models } from './models'

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
        permissions: ['deliverymen.list'],
        roles: ['editor'],
      })

      _server.createList('user', 8)
    },

    routes() {
      this.namespace = '/mock-api'
      this.timing = 750

      this.get('/users')

      this.post('/sessions', (schema, request) =>
        createSession(schema, request)
      )

      this.get('/me', (schema, request: UserRequest) => me(schema, request))

      this.post('/refresh', (schema, request: UserRequest) =>
        refreshToken(schema, request)
      )

      this.namespace = ''
      this.passthrough()
    },
  })

  return server
}
