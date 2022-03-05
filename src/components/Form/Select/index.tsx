import React from 'react'
import { FieldError } from 'react-hook-form'

import {
  Select as ChakraSelect,
  FormLabel,
  SelectProps as ChakraSelectProps,
  FormControl,
} from '@chakra-ui/react'

import { Error } from '../Error'

interface SelectProps extends ChakraSelectProps {
  name: string
  options: Array<
    Partial<{
      id: number
      name: string
    }>
  >
  value: number | undefined
  setValue: React.Dispatch<React.SetStateAction<number | undefined>>
  label?: string
  error?: FieldError
}

export const SelectBase: React.ForwardRefRenderFunction<
  HTMLSelectElement,
  SelectProps
> = ({ name, options, value, setValue, label, error = null, ...rest }, ref) => {
  return (
    <FormControl isInvalid={!!error}>
      {!!label && (
        <FormLabel htmlFor={name} fontSize="md" fontWeight="bold">
          {label}
        </FormLabel>
      )}

      <ChakraSelect
        placeholder="Selecione"
        size="lg"
        focusBorderColor="purple.500"
        errorBorderColor="red.600"
        _hover={{
          borderColor: 'purple.500',
        }}
        name={name}
        value={value}
        onChange={({ target }) => setValue(Number(target.value))}
        ref={ref}
        {...rest}
      >
        {options?.map((option) => {
          return (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          )
        })}
      </ChakraSelect>

      {!!error && <Error message={error} />}
    </FormControl>
  )
}

export const Select = React.forwardRef(SelectBase)
