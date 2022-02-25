import { Request, Response } from 'miragejs'

import { AppSchema } from '../auth/types'

export function deliveriesProblems(schema: AppSchema, request: Request) {
  const { page = 1, per_page = 6 } = request.queryParams

  const total = schema.all('problem').length

  const pageStart = (Number(page) - 1) * Number(per_page)
  const pageEnd = pageStart + Number(per_page)

  const data = schema.db.problems

  const problems = data
    ?.map((problem) => {
      const delivery = schema.db.deliveries.find(problem.deliveryId)

      return {
        ...problem,
        delivery,
      }
    })
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(pageStart, pageEnd)

  return new Response(200, { 'x-total-count': String(total) }, { problems })
}
