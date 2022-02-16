import { useQuery } from 'react-query'

import { api } from '~/services/apiClient'
import { Recipient } from '~/utils/types'

type GetRecipientsResponse = {
  recipients: Recipient[]
  totalCount: number
}

export const getRecipients = async (
  page: number
): Promise<GetRecipientsResponse> => {
  const { data, headers } = await api.get('recipients', {
    params: { page },
  })

  const totalCount = Number(headers['x-total-count'])

  const recipients = data.recipients?.map((recipient: Recipient) => {
    const formattedAddresses = recipient?.addresses?.map((address) => {
      return `${address.street}, ${address.number}, ${address.city} - ${address.state}`
    })

    return {
      id: recipient.id,
      name: recipient.name,
      contact: recipient.contact,
      addresses: recipient.addresses,
      formattedAddresses,
      createdAt: new Date(recipient.createdAt).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
      updatedAt: new Date(recipient.updatedAt).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
    }
  })

  return { recipients, totalCount }
}

export function useRecipients(page: number) {
  return useQuery(['recipients', page], () => getRecipients(page), {
    staleTime: 1000 * 60 * 10, // 10 minutes
  })
}
