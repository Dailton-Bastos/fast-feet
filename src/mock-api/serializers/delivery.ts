import { ActiveModelSerializer } from 'miragejs'

export const delivery = ActiveModelSerializer.extend({
  include: ['recipient', 'deliveryman'],
  embed: true,
})
