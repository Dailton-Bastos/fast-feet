import { Model, hasMany } from 'miragejs'

import { Recipients } from './types'

export const recipient = Model.extend<Partial<Recipients>>({
  delivery: hasMany(),
})
