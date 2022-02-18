import { useMutation } from 'react-query'

import { useDisclosure } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { api } from '~/services/apiClient'
import { queryClient } from '~/services/queryClient'

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
