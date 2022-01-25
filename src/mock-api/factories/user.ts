import { Factory } from 'miragejs'

export const user = Factory.extend({
  name() {
    return 'Dailton Bastos'
  },
  email() {
    return 'dailtonbastos@gmail.com'
  },
  avatar() {
    return ''
  },
  permissions() {
    return ['users.list', 'deliverymen.rank']
  },
  roles() {
    return ['administrator']
  },
  createdAt() {
    return new Date()
  },
  updatedAt() {
    return new Date()
  },
})
