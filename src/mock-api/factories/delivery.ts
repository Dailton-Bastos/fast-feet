import { faker } from '@faker-js/faker'
import { Factory } from 'miragejs'

export const delivery = Factory.extend({
  status() {
    return 'pending'
  },
  shippedAt() {
    return null
  },
  deliveredAt() {
    return null
  },
  cancelledAt() {
    return null
  },
  createdAt() {
    return faker.date.past(10)
  },
  updatedAt() {
    return faker.date.recent(10)
  },
})
