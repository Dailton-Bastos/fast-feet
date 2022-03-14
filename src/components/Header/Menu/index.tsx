import React from 'react'
import {
  RiUser3Fill,
  RiLogoutBoxLine,
  RiMailLine,
  RiSettings3Line,
} from 'react-icons/ri'

import {
  Menu as MenuChakra,
  MenuButton,
  MenuList,
  MenuDivider,
  Avatar,
  useBreakpointValue,
  Box,
} from '@chakra-ui/react'
import NextLink from 'next/link'

import { useAuthContext } from '~/contexts/AuthContext'

import { MenuItem } from '../MenuItem'

interface MenuProps {
  user: {
    name: string
    email: string
    avatar?: string
  }
}

export const Menu = ({ user }: MenuProps) => {
  const isMobile = useBreakpointValue({ base: true, lg: false })

  const { signOut } = useAuthContext()

  const size = isMobile ? 'sm' : 'md'

  return (
    <MenuChakra autoSelect={false} gutter={20} placement="top-end" isLazy>
      <MenuButton>
        <Avatar name={user.name} src={user.avatar} size={size} boxShadow="md" />
      </MenuButton>
      <MenuList>
        {isMobile && (
          <Box>
            <MenuItem title={user.name} Icon={RiUser3Fill} disabled />

            <MenuItem title={user.email} Icon={RiMailLine} disabled />
          </Box>
        )}

        <NextLink href="/profile">
          <a>
            <MenuItem title="Meu perfil" Icon={RiSettings3Line} />
          </a>
        </NextLink>

        <MenuDivider />

        <MenuItem
          color="red.600"
          fontWeight="semibold"
          title="Sair do sistema"
          Icon={RiLogoutBoxLine}
          handleClick={signOut}
        />
      </MenuList>
    </MenuChakra>
  )
}
