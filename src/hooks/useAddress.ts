import { useMutation, useQuery } from 'react-query'

import { useDisclosure } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { api } from '~/services/apiClient'
import { getPostalCode } from '~/services/fetchPostalCode'
import { queryClient } from '~/services/queryClient'
import { Address } from '~/utils/types'

export const createAddress = async (address: Partial<Address>) => {
  try {
    const response = await api.post('/addresses', {
      address: {
        ...address,
        created_at: new Date(),
        updated_at: new Date(),
      },
    })

    return response.data.address
  } catch (error) {
    throw new Error('Error')
  }
}

export const updateAddress = async (
  address: Partial<Address>,
  addressId: number
) => {
  try {
    const response = await api.patch(`/addresses/${addressId}`, {
      address: {
        ...address,
        updated_at: new Date(),
      },
    })

    return response.data.address
  } catch (error) {
    throw new Error('Error')
  }
}

export const useDeleteAddress = (addressId: number) => {
  const { onToggle, isOpen } = useDisclosure()

  const router = useRouter()
  const { id: recipientId } = router.query

  const { mutate, isLoading } = useMutation(
    async () => await api.delete(`/addresses/${addressId}`),
    {
      onSuccess: () => {
        onToggle()
        queryClient.invalidateQueries(['recipient', recipientId])
        queryClient.invalidateQueries('recipients')
      },

      onError: () => onToggle(),
    }
  )

  return { mutate, isLoading, onToggle, isOpen }
}

export function usePostalCode(postalCode: string, hasPostalCode: boolean) {
  return useQuery(
    ['CEP', postalCode.replace(/\D/g, '')],
    () => getPostalCode(postalCode),
    {
      enabled: hasPostalCode,
      staleTime: 1000 * 60 * 10, // 10 minutes
    }
  )
}
