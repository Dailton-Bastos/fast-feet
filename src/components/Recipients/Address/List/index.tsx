import React from 'react'
import { FieldValues, UseFormSetValue } from 'react-hook-form'
import { RiEdit2Fill, RiDeleteBin2Fill } from 'react-icons/ri'

import {
  Button,
  ButtonGroup,
  Flex,
  List,
  ListItem,
  Stack,
} from '@chakra-ui/react'

import { ModalConfirm } from '~/components/ModalConfirm'
import { useDeleteAddress } from '~/hooks/useAddress'
import { setAddressFormValues } from '~/utils/setAddressFormValues'
import { Address } from '~/utils/types'

interface AddressListProps {
  addresses?: Address[]
  handleClickStates: () => void
  setCurrentAddressId: React.Dispatch<React.SetStateAction<number | undefined>>
  setFormValues: UseFormSetValue<FieldValues>
}

export const AddressList = ({
  addresses = [],
  handleClickStates,
  setCurrentAddressId,
  setFormValues,
}: AddressListProps) => {
  const [addressId, setAddressId] = React.useState<number>()

  const { onToggle, isOpen, mutate, isLoading } = useDeleteAddress(
    addressId as number
  )

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
                handleClickStates()
                setAddressFormValues(address, setFormValues)
                setCurrentAddressId(address.id)
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
                onToggle()
                setAddressId(address.id)
              }}
            >
              Excluir
            </Button>
          </ButtonGroup>
        </Flex>
      ))}

      <ModalConfirm
        isOpen={isOpen}
        onToggle={onToggle}
        handleClick={mutate}
        isLoading={isLoading}
      />
    </React.Fragment>
  )
}
