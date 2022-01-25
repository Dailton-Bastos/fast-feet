import { Model } from 'miragejs'

import { User } from './types'

export const user = Model.extend<Partial<User>>({})
