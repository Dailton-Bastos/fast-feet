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

export const Navigation = ({ isOpen = true, handleClick }: DisclosureProps) => {
  return (
    <Box as="nav" px={isOpen ? '14px' : '0'} my="1.5" pt="2">
      <List>
        <Search isOpen={isOpen} handleClick={handleClick} />

        <Stack align={isOpen ? 'stretch' : 'center'} mt="4" spacing="2">
          <NavLink href="/dashboard" isOpen={isOpen} icon={RiDashboardLine}>
            Dashboard
          </NavLink>

          <Divider />

          <NavLink href="/deliveries" isOpen={isOpen} icon={RiShoppingBagLine}>
            Encomendas
          </NavLink>

          <NavLink href="/deliverymen" isOpen={isOpen} icon={RiEBike2Line}>
            Entregadores
          </NavLink>

          <NavLink href="/recipients" isOpen={isOpen} icon={RiHome2Line}>
            Destinatários
          </NavLink>

          <Divider />

          <NavLink href="/problems" isOpen={isOpen} icon={RiAlertLine}>
            Problemas
          </NavLink>
        </Stack>
      </List>
    </Box>
  )
}
