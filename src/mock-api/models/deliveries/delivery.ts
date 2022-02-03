import { Model, belongsTo, hasMany } from 'miragejs'

import { Delivery } from './types'

export const delivery = Model.extend<Partial<Delivery>>({
  recipient: belongsTo(),
  deliveryman: belongsTo(),
  problems: hasMany(),
})
