import { faker } from '@faker-js/faker'
import { Factory } from 'miragejs'

export const user = Factory.extend({
  name() {
    return faker.name.findName()
  },
  email() {
    return faker.internet.email().toLowerCase()
  },
  avatar() {
    return faker.image.avatar()
  },
  password() {
    return '123456'
  },
  permissions() {
    return ['users.list', 'deliverymen.list']
  },
  roles() {
    return ['editor']
  },
  createdAt() {
    return faker.date.past(10)
  },
  updatedAt() {
    return faker.date.recent(10)
  },
})
