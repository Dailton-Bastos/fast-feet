import React from 'react'
import { FieldError } from 'react-hook-form'

import { FormErrorMessage } from '@chakra-ui/react'

interface ErrorProps {
  message: FieldError
}

export const Error = ({ message }: ErrorProps) => {
  return <FormErrorMessage>{message.message}</FormErrorMessage>
}
