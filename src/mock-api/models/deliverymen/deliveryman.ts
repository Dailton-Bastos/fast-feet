import { Model, hasMany } from 'miragejs'

import { Deliveryman } from './types'

export const deliveryman = Model.extend<Partial<Deliveryman>>({
  delivery: hasMany(),
})
