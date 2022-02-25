import React from 'react'
import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  UseFormSetError,
} from 'react-hook-form'

import { Box, Flex, SimpleGrid, Stack, Link } from '@chakra-ui/react'

import { Input } from '~/components/Form/Input'
import { Loading } from '~/components/Loading'

interface RecipientAddressFormProps {
  register: UseFormRegister<FieldValues>
  errors: FieldErrors
  setError: UseFormSetError<FieldValues>
  handleChangePostalCode: (cep: string) => void
  showPostalCodeInput: boolean
  showFullAddressForm: boolean
  isLoading: boolean
}

export const RecipientAddressForm = ({
  register,
  errors,
  setError,
  handleChangePostalCode,
  showPostalCodeInput,
  showFullAddressForm,
  isLoading = false,
}: RecipientAddressFormProps) => {
  const [timer, setTimer] = React.useState<number>(0)

  function handleChange(cep: string) {
    const reg = /^[0-9]{5}-?[0-9]{3}$/

    const isValid = reg.test(cep)

    clearTimeout(timer)

    setTimer(
      window.setTimeout(() => {
        if (isValid) {
          handleChangePostalCode(cep)
        }

        if (!isValid && cep) {
          setError(
            'zip_code',
            {
              type: 'manual',
              message: 'Digite um CEP válido.',
            },
            {
              shouldFocus: true,
            }
          )
        }
      }, 2000)
    )
  }

  if (showPostalCodeInput && !showFullAddressForm) {
    return (
      <>
        <Flex align="center" gap={4} maxW="60" mb="4">
          <Input
            {...register('zip_code')}
            id="zip_code"
            name="zip_code"
            label="CEP"
            error={errors.zip_code}
            onChange={({ target }) => handleChange(target.value)}
            onBlur={({ target }) => handleChange(target.value)}
          />

          {!!isLoading && (
            <Box mx="auto">
              <Loading size="sm" color="gray.500" />
            </Box>
          )}
        </Flex>

        <Link
          href="https://buscacepinter.correios.com.br/app/endereco/index.php"
          target="_blank"
          fontSize="sm"
        >
          Não sei meu CEP
        </Link>
      </>
    )
  }

  if (showFullAddressForm)
    return (
      <Stack spacing={4}>
        <SimpleGrid spacing={4} columns={3}>
          <Input
            {...register('zip_code')}
            id="zip_code"
            name="zip_code"
            label="CEP"
            error={errors.zip_code}
            onChange={({ target }) => handleChange(target.value)}
            onBlur={({ target }) => handleChange(target.value)}
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
          placeholder="Opcional"
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

  return null
}
