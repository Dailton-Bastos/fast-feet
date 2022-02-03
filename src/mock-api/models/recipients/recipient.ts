import { Model, hasMany } from 'miragejs'

import { Recipient } from './types'

export const recipient = Model.extend<Partial<Recipient>>({
  addresses: hasMany(),
  deliveries: hasMany(),
})
