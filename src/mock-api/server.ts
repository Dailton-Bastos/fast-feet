import faker from '@faker-js/faker'
import { createServer } from 'miragejs'

import { UserRequest } from './auth/types'
import { factories } from './factories'
import { createSession } from './middlewares/createSession'
import { deliveries } from './middlewares/deliveries'
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
          'deliveries.list',
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

      const deliverymen = _server.createList('deliveryman', 7)
      const recipients = _server.createList('recipient', 13, 'withAddress')

      const deliveriesDelivered = _server.createList('delivery', 13, {
        status: 'delivered',
        signature:
          'https://www.signwell.com/assets/vip-signatures/marilyn-monroe-signature-7fff246e7835644c8d4b11d60ed1fb965b4ef778f476f3f543904e6fdf1237b7.svg',
      })

      deliveriesDelivered.forEach((delivery) => {
        delivery.update({
          shipped_at: faker.date.between(
            '2021-10-01T00:00:00.000Z',
            '2022-02-01T00:00:00.000Z'
          ),
          delivered_at: faker.date.recent(10),
          deliveryman:
            deliverymen[Math.floor(Math.random() * deliverymen.length)],
          recipient: recipients[Math.floor(Math.random() * recipients.length)],
        })
      })

      const deliveriesShipped = _server.createList('delivery', 6, {
        status: 'shipped',
      })

      deliveriesShipped.forEach((delivery) => {
        delivery.update({
          shipped_at: faker.date.recent(10),
          deliveryman:
            deliverymen[Math.floor(Math.random() * deliverymen.length)],
          recipient: recipients[Math.floor(Math.random() * recipients.length)],
        })
      })

      const deliveriesCancelled = _server.createList('delivery', 7, {
        status: 'cancelled',
      })

      deliveriesCancelled.forEach((delivery) => {
        delivery.update({
          shipped_at: faker.date.between(
            '2021-10-01T00:00:00.000Z',
            '2022-02-01T00:00:00.000Z'
          ),
          cancelled_at: faker.date.recent(10),
          deliveryman:
            deliverymen[Math.floor(Math.random() * deliverymen.length)],
          recipient: recipients[Math.floor(Math.random() * recipients.length)],
        })
      })

      _server.createList('problem', 8).forEach((problem) => {
        const delivery = _server.create('delivery', {
          deliveryman:
            deliverymen[Math.floor(Math.random() * deliverymen.length)],
          recipient: recipients[Math.floor(Math.random() * recipients.length)],
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

      this.get('/deliveries', (schema, request) => deliveries(schema, request))

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
