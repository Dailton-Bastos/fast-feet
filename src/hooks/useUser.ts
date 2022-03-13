import { api } from '~/services/apiClient'
import { UserProfile } from '~/utils/types'

export const updateUserProfile = async (user: UserProfile) => {
  const response = await api.patch(`/users/${user.id}`, {
    user: {
      ...user,
      updated_at: new Date(),
    },
  })

  return response.data.user
}
