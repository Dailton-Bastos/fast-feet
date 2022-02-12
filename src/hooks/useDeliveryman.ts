import { useQuery } from 'react-query'

import { api } from '~/services/apiClient'
import { Deliveryman } from '~/utils/types'

type GetDeliverymanResponse = {
  deliveryman: Deliveryman
}

export const getDeliveryman = async (
  id: string
): Promise<GetDeliverymanResponse> => {
  const { data } = await api.get(`/deliverymen/${id}`)

  const deliveryman: Deliveryman = {
    id: data.deliveryman.id,
    name: data.deliveryman.name,
    contact: data.deliveryman.contact,
    avatar: data.deliveryman.avatar,
    createdAt: new Date(data.deliveryman.createdAt).toLocaleDateString(
      'pt-BR',
      {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }
    ),
    updatedAt: new Date(data.deliveryman.updatedAt).toLocaleDateString(
      'pt-BR',
      {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }
    ),
  }

  return { deliveryman }
}

export function useDeliveryman(id: string) {
  return useQuery(['deliveryman', id], () => getDeliveryman(id), {
    staleTime: 1000 * 60 * 10, // 10 minutes
  })
}
