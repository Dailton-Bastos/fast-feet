import { RestSerializer } from 'miragejs'

export const delivery = RestSerializer.extend({
  include: ['recipient', 'deliveryman'],
  embed: true,
})
