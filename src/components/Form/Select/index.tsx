import React from 'react'
import { FieldError, FieldValues, UseFormRegister } from 'react-hook-form'

import {
  Select as ChakraSelect,
  FormLabel,
  SelectProps as ChakraSelectProps,
  FormControl,
} from '@chakra-ui/react'

import { Error } from '../Error'

interface SelectProps extends ChakraSelectProps {
  id: string
  name: string
  options: Array<
    Partial<{
      id: number
      name: string
    }>
  >

  value?: string
  setValue: React.Dispatch<React.SetStateAction<string>>
  label?: string
  error?: FieldError
  register: UseFormRegister<FieldValues>
}

export const SelectBase: React.ForwardRefRenderFunction<
  HTMLSelectElement,
  SelectProps
> = (
  {
    id,
    name,
    options = [],
    value,
    setValue,
    label,
    error = null,
    register,
    ...rest
  },
  _
) => {
  return (
    <FormControl isInvalid={!!error}>
      {!!label && (
        <FormLabel htmlFor={name} fontSize="md" fontWeight="bold">
          {label}
        </FormLabel>
      )}

      <ChakraSelect
        {...register(name)}
        id={id}
        placeholder="Selecione"
        size="lg"
        focusBorderColor="purple.500"
        errorBorderColor="red.600"
        _hover={{
          borderColor: 'purple.500',
        }}
        name={name}
        value={value}
        onChange={({ target }) => setValue(target.value)}
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
