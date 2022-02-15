import React from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

import { SimpleGrid, Stack } from '@chakra-ui/react'

import { Input } from '~/components/Form/Input'

interface RecipientAddressFormProps {
  register: UseFormRegister<FieldValues>
  errors: FieldErrors
}

export const RecipientAddressForm = ({
  register,
  errors,
}: RecipientAddressFormProps) => {
  return (
    <Stack spacing={4}>
      <SimpleGrid spacing={4} columns={3}>
        <Input
          {...register('zipCode')}
          id="zipCode"
          name="zipCode"
          label="CEP"
          error={errors.zipCode}
        />
        <Input
          {...register('street')}
          id="street"
          name="street"
          label="Rua"
          error={errors.street}
        />

        <Input
          {...register('number')}
          id="number"
          name="number"
          label="Número"
          error={errors.number}
        />
      </SimpleGrid>

      <Input
        {...register('complement')}
        id="complement"
        name="complement"
        label="Complemento"
      />

      <SimpleGrid spacing={4} columns={3}>
        <Input
          {...register('neighborhood')}
          id="neighborhood"
          name="neighborhood"
          label="Bairro"
          error={errors.neighborhood}
        />

        <Input
          {...register('city')}
          id="city"
          name="city"
          label="Cidade"
          error={errors.city}
        />

        <Input
          {...register('state')}
          id="state"
          name="state"
          label="Estado"
          error={errors.state}
        />
      </SimpleGrid>
    </Stack>
  )
}
