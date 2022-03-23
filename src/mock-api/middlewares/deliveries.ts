import { Request, Response } from 'miragejs'

import { AppSchema } from '../auth/types'

export function deliveries(schema: AppSchema, request: Request) {
  const { page = 1, per_page = 6 } = request.queryParams

  const total = schema.all('delivery').length

  const pageStart = (Number(page) - 1) * Number(per_page)
  const pageEnd = pageStart + Number(per_page)

  const data = schema.db.deliveries

  const deliveries = data
    ?.map((delivery) => {
      const deliveryman = schema.db?.deliverymen?.findBy({
        id: delivery.deliverymanId,
      })
      const recipient = schema.db?.recipients?.findBy({
        id: delivery.recipientId,
      })
      const addresses = recipient?.addressIds?.map((addressId: string) => {
        return schema.db.addresses.findBy({ id: addressId })
      })

      return {
        ...delivery,
        deliveryman,
        recipient: {
          ...recipient,
          addresses,
        },
      }
    })
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(pageStart, pageEnd)

  return new Response(200, { 'x-total-count': String(total) }, { deliveries })
}
