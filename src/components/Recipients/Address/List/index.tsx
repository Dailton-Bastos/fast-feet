import React from 'react'
import { RiEdit2Fill } from 'react-icons/ri'

import { Button, Flex, List, ListItem, Stack } from '@chakra-ui/react'

import { Address } from '~/utils/types'

interface AddressListProps {
  addresses?: Address[]
}

export const AddressList = ({ addresses }: AddressListProps) => {
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

          <Flex align="center" justifyContent="center" mt="auto">
            <Button
              borderRadius="base"
              colorScheme="purple"
              fontSize="sm"
              height="9"
              leftIcon={<RiEdit2Fill size={20} />}
              size="md"
              type="button"
              textTransform="uppercase"
              variant="outline"
              width="28"
            >
              Editar
            </Button>
          </Flex>
        </Flex>
      ))}
    </React.Fragment>
  )
}
