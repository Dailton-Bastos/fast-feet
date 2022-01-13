import React from 'react'
import { RiUser3Fill, RiLogoutBoxLine } from 'react-icons/ri'

import {
  Menu as MenuChakra,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from '@chakra-ui/react'
import NextLink from 'next/link'

import { useAuthContext } from '~/contexts/AuthContext'

interface MenuProps {
  children: React.ReactElement
}

export const Menu = ({ children }: MenuProps) => {
  const { signOut } = useAuthContext()

  return (
    <MenuChakra autoSelect={false} gutter={20} placement="top-end">
      <MenuButton>{children}</MenuButton>
      <MenuList>
        <NextLink href="/profile">
          <a>
            <MenuItem icon={<RiUser3Fill size={18} color="#444" />}>
              Meu perfil
            </MenuItem>
          </a>
        </NextLink>

        <MenuDivider />

        <MenuItem
          color={'red.600'}
          icon={<RiLogoutBoxLine size={18} color="#444" />}
          onClick={signOut}
        >
          Sair do sistema
        </MenuItem>
      </MenuList>
    </MenuChakra>
  )
}
