import { Request, Response } from 'miragejs'

import { AppSchema } from '../auth/types'

export function deliverymen(schema: AppSchema, request: Request) {
  const { page = 1, per_page = 6 } = request.queryParams

  const total = schema.all('deliveryman').length

  const pageStart = (Number(page) - 1) * Number(per_page)
  const pageEnd = pageStart + Number(per_page)

  const deliverymen = schema.db.deliverymen.slice(pageStart, pageEnd)

  return new Response(200, { 'x-total-count': String(total) }, { deliverymen })
}
