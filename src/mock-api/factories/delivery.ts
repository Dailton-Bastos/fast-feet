import { faker } from '@faker-js/faker'
import { Factory } from 'miragejs'

export const delivery = Factory.extend({
  status() {
    return 'pending'
  },
  shippedAt() {
    return ''
  },
  deliveredAt() {
    return ''
  },
  cancelledAt() {
    return ''
  },
  createdAt() {
    return faker.date.past(10)
  },
  updatedAt() {
    return faker.date.recent(10)
  },
})
