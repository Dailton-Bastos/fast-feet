import React from 'react'
import { RiMoreFill } from 'react-icons/ri'

import { Menu, MenuButton, IconButton } from '@chakra-ui/react'

interface ListMenuProps {
  children: React.ReactElement
}

export const ListMenu = ({ children }: ListMenuProps) => {
  return (
    <Menu autoSelect={false} placement="bottom">
      <MenuButton
        aria-label="Menu"
        variant="outline"
        icon={<RiMoreFill color="#c6c6c6" />}
        as={IconButton}
      />

      {children}
    </Menu>
  )
}
