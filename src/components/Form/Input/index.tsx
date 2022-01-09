import React from 'react'

import {
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  FormControl,
  FormLabel,
} from '@chakra-ui/react'

interface InputProps extends ChakraInputProps {
  name: string
  label?: string
}

export const Input: React.ForwardRefRenderFunction<
  HTMLInputElement,
  InputProps
> = ({ name, label, ...rest }) => {
  return (
    <FormControl>
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
        {...rest}
      />
    </FormControl>
  )
}
