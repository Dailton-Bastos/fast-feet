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
} from '@chakra-ui/react'
import NextLink from 'next/link'

export const RecentDeliveries = () => {
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
        <Heading fontSize={['lg', 'xl']}>Encomendas recentes</Heading>
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
              <Th>ID</Th>
              <Th>Destinatário</Th>
              <Th>Cidade</Th>
              <Th>Estado</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>

          <Tbody>
            <Tr>
              <Td color="#666">#01</Td>
              <Td color="#666">Dailton Bastos</Td>
              <Td color="#666">Caxias</Td>
              <Td color="#666">MA</Td>
              <Td color="#666">
                <Tag
                  bg="#dff0df"
                  borderRadius="full"
                  h="7"
                  justifyContent="center"
                  variant="solid"
                  w="32"
                >
                  <TagLeftIcon
                    as={RiCheckboxBlankCircleFill}
                    boxSize="12px"
                    color="#2ca42b"
                  />
                  <TagLabel
                    color="#2ca42b"
                    fontWeight="semibold"
                    fontSize="sm"
                    textTransform="uppercase"
                  >
                    Entregue
                  </TagLabel>
                </Tag>
              </Td>
            </Tr>

            <Tr>
              <Td color="#666">#02</Td>
              <Td color="#666">Pedro Cruz</Td>
              <Td color="#666">Timon</Td>
              <Td color="#666">MA</Td>
              <Td color="#666">
                <Tag
                  bg="#f0f0df"
                  variant="solid"
                  w="32"
                  h="7"
                  justifyContent="center"
                  borderRadius="full"
                >
                  <TagLeftIcon
                    boxSize="12px"
                    as={RiCheckboxBlankCircleFill}
                    color="#c1bc35"
                  />
                  <TagLabel
                    color="#c1bc35"
                    fontWeight="semibold"
                    fontSize="sm"
                    textTransform="uppercase"
                  >
                    Pendente
                  </TagLabel>
                </Tag>
              </Td>
            </Tr>

            <Tr>
              <Td color="#666">#03</Td>
              <Td color="#666">Felipe Sousa</Td>
              <Td color="#666">Teresina</Td>
              <Td color="#666">PI</Td>
              <Td color="#666">
                <Tag
                  bg="#bad2ff"
                  variant="solid"
                  w="32"
                  h="7"
                  justifyContent="center"
                  borderRadius="full"
                >
                  <TagLeftIcon
                    boxSize="12px"
                    as={RiCheckboxBlankCircleFill}
                    color="#4d85ee"
                  />
                  <TagLabel
                    color="#4d85ee"
                    fontWeight="semibold"
                    fontSize="sm"
                    textTransform="uppercase"
                  >
                    Retirada
                  </TagLabel>
                </Tag>
              </Td>
            </Tr>

            <Tr>
              <Td color="#666">#04</Td>
              <Td color="#666">Gardenia Fontenele</Td>
              <Td color="#666">Teresina</Td>
              <Td color="#666">PI</Td>
              <Td color="#666">
                <Tag
                  bg="#fab0b0"
                  variant="solid"
                  w="32"
                  h="7"
                  justifyContent="center"
                  borderRadius="full"
                >
                  <TagLeftIcon
                    boxSize="12px"
                    as={RiCheckboxBlankCircleFill}
                    color="#de3b3b"
                  />
                  <TagLabel
                    color="#de3b3b"
                    fontWeight="semibold"
                    fontSize="sm"
                    textTransform="uppercase"
                  >
                    Cancelada
                  </TagLabel>
                </Tag>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>
    </Box>
  )
}
