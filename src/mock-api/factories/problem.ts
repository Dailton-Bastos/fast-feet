import { faker } from '@faker-js/faker'
import { Factory } from 'miragejs'

export const problem = Factory.extend({
  descriptions() {
    return [faker.lorem.paragraph()]
  },
  createdAt() {
    return faker.date.past(10)
  },
  updatedAt() {
    return faker.date.recent(10)
  },
})
