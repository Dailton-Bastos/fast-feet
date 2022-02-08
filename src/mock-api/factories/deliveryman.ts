import { faker } from '@faker-js/faker'
import { Factory } from 'miragejs'

export const deliveryman = Factory.extend({
  name() {
    return faker.name.findName()
  },
  contact() {
    return faker.phone.phoneNumberFormat()
  },
  avatar() {
    return faker.image.avatar()
  },
  createdAt() {
    return faker.date.past(10)
  },
  updatedAt() {
    return faker.date.recent(10)
  },
})
