import { useQuery } from 'react-query'

import { api } from '~/services/apiClient'

type GetStatisticsResponse = {
  users: number
  deliverymen: number
  recipients: number
}

export const getStatistics = async (): Promise<GetStatisticsResponse> => {
  const { data } = await api.get('statistics')

  return {
    users: data?.total.users,
    deliverymen: data?.total.deliverymen,
    recipients: data?.total.recipients,
  }
}

export function useStatistics() {
  return useQuery('statistics', () => getStatistics(), {
    staleTime: 1000 * 60 * 10, // 10 minutes
  })
}
