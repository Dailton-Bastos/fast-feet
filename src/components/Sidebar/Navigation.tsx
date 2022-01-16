import React from 'react'
import {
  RiDashboardLine,
  RiShoppingBagLine,
  RiEBike2Line,
  RiHome2Line,
  RiAlertLine,
} from 'react-icons/ri'

import { Box, Divider, List, Stack } from '@chakra-ui/react'

import { DisclosureProps } from '~/utils/types'

import { NavLink } from './NavLink'
import { Search } from './Search'

export const Navigation = ({ isOpen, handleClick }: DisclosureProps) => {
  return (
    <Box as="nav" h="100%" mt="4">
      <List>
        <Search isOpen={isOpen} handleClick={handleClick} />

        <Stack align={isOpen ? 'stretch' : 'center'} mt="4" spacing="2">
          <NavLink isOpen={isOpen} icon={RiDashboardLine}>
            Dashboard
          </NavLink>

          <Divider />

          <NavLink isOpen={isOpen} icon={RiShoppingBagLine}>
            Encomendas
          </NavLink>
          <NavLink isOpen={isOpen} icon={RiEBike2Line}>
            Entregadores
          </NavLink>
          <NavLink isOpen={isOpen} icon={RiHome2Line}>
            Destinatários
          </NavLink>

          <Divider />

          <NavLink isOpen={isOpen} icon={RiAlertLine}>
            Problemas
          </NavLink>
        </Stack>
      </List>
    </Box>
  )
}
