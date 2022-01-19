import React from 'react'

import {
  MenuItem as ChakraMenuItem,
  TextProps,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react'

interface MenuItemProps extends TextProps {
  Icon: React.ElementType
  title?: string
  disabled?: boolean
  handleClick?: () => void
}

export const MenuItem = ({
  Icon,
  title,
  disabled,
  handleClick,
  ...rest
}: MenuItemProps) => {
  const isMobile = useBreakpointValue({ base: true, lg: false })

  return (
    <ChakraMenuItem
      _focus={{
        bg: 'none',
      }}
      onClick={handleClick}
      icon={<Icon size={18} />}
      isDisabled={disabled}
    >
      <Text fontSize={isMobile ? 'sm' : 'md'} {...rest}>
        {title}
      </Text>
    </ChakraMenuItem>
  )
}
