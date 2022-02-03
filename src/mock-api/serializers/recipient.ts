import { RestSerializer } from 'miragejs'

export const recipient = RestSerializer.extend({
  include: ['addresses'],
  embed: true,
})
