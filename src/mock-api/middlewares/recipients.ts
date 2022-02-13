import { Request, Response } from 'miragejs'

import { AppSchema } from '../auth/types'

export function recipients(schema: AppSchema, request: Request) {
  const { page = 1, per_page = 6 } = request.queryParams

  const total = schema.all('recipient').length

  const pageStart = (Number(page) - 1) * Number(per_page)
  const pageEnd = pageStart + Number(per_page)

  const data = schema.db.recipients

  const recipients = data
    ?.map((recipient) => {
      const addresses = recipient.addressIds?.map((addressId: string) => {
        return schema.db.addresses.find(addressId)
      })
      return {
        ...recipient,
        addresses,
      }
    })
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(pageStart, pageEnd)

  return new Response(200, { 'x-total-count': String(total) }, { recipients })
}
