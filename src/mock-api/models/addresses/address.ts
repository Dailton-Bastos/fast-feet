import { Model, belongsTo } from 'miragejs'

import { Address } from './types'

export const address = Model.extend<Partial<Address>>({
  recipient: belongsTo(),
})
