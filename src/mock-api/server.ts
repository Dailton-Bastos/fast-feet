import { createServer } from 'miragejs'

import { UserRequest } from './auth/types'
import { factories } from './factories'
import { createSession } from './middlewares/createSession'
import { deliveriesProblems } from './middlewares/deliveriesProblems'
import { deliverymen } from './middlewares/deliverymen'
import { recipients } from './middlewares/recipients'
import { refreshToken } from './middlewares/refreshToken'
import { statistics } from './middlewares/statistics'
import { me } from './middlewares/userProfile'
import { models } from './models'
import { serializers } from './serializers'

export function makeServer({ environment = 'development' } = {}) {
  const server = createServer<typeof models, typeof factories>({
    environment,

    models,

    serializers,

    factories,

    seeds: (_server) => {
      _server.create('user', {
        name: 'Distribuidora FastFeet',
        email: 'admin@fastfeet.com',
        permissions: [
          'deliverymen.rank',
          'deliverymen.list',
          'deliverymen.create',
          'deliverymen.edit',
          'recipients.list',
          'recipients.create',
          'recipients.edit',
          'problems.list',
        ],
        roles: ['administrator'],
      })

      _server.create('user', {
        name: 'Dailton Bastos',
        email: 'dailtonbastos@gmail.com',
        permissions: ['deliverymen.list', 'recipients.list', 'problems.list'],
        roles: ['editor'],
      })

      _server.createList('user', 8)

      const deliverymen = _server.createList('deliveryman', 4)

      const recipients = _server.createList('recipient', 13, 'withAddress')

      const deliveries = _server.createList('delivery', 24)

      deliveries.forEach((delivery) => {
        const deliveryman = Math.floor(Math.random() * deliverymen.length)
        const recipient = Math.floor(Math.random() * recipients.length)

        delivery.update({
          deliveryman: deliverymen[deliveryman],
          recipient: recipients[recipient],
        })
      })

      _server.createList('problem', 8).forEach((problem) => {
        const delivery = _server.create('delivery', {
          status: 'pending',
          deliveryman: _server.create('deliveryman'),
          recipient: _server.create('recipient', 'withAddress'),
        })
        problem.update({
          delivery,
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

      this.get('/deliverymen', (schema, request) =>
        deliverymen(schema, request)
      )
      this.post('/deliverymen')
      this.get('/deliverymen/:id')
      this.patch('/deliverymen/:id')
      this.delete('/deliverymen/:id')

      this.get('/recipients', (schema, request) => recipients(schema, request))
      this.post('/recipients')
      this.get('/recipients/:id')
      this.patch('/recipients/:id')
      this.delete('/recipients/:id')

      this.post('/addresses')
      this.patch('/addresses/:id')
      this.delete('/addresses/:id')

      this.get('/deliveries')

      this.get('/problems', (schema, request) =>
        deliveriesProblems(schema, request)
      )

      this.get('/statistics', (schema) => statistics(schema))

      this.namespace = ''
      this.passthrough()
      this.passthrough('https://viacep.com.br/**')
    },
  })

  return server
}
