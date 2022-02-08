import { useQuery } from 'react-query'

import { api } from '~/services/apiClient'
import { Deliveryman } from '~/utils/types'

type GetDeliverymenResponse = {
  deliverymen: Deliveryman[]
}

export const getDeliverymen = async (): Promise<GetDeliverymenResponse> => {
  const { data } = await api.get('deliverymen')

  const deliverymen = data?.deliverymen?.map((deliveryman: Deliveryman) => {
    return {
      id: deliveryman.id,
      name: deliveryman.name,
      contact: deliveryman.contact,
      avatar: deliveryman.avatar,
      createdAt: new Date(deliveryman.createdAt).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
      updatedAt: new Date(deliveryman.updatedAt).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
    }
  })

  return { deliverymen }
}

export function useDeliverymen() {
  return useQuery('deliverymen', () => getDeliverymen(), {
    staleTime: 1000 * 60 * 10, // 10 minutes
  })
}
