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
  Text,
} from '@chakra-ui/react'
import NextLink from 'next/link'

import { useQueryContext } from '~/contexts/QueryContext'
import {
  handlePrefetchDeliveryman,
  useDeleteDeliveryman,
} from '~/hooks/useDeliveryman'
import { useDeliverymen } from '~/hooks/useDeliverymen'
import { Deliveryman } from '~/utils/types'

import { ErrorMessage } from '../ErrorMessage'
import { ListMenu } from '../Listing/Menu'
import { MenuItem } from '../Listing/MenuItem'
import { ListTable } from '../Listing/Table'
import { Loading } from '../Loading'
import { ModalConfirm } from '../ModalConfirm'
import { Pagination } from '../Pagination'

export const ListDeliverymen = () => {
  const [page, setPage] = React.useState(1)
  const [deliverymanId, setDeliverymanId] = React.useState<number>()
  const { data, isLoading, isFetching, isError } = useDeliverymen(page)
  const { setIsLoading, setIsFetching } = useQueryContext()

  const {
    onToggle,
    isOpen,
    mutate,
    isLoading: isLoadingDelete,
  } = useDeleteDeliveryman(Number(deliverymanId))

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

  if (data?.deliverymen && data?.deliverymen.length < 1) {
    return (
      <Flex align="center" justify="center" mt="8">
        <Text color="gray.700">Nenhum entregador encontrado</Text>
      </Flex>
    )
  }

  return (
    <>
      <Box overflowX={['scroll', 'auto']} pb="5">
        <ListTable thead={['ID', 'Foto', 'Nome', 'Contato', 'A????es']}>
          {data?.deliverymen.map((deliveryman: Deliveryman) => (
            <React.Fragment key={deliveryman.id}>
              <Tr bg="white">
                <Td>{`#0${deliveryman.id}`}</Td>
                <Td>
                  <Avatar
                    name={deliveryman.name}
                    src={deliveryman.avatar}
                    size="sm"
                  />
                </Td>
                <Td>{deliveryman.name}</Td>
                <Td>
                  <Link alignItems="center" display="flex" gap={2} href="#">
                    <Icon as={RiWhatsappLine} color="green.500" h={6} w={6} />
                    {deliveryman.contact}
                  </Link>
                </Td>
                <Td
                  textAlign="right"
                  onMouseEnter={() => handlePrefetchDeliveryman(deliveryman.id)}
                >
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

                      <Box
                        onClick={() => {
                          onToggle()
                          setDeliverymanId(deliveryman.id)
                        }}
                      >
                        <MenuItem
                          Icon={<RiDeleteBin2Fill color="#de3b3b" size={18} />}
                          buttonTitle="Excluir"
                        />
                      </Box>
                    </MenuList>
                  </ListMenu>
                </Td>
              </Tr>

              <Tr h="5" />
            </React.Fragment>
          ))}
        </ListTable>
      </Box>

      {data?.totalCount && data?.totalCount > 6 && (
        <Pagination
          totalCountOfRegisters={data.totalCount}
          currentPage={page}
          onPageChange={setPage}
        />
      )}

      <ModalConfirm
        isOpen={isOpen}
        onToggle={onToggle}
        handleClick={mutate}
        isLoading={isLoadingDelete}
      />
    </>
  )
}
