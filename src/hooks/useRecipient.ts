import { useQuery } from 'react-query'

import { api } from '~/services/apiClient'
import { Recipient } from '~/utils/types'

type GetRecipientResponse = {
  recipient: Recipient
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

export function useRecipient(id: string) {
  return useQuery(['recipient', id], () => getRecipient(id), {
    staleTime: 1000 * 60 * 10, // 10 minutes
  })
}
