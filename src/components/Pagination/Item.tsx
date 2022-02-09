import React from 'react'

import { Button } from '@chakra-ui/react'

interface PaginationItemProps {
  number: number
  isCurrent?: boolean
  onPageChange: (page: number) => void
}

export const PaginationItem = ({
  number,
  isCurrent = false,
  onPageChange,
}: PaginationItemProps) => {
  if (isCurrent) {
    return (
      <Button
        colorScheme="purple"
        fontSize="xs"
        disabled
        size="sm"
        width="4"
        _disabled={{
          bg: 'purple.500',
          cursor: 'default',
        }}
      >
        {number}
      </Button>
    )
  }
  return (
    <Button
      bg="white"
      fontSize="xs"
      size="sm"
      width="4"
      _hover={{
        bg: 'purple.500',
        color: 'white',
      }}
      onClick={() => onPageChange(number)}
    >
      {number}
    </Button>
  )
}
