import { Model, belongsTo } from 'miragejs'

import { Deliveries } from './types'

export const delivery = Model.extend<Partial<Deliveries>>({
  recipient: belongsTo('recipient'),
  deliveryman: belongsTo('deliveryman'),
})
