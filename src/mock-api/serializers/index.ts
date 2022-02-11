import { ActiveModelSerializer } from 'miragejs'

import { delivery } from './delivery'
import { problem } from './problem'
import { recipient } from './recipient'

export const serializers = {
  application: ActiveModelSerializer,
  recipient,
  delivery,
  problem,
}
