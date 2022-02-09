import { useQuery } from 'react-query'

import { api } from '~/services/apiClient'
import { Deliveryman } from '~/utils/types'

type GetDeliverymenResponse = {
  deliverymen: Deliveryman[]
  totalCount: number
}

export const getDeliverymen = async (
  page: number
): Promise<GetDeliverymenResponse> => {
  const { data, headers } = await api.get('deliverymen', {
    params: {
      page,
    },
  })

  const totalCount = Number(headers['x-total-count'])

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

  return { deliverymen, totalCount }
}

export function useDeliverymen(page: number) {
  return useQuery(['deliverymen', page], () => getDeliverymen(page), {
    staleTime: 1000 * 60 * 10, // 10 minutes
  })
}
