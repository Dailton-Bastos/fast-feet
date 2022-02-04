import { useQuery } from 'react-query'

import { api } from '~/services/apiClient'

type GetProfileResponse = {
  name: string
  email: string
  avatar?: string
}

export const getProfile = async (): Promise<GetProfileResponse> => {
  const { data } = await api.get('me')

  return {
    name: data?.name,
    email: data?.email,
    avatar: data?.avatar,
  }
}

export function useProfile() {
  return useQuery('me', () => getProfile(), {
    staleTime: 1000 * 60 * 10, // 10 minutes
  })
}
