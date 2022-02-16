import { faker } from '@faker-js/faker'
import { Factory, trait, Server } from 'miragejs'

import { Recipient } from '~/utils/types'

export const recipient = Factory.extend({
  name() {
    return faker.name.findName()
  },
  contact() {
    return faker.phone.phoneNumberFormat()
  },
  createdAt() {
    return faker.date.past(10)
  },
  updatedAt() {
    return faker.date.recent(10)
  },

  withAddress: trait({
    afterCreate(recipient: Recipient, server: Server) {
      const totalAddress = Math.floor(Math.random() * (1 - 4 + 1) + 4)
      server.createList('address', totalAddress, {
        recipient,
      })
    },
  }),
})
