import { ActiveModelSerializer } from 'miragejs'

export const recipient = ActiveModelSerializer.extend({
  include: ['addresses', 'deliveries'],
  embed: true,
})
