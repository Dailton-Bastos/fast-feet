import React from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

import { SimpleGrid, Stack } from '@chakra-ui/react'

import { Input } from '~/components/Form/Input'
import { Address } from '~/utils/types'

interface RecipientAddressFormProps {
  register: UseFormRegister<FieldValues>
  errors: FieldErrors
  address?: Address
}

export const RecipientAddressForm = ({
  register,
  errors,
  address,
}: RecipientAddressFormProps) => {
  return (
    <Stack spacing={4}>
      <SimpleGrid spacing={4} columns={3}>
        <Input
          {...register('zip_code')}
          id="zip_code"
          name="zip_code"
          label="CEP"
          defaultValue={address?.zip_code}
          error={errors.zip_code}
        />
        <Input
          {...register('street')}
          id="street"
          name="street"
          label="Rua"
          defaultValue={address?.street}
          error={errors.street}
        />

        <Input
          {...register('number')}
          id="number"
          name="number"
          label="Número"
          defaultValue={address?.number}
          error={errors.number}
        />
      </SimpleGrid>

      <Input
        {...register('complement')}
        id="complement"
        name="complement"
        label="Complemento"
        defaultValue={address?.complement}
      />

      <SimpleGrid spacing={4} columns={3}>
        <Input
          {...register('neighborhood')}
          id="neighborhood"
          name="neighborhood"
          label="Bairro"
          defaultValue={address?.neighborhood}
          error={errors.neighborhood}
        />

        <Input
          {...register('city')}
          id="city"
          name="city"
          label="Cidade"
          defaultValue={address?.city}
          error={errors.city}
        />

        <Input
          {...register('state')}
          id="state"
          name="state"
          label="Estado"
          defaultValue={address?.state}
          error={errors.state}
        />
      </SimpleGrid>
    </Stack>
  )
}
