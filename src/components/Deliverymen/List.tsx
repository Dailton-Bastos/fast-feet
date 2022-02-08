import React from 'react'
import {
  RiMoreFill,
  RiEdit2Fill,
  RiDeleteBin2Fill,
  RiWhatsappLine,
} from 'react-icons/ri'

import {
  Box,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  IconButton,
  Text,
  Icon,
  Link,
} from '@chakra-ui/react'
import NextLink from 'next/link'

import { useDeliverymen } from '~/hooks/useDeliverymen'
import { Deliveryman } from '~/utils/types'

export const ListDeliverymen = () => {
  const { data } = useDeliverymen()

  return (
    <Box overflowX="auto">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th fontSize="md" textTransform="capitalize">
              ID
            </Th>
            <Th fontSize="md" textTransform="capitalize">
              Foto
            </Th>
            <Th fontSize="md" textTransform="capitalize">
              Nome
            </Th>
            <Th fontSize="md" textTransform="capitalize">
              Contato
            </Th>
            <Th fontSize="md" textTransform="capitalize" textAlign="right">
              Ações
            </Th>
          </Tr>
        </Thead>

        <Tbody color="#666">
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
                  <Menu autoSelect={false} placement="bottom">
                    <MenuButton
                      aria-label="Options"
                      variant="outline"
                      icon={<RiMoreFill color="#c6c6c6" />}
                      as={IconButton}
                    />

                    <MenuList minW={40}>
                      <NextLink href={`/deliverymen/${deliveryman.id}/edit`}>
                        <a>
                          <MenuItem
                            icon={<RiEdit2Fill color="#4d85ee" size={18} />}
                          >
                            <Text color="#999">Editar</Text>
                          </MenuItem>
                        </a>
                      </NextLink>

                      <MenuDivider />

                      <MenuItem
                        icon={<RiDeleteBin2Fill color="#de3b3b" size={18} />}
                      >
                        <Text color="#999">Excluir</Text>
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Td>
              </Tr>

              <Tr h="5" />
            </React.Fragment>
          ))}
        </Tbody>
      </Table>
    </Box>
  )
}
