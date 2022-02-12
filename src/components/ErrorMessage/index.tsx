import React from 'react'

import { Text } from '@chakra-ui/react'

interface ErrorMessageProps {
  message: string
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <Text fontSize="sm" fontWeight="semibold" color="red.500">
      {message}
    </Text>
  )
}
