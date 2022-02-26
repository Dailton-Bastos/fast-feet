import { faker } from '@faker-js/faker'
import { Factory } from 'miragejs'

const status = ['pending', 'shipped', 'cancelled', 'delivered'] as const

export const delivery = Factory.extend({
  status() {
    const deliveryStatus = Math.floor(Math.random() * status.length)
    return {
      name: status[deliveryStatus],
      bgColor: '',
      color: '',
    }
  },
  signature() {
    return faker.image.imageUrl()
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
