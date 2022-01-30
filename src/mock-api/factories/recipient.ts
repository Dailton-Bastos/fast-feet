import { faker } from '@faker-js/faker'
import { Factory } from 'miragejs'

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
})
