import React from 'react'
import { RiDeleteBin2Fill, RiEdit2Fill } from 'react-icons/ri'

import {
  Box,
  Flex,
  MenuDivider,
  MenuList,
  ModalBody,
  ModalContent,
  ModalHeader,
  Td,
  Text,
  Tr,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'

import { ListTable } from '~/components/Listing/Table'
import { useQueryContext } from '~/contexts/QueryContext'
import { useCancellDelivery } from '~/hooks/useDeliveries'
import { useDeliveriesProblems } from '~/hooks/useDeliveriesProblems'
import { DeliveriesProblems, Delivery } from '~/utils/types'

import { Can } from '../Can'
import { ErrorMessage } from '../ErrorMessage'
import { ListMenu } from '../Listing/Menu'
import { MenuItem } from '../Listing/MenuItem'
import { Loading } from '../Loading'
import { Modal } from '../Modal'
import { ModalConfirm } from '../ModalConfirm'
import { Pagination } from '../Pagination'

export const ListDeliveriesProblems = () => {
  const [page, setPage] = React.useState(1)
  const { data, isLoading, isFetching, isError } = useDeliveriesProblems(page)
  const { setIsLoading, setIsFetching } = useQueryContext()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [delivery, setDelivery] = React.useState<Delivery | null>(null)

  const [descriptions, setDescriptions] = React.useState<string[]>([])

  const { mutateAsync, isLoadingCancelMutation, isOpenModalCancel, onToggle } =
    useCancellDelivery(delivery)

  const cancellDelivery = React.useCallback(
    (delivery: Delivery) => {
      setDelivery(delivery)
      onToggle()
    },
    [onToggle]
  )

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
    <>
      <Box overflowX={['scroll', 'auto']} pb="5">
        <ListTable thead={['Encomenda', 'Problema', 'Ações']}>
          {data?.problems.map((problem: DeliveriesProblems) => (
            <React.Fragment key={problem.id}>
              <Tr bg="white">
                <Td width="20%">{`#0${problem.delivery.id}`}</Td>

                <Td width="60%">{problem.preview}</Td>

                <Td textAlign="right" width="20%">
                  <ListMenu>
                    <MenuList minW={40}>
                      <Box
                        onClick={() => {
                          onOpen()
                          setDescriptions(problem.descriptions)
                        }}
                      >
                        <MenuItem
                          Icon={<RiEdit2Fill color="#4d85ee" size={18} />}
                          buttonTitle="Visualizar"
                        />
                      </Box>

                      <Can roles={['administrator']}>
                        <MenuDivider />
                        {problem.delivery.status !== 'cancelled' && (
                          <Box
                            onClick={() => cancellDelivery(problem.delivery)}
                          >
                            <MenuItem
                              Icon={
                                <RiDeleteBin2Fill color="#de3b3b" size={18} />
                              }
                              buttonTitle="Cancelar encomenda"
                            />
                          </Box>
                        )}
                      </Can>
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

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent minH={230} maxH={425} mx="4">
          <ModalHeader textAlign="center" fontSize="md">
            Visualizar problema
          </ModalHeader>

          <ModalBody pb="8">
            <VStack spacing={4}>
              {descriptions.map((description, index) => (
                <Text key={index} color="#666" lineHeight="7">
                  {description}
                </Text>
              ))}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>

      <ModalConfirm
        isOpen={isOpenModalCancel}
        onToggle={onToggle}
        handleClick={mutateAsync}
        isLoading={isLoadingCancelMutation}
      />
    </>
  )
}
