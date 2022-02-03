import { useQuery } from 'react-query'

import { api } from '~/services/apiClient'

type GetStatisticsResponse = {
  deliverymen: number
  recipients: number
  problems: number
  deliveries: number
}

export const getStatistics = async (): Promise<GetStatisticsResponse> => {
  const { data } = await api.get('statistics')

  return {
    deliverymen: data?.deliverymen,
    recipients: data?.recipients,
    problems: data?.problems,
    deliveries: data?.deliveries,
  }
}

export function useStatistics() {
  return useQuery('statistics', () => getStatistics(), {
    staleTime: 1000 * 60 * 10, // 10 minutes
  })
}
