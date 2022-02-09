import React from 'react'

import { MenuItem as ChakraMenuItem, Text } from '@chakra-ui/react'

interface MenuItemProps {
  Icon: React.ReactElement
  buttonTitle: string
}

export const MenuItem = ({ Icon, buttonTitle }: MenuItemProps) => {
  return (
    <ChakraMenuItem icon={Icon}>
      <Text color="#999">{buttonTitle}</Text>
    </ChakraMenuItem>
  )
}
