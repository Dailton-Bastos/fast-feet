import React from 'react'
import {
  RiEdit2Fill,
  RiDeleteBin2Fill,
  RiCheckboxBlankCircleFill,
  RiEyeLine,
} from 'react-icons/ri'

import {
  Box,
  Td,
  Tr,
  Avatar,
  Image,
  MenuList,
  MenuDivider,
  Flex,
  Text,
  Tag,
  TagLeftIcon,
  TagLabel,
  useDisclosure,
  ModalContent,
  ModalBody,
  Stack,
} from '@chakra-ui/react'
import NextLink from 'next/link'

import { useQueryContext } from '~/contexts/QueryContext'
import { useDeliveries } from '~/hooks/useDeliveries'
import { Delivery } from '~/utils/types'

import { ErrorMessage } from '../ErrorMessage'
import { ListMenu } from '../Listing/Menu'
import { MenuItem } from '../Listing/MenuItem'
import { ListTable } from '../Listing/Table'
import { Loading } from '../Loading'
import { Modal } from '../Modal'
import { Pagination } from '../Pagination'

export const ListDeliveries = () => {
  const [page, setPage] = React.useState(1)
  const [delivery, setDelivery] = React.useState<Delivery>()
  const { data, isLoading, isFetching, isError } = useDeliveries(page)
  const { setIsLoading, setIsFetching } = useQueryContext()
  const { isOpen, onOpen, onClose } = useDisclosure()

  React.useEffect(() => {
    setIsLoading(isLoading)
    setIsFetching(isFetching)
  }, [isLoading, isFetching, setIsLoading, setIsFetching])

  if (isLoading) {
    return (
      <Flex align="center" justify="center">
        <Loading size="xl" color="purple.500" />
      </Flex>
    )
  }

  if (isError) {
    return (
      <Flex align="center" justify="center" mt="8">
        <ErrorMessage message="Erro ao carregar listagem de encomendas" />
      </Flex>
    )
  }

  return (
    <Box overflowX="auto" pb="5">
      <ListTable
        thead={[
          'ID',
          'Destinatário',
          'Entregador',
          'Cidade',
          'Estado',
          'Status',
          'Ações',
        ]}
      >
        {data?.deliveries.map((delivery: Delivery) => (
          <React.Fragment key={delivery.id}>
            <Tr bg="white">
              <Td>{`#0${delivery.id}`}</Td>

              <Td>{delivery.recipient.name}</Td>

              <Td>
                <Flex align="center" gap={2}>
                  <Avatar
                    name={delivery.deliveryman.name}
                    src={delivery.deliveryman.avatar}
                    size="sm"
                  />

                  <Text>{delivery.deliveryman.name}</Text>
                </Flex>
              </Td>

              <Td>{delivery.selectedAddress.city}</Td>

              <Td>{delivery.selectedAddress.state}</Td>

              <Td>
                <Tag
                  bg={delivery.formattedStatus.bgColor}
                  borderRadius="full"
                  h="7"
                  justifyContent="center"
                  variant="solid"
                  w="32"
                >
                  <TagLeftIcon
                    as={RiCheckboxBlankCircleFill}
                    boxSize="12px"
                    color={delivery.formattedStatus.color}
                  />
                  <TagLabel
                    color={delivery.formattedStatus.color}
                    fontWeight="semibold"
                    fontSize="sm"
                    textTransform="uppercase"
                  >
                    {delivery.formattedStatus.name}
                  </TagLabel>
                </Tag>
              </Td>

              <Td textAlign="right">
                <ListMenu>
                  <MenuList minW={40}>
                    <Box
                      onClick={() => {
                        onOpen()
                        setDelivery(delivery)
                      }}
                    >
                      <MenuItem
                        Icon={<RiEyeLine color="#8e5be8" size={18} />}
                        buttonTitle="Visualizar"
                      />
                    </Box>

                    <MenuDivider />

                    <NextLink href={`/deliveries/${delivery.id}/edit`}>
                      <a>
                        <MenuItem
                          Icon={<RiEdit2Fill color="#4d85ee" size={18} />}
                          buttonTitle="Editar"
                        />
                      </a>
                    </NextLink>

                    <MenuDivider />

                    <MenuItem
                      Icon={<RiDeleteBin2Fill color="#de3b3b" size={18} />}
                      buttonTitle="Excluir"
                    />
                  </MenuList>
                </ListMenu>
              </Td>
            </Tr>

            <Tr h="5" />
          </React.Fragment>
        ))}
      </ListTable>

      {data?.totalCount && data?.totalCount > 6 && (
        <Pagination
          totalCountOfRegisters={data.totalCount}
          currentPage={page}
          onPageChange={setPage}
        />
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalBody p="6">
            <Text color="gray.600" fontWeight="bold" fontSize="sm">
              Informações da encomenda
            </Text>

            {delivery && (
              <>
                <Box my="2">
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
                    Datas
                  </Text>
                  <Stack spacing="1">
                    <Text color="#666" fontWeight="semibold">
                      Retirada:{' '}
                      <Text as="span" fontWeight="normal">
                        {delivery.shipped_at}
                      </Text>
                    </Text>

                    {delivery.status === 'delivered' && (
                      <Text color="#666" fontWeight="semibold">
                        Entrega:{' '}
                        <Text as="span" fontWeight="normal">
                          {delivery.delivered_at}
                        </Text>
                      </Text>
                    )}

                    {delivery.status === 'cancelled' && (
                      <Text color="#666" fontWeight="semibold">
                        Cancelada:{' '}
                        <Text as="span" fontWeight="normal">
                          {delivery.cancelled_at}
                        </Text>
                      </Text>
                    )}
                  </Stack>
                </Box>

                {delivery.status === 'delivered' && (
                  <>
                    <MenuDivider />

                    <Box my="2">
                      <Text
                        color="gray.600"
                        fontWeight="bold"
                        fontSize="sm"
                        mb="6"
                      >
                        Assinatura do destinatário
                      </Text>

                      <Image
                        src={delivery.signature}
                        alt={delivery.recipient.name}
                      />
                    </Box>
                  </>
                )}
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}
