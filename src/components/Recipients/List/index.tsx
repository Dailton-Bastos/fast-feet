import React from 'react'
import { RiEdit2Fill, RiDeleteBin2Fill } from 'react-icons/ri'
import { useMutation, useQueryClient } from 'react-query'

import {
  Box,
  Td,
  Tr,
  Flex,
  Text,
  MenuList,
  MenuDivider,
  useDisclosure,
} from '@chakra-ui/react'
import NextLink from 'next/link'

import { Can } from '~/components/Can'
import { ErrorMessage } from '~/components/ErrorMessage'
import { ListMenu } from '~/components/Listing/Menu'
import { MenuItem } from '~/components/Listing/MenuItem'
import { ListTable } from '~/components/Listing/Table'
import { Loading } from '~/components/Loading'
import { ModalConfirm } from '~/components/ModalConfirm'
import { Pagination } from '~/components/Pagination'
import { useQueryContext } from '~/contexts/QueryContext'
import { useRecipients } from '~/hooks/useRecipients'
import { api } from '~/services/apiClient'
import { Recipient } from '~/utils/types'

export const ListRecipients = () => {
  const [page, setPage] = React.useState(1)
  const [recipientId, setRecipientId] = React.useState('')
  const { data, isLoading, isFetching, isError } = useRecipients(page)
  const { setIsLoading, setIsFetching } = useQueryContext()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const queryClient = useQueryClient()

  const deleteRecipient = useMutation(
    async () => await api.delete(`/recipients/${recipientId}`),
    {
      onSuccess: () => {
        onClose()
        queryClient.invalidateQueries('recipients')
        queryClient.invalidateQueries('deliveries')
        queryClient.invalidateQueries('statistics')
        queryClient.setQueryData(['recipient', recipientId], null)
      },

      onError: () => onClose(),
    }
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
        <ErrorMessage message="Erro ao carregar listagem de destinatários" />
      </Flex>
    )
  }

  if (data?.recipients && data?.recipients.length < 1) {
    return (
      <Flex align="center" justify="center" mt="8">
        <Text color="gray.700">Nenhum destinatário encontrado</Text>
      </Flex>
    )
  }

  return (
    <Box overflowX="auto" pb="5">
      <ListTable thead={['ID', 'Nome', 'Endereço', 'Contato', 'Ações']}>
        {data?.recipients.map((recipient: Recipient) => (
          <React.Fragment key={recipient.id}>
            <Tr bg="white">
              <Td width="10%">{`#0${recipient.id}`}</Td>

              <Td width="20%">{recipient.name}</Td>

              <Td width="40%">{recipient.formattedAddresses?.[0]}</Td>

              <Td width="25%">{recipient.contact}</Td>

              <Td textAlign="right" width="20%">
                <Can roles={['administrator']}>
                  <ListMenu>
                    <MenuList minW={40}>
                      <NextLink href={`/recipients/${recipient.id}/edit`}>
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
                          onOpen()
                          setRecipientId(recipient.id)
                        }}
                      >
                        <MenuItem
                          Icon={<RiDeleteBin2Fill color="#de3b3b" size={18} />}
                          buttonTitle="Excluir"
                        />
                      </Box>
                    </MenuList>
                  </ListMenu>
                </Can>
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

      <ModalConfirm
        isOpen={isOpen}
        onClose={onClose}
        handleClick={() => deleteRecipient.mutate()}
        isLoading={deleteRecipient.isLoading}
      />
    </Box>
  )
}
