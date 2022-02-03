import { faker } from '@faker-js/faker'
import { Factory } from 'miragejs'

const status = ['pending', 'shipped', 'cancelled', 'delivered']

const randomNumber = Math.floor(Math.random() * (status.length - 1 + 1) + 0)

export const delivery = Factory.extend({
  status() {
    return status[randomNumber]
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
