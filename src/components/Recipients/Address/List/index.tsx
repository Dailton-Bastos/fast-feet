import React from 'react'
import { RiEdit2Fill, RiDeleteBin2Fill } from 'react-icons/ri'
import { useMutation, useQueryClient } from 'react-query'

import {
  Button,
  ButtonGroup,
  Flex,
  List,
  ListItem,
  Stack,
  useDisclosure,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { ModalConfirm } from '~/components/ModalConfirm'
import { api } from '~/services/apiClient'
import { Address } from '~/utils/types'

interface AddressListProps {
  addresses?: Address[]
  handleClick: () => void
  setAddress: React.Dispatch<React.SetStateAction<Address | undefined>>
}

export const AddressList = ({
  addresses,
  handleClick,
  setAddress,
}: AddressListProps) => {
  const [address, setCurrentAddress] = React.useState<Address>()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const queryClient = useQueryClient()

  const router = useRouter()
  const { id: recipientId } = router.query

  const deleteAddress = useMutation(
    async () => await api.delete(`/addresses/${address?.id}`),
    {
      onSuccess: () => {
        onClose()
        queryClient.invalidateQueries(['recipient', recipientId])
        queryClient.invalidateQueries('recipients')
      },

      onError: () => onClose(),
    }
  )

  function findAddress(id: number) {
    const address = addresses?.find((address) => address.id === id)

    setAddress(address)
  }

  if (!addresses) return null

  return (
    <React.Fragment>
      {addresses.map((address) => (
        <Flex
          key={address.id}
          bg="white"
          borderRadius={4}
          boxShadow="base"
          direction="column"
          pt="10"
          pb="6"
          px="8"
        >
          <List mb="8">
            <Stack spacing={2}>
              <ListItem>
                {address.street} - {address.number}
              </ListItem>
              <ListItem>
                {address.neighborhood} - {address.city} - {address.state}
              </ListItem>
              <ListItem>{address.zip_code}</ListItem>
            </Stack>
          </List>

          <ButtonGroup variant="outline" spacing="4" fontSize="sm" mt="auto">
            <Button
              borderRadius="base"
              colorScheme="purple"
              height="9"
              leftIcon={<RiEdit2Fill size={20} />}
              size="md"
              type="button"
              textTransform="uppercase"
              fontWeight="normal"
              width="50%"
              onClick={() => {
                handleClick()
                findAddress(address.id)
              }}
            >
              Editar
            </Button>

            <Button
              borderRadius="base"
              colorScheme="red"
              fontSize="sm"
              height="9"
              leftIcon={<RiDeleteBin2Fill size={20} />}
              type="button"
              textTransform="uppercase"
              fontWeight="normal"
              width="50%"
              onClick={() => {
                onOpen()
                setCurrentAddress(address)
              }}
            >
              Excluir
            </Button>
          </ButtonGroup>
        </Flex>
      ))}

      <ModalConfirm
        isOpen={isOpen}
        onClose={onClose}
        handleClick={() => deleteAddress.mutate()}
        isLoading={deleteAddress.isLoading}
      />
    </React.Fragment>
  )
}
