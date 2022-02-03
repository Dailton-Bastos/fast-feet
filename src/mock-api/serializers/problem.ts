import { RestSerializer } from 'miragejs'

export const problem = RestSerializer.extend({
  include: ['delivery'],
  embed: true,
})
