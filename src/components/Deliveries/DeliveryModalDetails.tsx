import React from 'react'

import {
  Box,
  Image,
  MenuDivider,
  ModalBody,
  ModalContent,
  Stack,
  Text,
} from '@chakra-ui/react'

import { Delivery } from '~/utils/types'

import { Modal } from '../Modal'

interface DeliveryModalDetailsProps {
  isOpen: boolean
  onClose: () => void
  delivery: Delivery
}

export const DeliveryModalDetails = ({
  isOpen,
  onClose,
  delivery,
}: DeliveryModalDetailsProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent mx="4">
        <ModalBody p="6">
          <Text color="gray.600" fontWeight="bold" fontSize="sm" mb="2">
            Informações da encomenda
          </Text>

          <Box my="2">
            <Text color="gray.600" fontWeight="bold" fontSize="sm">
              Produto:
              <Text fontWeight="normal" color="#666">
                {delivery.productName}
              </Text>
            </Text>
          </Box>

          <MenuDivider />

          <Box my="2">
            <Text color="gray.600" fontWeight="bold" fontSize="sm">
              Endereço de entrega:
            </Text>
            <Stack spacing="1" color="#666">
              <Text>
                {delivery.selectedAddress.street},{' '}
                {delivery.selectedAddress.number}
              </Text>
              <Text>
                {delivery.selectedAddress.city} -{' '}
                {delivery.selectedAddress.state}
              </Text>
              <Text>{delivery.selectedAddress.zipCode}</Text>
            </Stack>
          </Box>

          <MenuDivider />

          <Box my="2">
            <Text color="gray.600" fontWeight="bold" fontSize="sm">
              Datas:
            </Text>
            <Stack spacing="1">
              <Text color="#666" fontWeight="semibold">
                Retirada:{' '}
                <Text as="span" fontWeight="normal">
                  {delivery.shippedAt}
                </Text>
              </Text>

              {delivery.status === 'delivered' && (
                <Text color="#666" fontWeight="semibold">
                  Entrega:{' '}
                  <Text as="span" fontWeight="normal">
                    {delivery.deliveredAt}
                  </Text>
                </Text>
              )}

              {delivery.status === 'cancelled' && (
                <Text color="#666" fontWeight="semibold">
                  Cancelada:{' '}
                  <Text as="span" fontWeight="normal">
                    {delivery.cancelledAt}
                  </Text>
                </Text>
              )}
            </Stack>
          </Box>

          {delivery.status === 'delivered' && (
            <>
              <MenuDivider />

              <Box my="2">
                <Text color="gray.600" fontWeight="bold" fontSize="sm" mb="6">
                  Assinatura do destinatário:
                </Text>

                <Image src={delivery.signature} alt={delivery.recipient.name} />
              </Box>
            </>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
