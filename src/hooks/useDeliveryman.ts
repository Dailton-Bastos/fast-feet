import { useMutation, useQuery } from 'react-query'

import { useDisclosure } from '@chakra-ui/react'

import { api } from '~/services/apiClient'
import { queryClient } from '~/services/queryClient'
import { Deliveryman } from '~/utils/types'

type GetDeliverymanResponse = {
  deliveryman: Deliveryman
}

export const createDeliveryman = async (deliveryman: Partial<Deliveryman>) => {
  try {
    const response = await api.post('/deliverymen', {
      deliveryman: {
        ...deliveryman,
        created_at: new Date(),
        updated_at: new Date(),
      },
    })

    return response.data.deliveryman
  } catch (error) {
    throw new Error('Error')
  }
}

export const handlePrefetchDeliveryman = async (deliverymanId: number) => {
  await queryClient.prefetchQuery(
    ['deliveryman', deliverymanId],
    async () => {
      const response = await api.get(`/deliverymen/${deliverymanId}`)

      return response.data
    },
    {
      staleTime: 1000 * 60 * 10, // 10 minutes
    }
  )
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

export const updateDeliveryman = async (
  deliveryman: Deliveryman,
  deliverymanId: string
) => {
  const response = await api.patch(`/deliverymen/${deliverymanId}`, {
    deliveryman: {
      ...deliveryman,
      updated_at: new Date(),
    },
  })

  return response.data.deliveryman
}

export const useDeleteDeliveryman = (deliverymanId: number) => {
  const { onToggle, isOpen } = useDisclosure()

  const { mutate, isLoading } = useMutation(
    async () => await api.delete(`/deliverymen/${deliverymanId}`),
    {
      onSuccess: () => {
        onToggle()
        queryClient.invalidateQueries('deliverymen')
        queryClient.invalidateQueries('deliveries')
        queryClient.invalidateQueries('rankDeliverymen')
        queryClient.invalidateQueries('statistics')
        queryClient.setQueryData(['deliveryman', deliverymanId], null)
      },

      onError: () => onToggle(),
    }
  )

  return { mutate, isLoading, onToggle, isOpen }
}

export function useDeliveryman(id: string) {
  return useQuery(['deliveryman', id], () => getDeliveryman(id), {
    staleTime: 1000 * 60 * 10, // 10 minutes
  })
}
