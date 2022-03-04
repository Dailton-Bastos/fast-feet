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
    const formattedStatus = {
      name: '',
      color: '',
      bgColor: '',
    }

    switch (delivery.status) {
      case 'shipped':
        ;(formattedStatus.name = 'Retirada'),
          (formattedStatus.color = '#4d85ee'),
          (formattedStatus.bgColor = '#bad2ff')
        break

      case 'delivered':
        ;(formattedStatus.name = 'Entregue'),
          (formattedStatus.color = '#2ca42b'),
          (formattedStatus.bgColor = '#dff0df')
        break

      case 'cancelled':
        ;(formattedStatus.name = 'Cancelada'),
          (formattedStatus.color = '#de3b3b'),
          (formattedStatus.bgColor = '#fab0b0')
        break

      default:
        ;(formattedStatus.name = 'Pendente'),
          (formattedStatus.color = '#c1bc35'),
          (formattedStatus.bgColor = '#f0f0df')
        break
    }

    return {
      id: delivery.id,
      status: delivery.status,
      formattedStatus,
      recipient: delivery.recipient ?? null,
      signature: delivery.signature,
      deliveryman: delivery.deliveryman ?? null,
      selectedAddress: delivery.recipient?.addresses[0] ?? null,
      shipped_at: delivery.shipped_at
        ? new Date(delivery.shipped_at).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
          })
        : null,

      delivered_at: delivery.delivered_at
        ? new Date(delivery.delivered_at).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
          })
        : null,

      cancelled_at: delivery.cancelled_at
        ? new Date(delivery.cancelled_at).toLocaleDateString('pt-BR', {
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
