import React from 'react'
import { FieldError } from 'react-hook-form'

import {
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  InputGroup,
  InputLeftElement,
  FormControl,
  FormLabel,
} from '@chakra-ui/react'

import { Error } from '~/components/Error'

interface InputProps extends ChakraInputProps {
  name: string
  label?: string
  Icon?: React.ReactElement
  error?: FieldError
}

const InputBase: React.ForwardRefRenderFunction<
  HTMLInputElement,
  InputProps
> = ({ name, label, error = null, Icon, ...rest }, ref) => {
  return (
    <FormControl isInvalid={!!error}>
      {!!label && (
        <FormLabel htmlFor={name} fontSize={'md'} fontWeight={'bold'}>
          {label}
        </FormLabel>
      )}

      <InputGroup>
        {!!Icon && (
          <InputLeftElement pointerEvents="none" height={'100%'}>
            {Icon}
          </InputLeftElement>
        )}
        <ChakraInput
          id={name}
          name={name}
          focusBorderColor="purple.500"
          errorBorderColor="red.600"
          bgColor={'white'}
          variant={'outline'}
          size={'lg'}
          _hover={{
            borderColor: 'purple.500',
          }}
          ref={ref}
          {...rest}
        />
      </InputGroup>

      {!!error && <Error message={error} />}
    </FormControl>
  )
}

export const Input = React.forwardRef(InputBase)
