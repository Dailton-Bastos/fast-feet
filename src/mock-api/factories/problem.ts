import { faker } from '@faker-js/faker'
import { Factory } from 'miragejs'

export const problem = Factory.extend({
  description() {
    return faker.lorem.text()
  },
  createdAt() {
    return faker.date.past(10)
  },
  updatedAt() {
    return faker.date.recent(10)
  },
})
