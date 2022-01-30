import { Model } from 'miragejs'

import { Recipients } from './types'

export const recipient = Model.extend<Partial<Recipients>>({})
