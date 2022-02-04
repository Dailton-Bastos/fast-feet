import { useQuery } from 'react-query'

import { api } from '~/services/apiClient'
import { Deliveryman } from '~/utils/types'

type GetDeliverymenResponse = {
  deliverymen: Deliveryman[]
}

export const getRankDeliverymen = async (): Promise<GetDeliverymenResponse> => {
  const { data } = await api.get('deliverymen')

  const deliverymen = data?.deliverymen
    ?.slice(0, 5)
    .map((deliveryman: Deliveryman) => {
      return {
        id: deliveryman.id,
        name: deliveryman.name,
        avatar: deliveryman.avatar,
      }
    })

  return { deliverymen }
}

export function useRankDeliverymen() {
  return useQuery('rank_deliverymen', () => getRankDeliverymen(), {
    staleTime: 1000 * 60 * 30, // 30 minutes
  })
}
