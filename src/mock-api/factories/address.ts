import { faker } from '@faker-js/faker'
import { Factory } from 'miragejs'

export const address = Factory.extend({
  zipCode() {
    return faker.address.zipCode()
  },
  street() {
    return faker.address.streetName()
  },
  neighborhood() {
    return faker.address.cityPrefix()
  },
  number() {
    return Math.floor(Math.random() * (2000 - 1050 + 1) + 1050)
  },
  complement() {
    return faker.lorem.sentence()
  },
  city() {
    return faker.address.cityName()
  },
  state() {
    return faker.address.state()
  },
  createdAt() {
    return faker.date.past(10)
  },
  updatedAt() {
    return faker.date.recent(10)
  },
})
