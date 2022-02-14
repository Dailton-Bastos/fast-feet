import { useQuery } from 'react-query'

import { api } from '~/services/apiClient'
import { Delivery } from '~/utils/types'

type DeliveryProps = {
  id: string
  recipient: string
  deliveryman: {
    name: string
    avatar: string
  }
  address: {
    city: string
    state: string
  }
  status: {
    name: string
    color: string
    bgColor: string
  }
}

type GetDeliveriesResponse = {
  deliveries: DeliveryProps[]
}

export const getDeliveries = async (): Promise<GetDeliveriesResponse> => {
  const { data } = await api.get('deliveries')

  const deliveries = data?.deliveries?.map((delivery: Delivery) => {
    const status = {
      name: '',
      color: '',
      bgColor: '',
    }

    switch (delivery.status) {
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
      recipient: delivery.recipient?.name ?? null,
      deliveryman: {
        name: delivery.deliveryman ? delivery.deliveryman.name : null,
        avatar: delivery.deliveryman ? delivery.deliveryman.avatar : null,
      },
      address: {
        city: delivery.recipient?.addresses[0].city ?? null,
        state: delivery.recipient?.addresses[0].state ?? null,
      },
    }
  })

  return { deliveries }
}

export function useDeliveries() {
  return useQuery('deliveries', () => getDeliveries(), {
    staleTime: 1000 * 60 * 10, // 10 minutes
  })
}
