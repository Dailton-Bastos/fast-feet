import { faker } from '@faker-js/faker'
import { Factory } from 'miragejs'

const status = ['pending', 'shipped', 'cancelled', 'delivered'] as const

export const delivery = Factory.extend({
  status() {
    const deliveryStatus = Math.floor(Math.random() * status.length)
    return status[deliveryStatus]
  },
  signature() {
    return faker.image.imageUrl()
  },
  createdAt() {
    return faker.date.past(10)
  },
  updatedAt() {
    return faker.date.recent(10)
  },
})
