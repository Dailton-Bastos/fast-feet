import { useQuery } from 'react-query'

import { api } from '~/services/apiClient'
import { Delivery } from '~/utils/types'

type GetDeliveriesResponse = {
  deliveries: Delivery[]
  totalCount: number
}

export const getDeliveries = async (
  page?: number
): Promise<GetDeliveriesResponse> => {
  const { data, headers } = await api.get('deliveries', {
    params: { page },
  })

  const totalCount = Number(headers['x-total-count'])

  const deliveries = data?.deliveries?.map((delivery: Delivery) => {
    const status = {
      name: '',
      color: '',
      bgColor: '',
    }

    switch (delivery.status.name) {
      case 'shipped':
        ;(status.name = 'Retirada'),
          (status.color = '#4d85ee'),
          (status.bgColor = '#bad2ff')
        break

      case 'delivered':
        ;(status.name = 'Entregue'),
          (status.color = '#2ca42b'),
          (status.bgColor = '#dff0df')
        break

      case 'cancelled':
        ;(status.name = 'Cancelado'),
          (status.color = '#de3b3b'),
          (status.bgColor = '#fab0b0')
        break

      default:
        ;(status.name = 'Pendente'),
          (status.color = '#c1bc35'),
          (status.bgColor = '#f0f0df')
        break
    }

    return {
      id: delivery.id,
      status,
      recipient: delivery.recipient ?? null,
      deliveryman: delivery.deliveryman ?? null,
      selectedAddress: delivery.recipient?.addresses[0] ?? null,
      shippedAt: delivery.shippedAt
        ? new Date(delivery.shippedAt).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
          })
        : null,

      deliveredAt: delivery.deliveredAt
        ? new Date(delivery.deliveredAt).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
          })
        : null,

      cancelledAt: delivery.cancelledAt
        ? new Date(delivery.cancelledAt).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
          })
        : null,

      createdAt: new Date(delivery.createdAt).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
      updatedAt: new Date(delivery.updatedAt).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
    }
  })

  return { deliveries, totalCount }
}

export function useDeliveries(page?: number) {
  return useQuery(['deliveries', page], () => getDeliveries(page), {
    staleTime: 1000 * 60 * 10, // 10 minutes
  })
}
