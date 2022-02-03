import { faker } from '@faker-js/faker'
import { Factory } from 'miragejs'

export const delivery = Factory.extend({
  recipient() {
    return '1'
  },

  deliveryman() {
    return '1'
  },

  status() {
    return 'pending'
  },
  recipient_signature() {
    return faker.image.imageUrl()
  },
  createdAt() {
    return faker.date.past(10)
  },
  updatedAt() {
    return faker.date.recent(10)
  },
})
