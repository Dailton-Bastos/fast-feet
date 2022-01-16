import React from 'react'

import { Tooltip as ChakraTooltip } from '@chakra-ui/react'

interface TooltipProps {
  isOpen: boolean
  children: React.ReactNode
  label: React.ReactNode
}

export const Tooltip = ({ isOpen, label, children }: TooltipProps) => {
  return (
    <ChakraTooltip
      aria-label="A tooltip"
      bg="purple.500"
      borderRadius="base"
      fontSize="md"
      hasArrow
      isDisabled={isOpen}
      label={label}
      px={2.5}
      py={2}
      placement="right"
      shadow="md"
    >
      {children}
    </ChakraTooltip>
  )
}
