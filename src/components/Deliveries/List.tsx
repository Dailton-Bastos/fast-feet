import React from 'react'
import {
  RiEdit2Fill,
  RiDeleteBin2Fill,
  RiCheckboxBlankCircleFill,
} from 'react-icons/ri'

import {
  Box,
  Td,
  Tr,
  Avatar,
  MenuList,
  MenuDivider,
  Flex,
  Text,
  Tag,
  TagLeftIcon,
  TagLabel,
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
import { Pagination } from '../Pagination'

export const ListDeliveries = () => {
  const [page, setPage] = React.useState(1)
  const { data, isLoading, isFetching, isError } = useDeliveries(page)
  const { setIsLoading, setIsFetching } = useQueryContext()

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
                  bg={delivery.status.bgColor}
                  borderRadius="full"
                  h="7"
                  justifyContent="center"
                  variant="solid"
                  w="32"
                >
                  <TagLeftIcon
                    as={RiCheckboxBlankCircleFill}
                    boxSize="12px"
                    color={delivery.status.color}
                  />
                  <TagLabel
                    color={delivery.status.color}
                    fontWeight="semibold"
                    fontSize="sm"
                    textTransform="uppercase"
                  >
                    {delivery.status.name}
                  </TagLabel>
                </Tag>
              </Td>

              <Td textAlign="right">
                <ListMenu>
                  <MenuList minW={40}>
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
    </Box>
  )
}
