import React from 'react'
import { RiEdit2Fill, RiDeleteBin2Fill, RiWhatsappLine } from 'react-icons/ri'

import {
  Box,
  Td,
  Tr,
  Avatar,
  MenuList,
  MenuDivider,
  Icon,
  Link,
  Flex,
} from '@chakra-ui/react'
import NextLink from 'next/link'

import { useQueryContext } from '~/contexts/QueryContext'
import { useDeliverymen } from '~/hooks/useDeliverymen'
import { Deliveryman } from '~/utils/types'

import { ErrorMessage } from '../ErrorMessage'
import { ListMenu } from '../Listing/Menu'
import { MenuItem } from '../Listing/MenuItem'
import { ListTable } from '../Listing/Table'
import { Loading } from '../Loading'
import { Pagination } from '../Pagination'

export const ListDeliverymen = () => {
  const [page, setPage] = React.useState(1)

  const { data, isLoading, isFetching, isError } = useDeliverymen(page)

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
        <ErrorMessage message="Erro ao carregar listagem de entregadores" />
      </Flex>
    )
  }

  return (
    <Box overflowX="auto" pb="5">
      <ListTable thead={['ID', 'Foto', 'Nome', 'Contato', 'Ações']}>
        {data?.deliverymen.map((deliveryman: Deliveryman) => (
          <React.Fragment key={deliveryman.id}>
            <Tr bg="white">
              <Td width="10%">{`#0${deliveryman.id}`}</Td>
              <Td width="10%">
                <Avatar
                  name={deliveryman.name}
                  src={deliveryman.avatar}
                  size="sm"
                />
              </Td>
              <Td width="25%">{deliveryman.name}</Td>
              <Td width="20%">
                <Link alignItems="center" display="flex" gap={2} href="#">
                  <Icon as={RiWhatsappLine} color="green.500" h={6} w={6} />
                  {deliveryman.contact}
                </Link>
              </Td>
              <Td textAlign="right" width="20%">
                <ListMenu>
                  <MenuList minW={40}>
                    <NextLink href={`/deliverymen/${deliveryman.id}/edit`}>
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

      <Pagination
        totalCountOfRegisters={data?.totalCount || 0}
        currentPage={page}
        onPageChange={setPage}
      />
    </Box>
  )
}
