import React from 'react'
import { FieldError } from 'react-hook-form'

import {
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  FormControl,
  FormLabel,
} from '@chakra-ui/react'

import { Error } from '../../Error'

interface InputProps extends ChakraInputProps {
  name: string
  label?: string
  error?: FieldError
}

const InputBase: React.ForwardRefRenderFunction<
  HTMLInputElement,
  InputProps
> = ({ name, label, error = null, ...rest }, ref) => {
  return (
    <FormControl isInvalid={!!error}>
      {!!label && (
        <FormLabel htmlFor={name} fontSize={'md'} fontWeight={'bold'}>
          {label}
        </FormLabel>
      )}

      <ChakraInput
        id={name}
        name={name}
        focusBorderColor="purple.500"
        bgColor={'white'}
        variant={'outline'}
        size={'lg'}
        _hover={{
          borderColor: 'purple.500',
        }}
        ref={ref}
        {...rest}
      />

      {!!error && <Error message={error} />}
    </FormControl>
  )
}

export const Input = React.forwardRef(InputBase)
