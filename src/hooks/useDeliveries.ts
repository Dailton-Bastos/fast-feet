import { useMutation, useQuery } from 'react-query'

import { useDisclosure, useToast } from '@chakra-ui/react'

import { api } from '~/services/apiClient'
import { queryClient } from '~/services/queryClient'
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

export const createDelivery = async (delivery: Partial<Delivery>) => {
  try {
    const response = await api.post('/deliveries', {
      delivery: {
        ...delivery,
        status: 'pending',
        created_at: new Date(),
        updated_at: new Date(),
      },
    })

    return response.data.delivery
  } catch (error) {
    throw new Error('Error')
  }
}

export const useCancellDelivery = (delivery: Delivery | null) => {
  const { onToggle, isOpen: isOpenModalCancel } = useDisclosure()
  const toast = useToast()

  const { mutateAsync, isLoading: isLoadingCancelMutation } = useMutation(
    async () => {
      const response = await api.patch(`/deliveries/${delivery?.id}`, {
        delivery: {
          status: 'cancelled',
          cancelled_at: new Date(),
        },
      })

      return response.data.delivery
    },
    {
      onSuccess: () => {
        onToggle()
        queryClient.invalidateQueries('deliveries')
        queryClient.invalidateQueries('deliveriesProblems')
        toast({
          title: 'Encomenda cancelada!',
          description: 'Cancelada com sucesso!',
          position: 'bottom-left',
          status: 'success',
          isClosable: true,
        })
      },

      onError: () => {
        toast({
          title: 'Ocorreu um erro!',
          description: 'Tente novamente!',
          position: 'bottom-left',
          status: 'error',
          isClosable: true,
        })
        onToggle()
      },
    }
  )

  return { mutateAsync, isLoadingCancelMutation, onToggle, isOpenModalCancel }
}

export function useDeliveries(page?: number) {
  return useQuery(['deliveries', page], () => getDeliveries(page), {
    staleTime: 1000 * 60 * 10, // 10 minutes
  })
}
