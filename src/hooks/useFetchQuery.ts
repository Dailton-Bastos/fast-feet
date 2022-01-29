import { useQuery } from 'react-query'

import { Method } from 'axios'

import { api } from '~/services/apiClient'

export const useFetchQuery = (query: string, url: string, method: Method) => {
  const { data, isLoading, error } = useQuery(query, async () => {
    const response = await api({
      method,
      url,
    })

    return response.data
  })

  return {
    data,
    isLoading,
    error,
  }
}
