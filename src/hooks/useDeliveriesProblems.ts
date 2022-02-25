import { useQuery } from 'react-query'

import { api } from '~/services/apiClient'
import { DeliveriesProblems } from '~/utils/types'

type GetDeliveriesProblemsResponse = {
  problems: DeliveriesProblems[]
  totalCount: number
}

function truncateString(content: string, total: number) {
  if (content.length <= total) return content

  return `${content.slice(0, total)}...`
}

export const getDeliveriesProblems = async (
  page: number
): Promise<GetDeliveriesProblemsResponse> => {
  const { data, headers } = await api.get('problems', {
    params: {
      page,
    },
  })

  const totalCount = Number(headers['x-total-count'])

  const problems = data?.problems?.map((problem: DeliveriesProblems) => {
    return {
      id: problem.id,
      descriptions: problem.descriptions,
      preview: truncateString(problem.descriptions[0], 85),
      deliveryId: problem.deliveryId,
      createdAt: new Date(problem.createdAt).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
      updatedAt: new Date(problem.updatedAt).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
    }
  })

  return { problems, totalCount }
}

export function useDeliveriesProblems(page: number) {
  return useQuery(
    ['deliveriesProblems', page],
    () => getDeliveriesProblems(page),
    {
      staleTime: 1000 * 60 * 10, // 10 minutes
    }
  )
}
