import { useMutation, useQuery } from 'react-query'

import { useDisclosure } from '@chakra-ui/react'

import { api } from '~/services/apiClient'
import { queryClient } from '~/services/queryClient'
import { CreateRecipientFormData, Recipient } from '~/utils/types'

type GetRecipientResponse = {
  recipient: Recipient
}

export const createRecipientMutation = async (
  recipient: CreateRecipientFormData
) => {
  try {
    const response = await api.post('/recipients', {
      recipient: {
        ...recipient,
        created_at: new Date(),
        updated_at: new Date(),
      },
    })

    return response.data.recipient
  } catch (error) {
    throw new Error('Error')
  }
}

export const handlePrefetchRecipient = async (recipientId: string) => {
  await queryClient.prefetchQuery(
    ['recipient', recipientId],
    async () => {
      const response = await api.get(`/recipients/${recipientId}`)

      return response.data
    },
    {
      staleTime: 1000 * 60 * 10, // 10 minutes
    }
  )
}

export const getRecipient = async (
  id: string
): Promise<GetRecipientResponse> => {
  const { data } = await api.get(`/recipients/${id}`)

  const recipient: Recipient = {
    id: data.recipient.id,
    name: data.recipient.name,
    contact: data.recipient.contact,
    addresses: data.recipient.addresses,
    deliveries: data.recipient?.deliveries ?? [],
    createdAt: new Date(data.recipient.createdAt).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }),
    updatedAt: new Date(data.recipient.updatedAt).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }),
  }

  return { recipient }
}

export const useDeleteRecipient = (recipientId: string) => {
  const { onToggle, isOpen } = useDisclosure()

  const { mutate, isLoading } = useMutation(
    async () => await api.delete(`/recipients/${recipientId}`),
    {
      onSuccess: () => {
        onToggle()
        queryClient.invalidateQueries('recipients')
        queryClient.invalidateQueries('deliveries')
        queryClient.invalidateQueries('statistics')
        queryClient.setQueryData(['recipient', recipientId], null)
      },

      onError: () => onToggle(),
    }
  )

  return { mutate, isLoading, onToggle, isOpen }
}

export function useRecipient(id: string) {
  return useQuery(['recipient', id], () => getRecipient(id), {
    staleTime: 1000 * 60 * 10, // 10 minutes
  })
}
