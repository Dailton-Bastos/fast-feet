import React from 'react'
import { RiCheckboxBlankCircleFill } from 'react-icons/ri'

import {
  Box,
  Flex,
  Heading,
  Table,
  Thead,
  Tbody,
  Th,
  Tr,
  Td,
  Tag,
  TagLabel,
  TagLeftIcon,
  Spinner,
} from '@chakra-ui/react'
import NextLink from 'next/link'

import { useDeliveries } from '~/hooks/useDeliveries'

export const RecentDeliveries = () => {
  const { data, isLoading, isFetching } = useDeliveries()

  const deliveries = data?.deliveries?.slice(0, 5)

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
      </Flex>

      <Box overflowX="auto">
        <Table>
          <Thead>
            <Tr>
              <Th fontSize="md" textTransform="capitalize">
                ID
              </Th>
              <Th fontSize="md" textTransform="capitalize">
                Destinatário
              </Th>
              <Th fontSize="md" textTransform="capitalize">
                Cidade
              </Th>
              <Th fontSize="md" textTransform="capitalize">
                Estado
              </Th>
              <Th fontSize="md" textTransform="capitalize">
                Status
              </Th>
            </Tr>
          </Thead>

          <Tbody>
            {/* {deliveries?.map((delivery) => (
              <Tr key={delivery.id}>
                <Td color="#666">{`#0${delivery.id}`}</Td>
                <Td color="#666">{delivery.recipient}</Td>
                <Td color="#666">{delivery.selectedAddress.city}</Td>
                <Td color="#666">{delivery.selectedAddress.state}</Td>
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
              </Tr>
            ))} */}
          </Tbody>
        </Table>
      </Box>
    </Box>
  )
}
