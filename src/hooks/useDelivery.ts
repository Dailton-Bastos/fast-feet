import { useQuery } from 'react-query'

import { api } from '~/services/apiClient'
import { queryClient } from '~/services/queryClient'
import { Delivery } from '~/utils/types'

type GetDeliveryResponse = {
  delivery: Partial<Delivery>
}

export const getDelivery = async (id: string): Promise<GetDeliveryResponse> => {
  const { data } = await api.get(`/deliveries/${id}`)

  const delivery = {
    id: data.delivery.id,
    productName: data.delivery.product_name,
    status: data.delivery.status,
    deliveryman: data.delivery.deliveryman,
    recipient: data.delivery.recipient,
  }

  return { delivery }
}

export const updateDelivery = async (
  delivery: Delivery,
  deliveryId: string
) => {
  const response = await api.patch(`/deliveries/${deliveryId}`, {
    delivery: {
      ...delivery,
      updated_at: new Date(),
    },
  })

  return response.data.delivery
}

export const handlePrefetchDelivery = async (deliveryId: string) => {
  await queryClient.prefetchQuery(
    ['delivery', deliveryId],
    async () => {
      const { data } = await api.get(`/deliveries/${deliveryId}`)

      const delivery = {
        id: data.delivery.id,
        productName: data.delivery.product_name,
        status: data.delivery.status,
        deliveryman: data.delivery.deliveryman,
        recipient: data.delivery.recipient,
      }

      return { delivery }
    },
    {
      staleTime: 1000 * 60 * 10, // 10 minutes
    }
  )
}

export function useDelivery(id: string) {
  return useQuery(['delivery', id], () => getDelivery(id), {
    staleTime: 1000 * 60 * 10, // 10 minutes
  })
}
