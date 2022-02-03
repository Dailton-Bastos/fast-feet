import { createServer } from 'miragejs'

import { UserRequest } from './auth/types'
import { factories } from './factories'
import { createSession } from './middlewares/createSession'
import { refreshToken } from './middlewares/refreshToken'
import { statistics } from './middlewares/statistics'
import { me } from './middlewares/userProfile'
import { models } from './models'
import { serializers } from './serializers'

export function makeServer({ environment = 'development' } = {}) {
  const server = createServer({
    environment,

    models,

    serializers,

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

      _server.createList('recipient', 5, 'withAddress')

      _server.createList('deliveryman', 4).forEach((deliveryman) => {
        _server.createList('delivery', 6, {
          deliveryman,
          recipient: _server.create('recipient', 'withAddress'),
        })
      })

      _server.createList('problem', 8).forEach((problem) => {
        _server.create('delivery', {
          problems: [problem],
          deliveryman: _server.create('deliveryman'),
          recipient: _server.create('recipient', 'withAddress'),
        })
      })
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

      this.get('/deliverymen')

      this.get('/recipients')

      this.get('/deliveries')

      this.get('/problems')

      this.get('/statistics', (schema) => statistics(schema))

      this.namespace = ''
      this.passthrough()
    },
  })

  return server
}
