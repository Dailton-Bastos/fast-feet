import { faker } from '@faker-js/faker'
import { Factory, trait, Server } from 'miragejs'

import { Recipient } from '~/utils/types'

export const recipient = Factory.extend({
  name() {
    return faker.name.findName()
  },
  contact() {
    return faker.phone.phoneNumber()
  },
  createdAt() {
    return faker.date.past(10)
  },
  updatedAt() {
    return faker.date.recent(10)
  },

  withAddress: trait({
    afterCreate(recipient: Recipient, server: Server) {
      server.create('address', {
        recipient,
      })
    },
  }),
})
