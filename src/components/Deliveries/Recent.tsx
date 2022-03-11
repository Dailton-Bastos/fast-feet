import React from 'react'
import { RiCheckboxBlankCircleFill } from 'react-icons/ri'

import {
  Box,
  Flex,
  Heading,
  Tr,
  Td,
  Tag,
  TagLabel,
  TagLeftIcon,
  Spinner,
} from '@chakra-ui/react'
import NextLink from 'next/link'

import { useDeliveries } from '~/hooks/useDeliveries'
import { Delivery } from '~/utils/types'

import { Can } from '../Can'
import { ListTable } from '../Listing/Table'

export const RecentDeliveries = () => {
  const { data, isLoading, isFetching } = useDeliveries()

  const RecentDeliveries = data?.deliveries?.slice(-5)

  return (
    <Box
      bg="white"
      borderRadius="base"
      boxShadow="base"
      flex="1 0 65%"
      py="10"
      px="6"
    >
      <Flex align="center" justify="space-between" mb="6">
        <Flex align="center">
          <Heading fontSize={['lg', 'xl']}>Encomendas recentes</Heading>
          {!isLoading && isFetching && (
            <Spinner size="sm" color="gray.500" ml="4" />
          )}
        </Flex>

        <Can roles={['administrator']}>
          <NextLink href="/deliveries" passHref>
            <Flex
              as="a"
              align="center"
              bg="purple.500"
              borderRadius="base"
              color="white"
              fontWeight="semibold"
              h="10"
              justify="center"
              width="32"
            >
              Ver todas
            </Flex>
          </NextLink>
        </Can>
      </Flex>

      <Box overflowX="auto" pb="5">
        <ListTable thead={['ID', 'Destinatário', 'Cidade', 'Estado', 'Status']}>
          {RecentDeliveries?.map((delivery: Delivery) => (
            <React.Fragment key={delivery.id}>
              <Tr>
                <Td>{`#0${delivery.id}`}</Td>
                <Td>{delivery.recipient.name}</Td>
                <Td>{delivery.selectedAddress.city}</Td>
                <Td>{delivery.selectedAddress.state}</Td>

                <Td w="20%">
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
              </Tr>
            </React.Fragment>
          ))}
        </ListTable>
      </Box>
    </Box>
  )
}
