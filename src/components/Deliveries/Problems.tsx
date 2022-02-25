import React from 'react'
import { RiDeleteBin2Fill, RiEdit2Fill } from 'react-icons/ri'

import { Box, Flex, MenuDivider, MenuList, Td, Tr } from '@chakra-ui/react'

import { ListTable } from '~/components/Listing/Table'
import { useQueryContext } from '~/contexts/QueryContext'
import { useDeliveriesProblems } from '~/hooks/useDeliveriesProblems'
import { DeliveriesProblems } from '~/utils/types'

import { ErrorMessage } from '../ErrorMessage'
import { ListMenu } from '../Listing/Menu'
import { MenuItem } from '../Listing/MenuItem'
import { Loading } from '../Loading'
import { Pagination } from '../Pagination'

export const ListDeliveriesProblems = () => {
  const [page, setPage] = React.useState(1)
  const { data, isLoading, isFetching, isError } = useDeliveriesProblems(page)
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
        <ErrorMessage message="Erro ao carregar listagem de problemas" />
      </Flex>
    )
  }

  return (
    <Box overflowX="auto" pb="5">
      <ListTable thead={['Encomenda', 'Problema', 'Ações']}>
        {data?.problems.map((problem: DeliveriesProblems) => (
          <React.Fragment key={problem.id}>
            <Tr bg="white">
              <Td width="20%">{`#0${problem.deliveryId}`}</Td>

              <Td width="60%">{problem.preview}</Td>

              <Td textAlign="right" width="20%">
                <ListMenu>
                  <MenuList minW={40}>
                    <MenuItem
                      Icon={<RiEdit2Fill color="#4d85ee" size={18} />}
                      buttonTitle="Visualizar"
                    />

                    <MenuDivider />

                    <MenuItem
                      Icon={<RiDeleteBin2Fill color="#de3b3b" size={18} />}
                      buttonTitle="Cancelar encomenda"
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
