import { Model, belongsTo } from 'miragejs'

import { Problem } from './types'

export const problem = Model.extend<Partial<Problem>>({
  delivery: belongsTo(),
})
