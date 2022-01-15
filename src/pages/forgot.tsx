import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { RiMailLine } from 'react-icons/ri'

import { Box, Button, Stack, Text, Heading } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import type { GetServerSideProps } from 'next'
import NextLink from 'next/link'

import { Input } from '~/components/Form/Input'
import { Head } from '~/components/Head'
import { authLayout } from '~/layouts/Auth'
import { NextPageWithLayout } from '~/utils/types'
import { withSSRGuest } from '~/utils/withSSRGuest'
import { ForgotPasswordFormSchema } from '~/validators/forgotPassworFormSchema'

type ForgotPasswordFormData = {
  email: string
}

const ForgotPassword: NextPageWithLayout = () => {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(ForgotPasswordFormSchema),
  })

  const { errors, isSubmitting } = formState

  const handleForgot: SubmitHandler<ForgotPasswordFormData> = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000))
  }
  return (
    <>
      <Head
        title="Recuperar senha"
        description="FastFeet | Recuperação de senha"
      />

      <Box as={'form'} width={'100%'} onSubmit={handleSubmit(handleForgot)}>
        <Stack mt={'10'} mb={'4'} spacing={'4'}>
          <Heading
            as="h1"
            size="md"
            color={'purple.500'}
            textAlign={'center'}
            mb={'4'}
          >
            Recuperar senha
          </Heading>
          <Input
            {...register('email')}
            placeholder="Digite seu e-mail"
            id="email"
            type={'email'}
            name="email"
            Icon={<RiMailLine color="#7D40E7" size={18} />}
            error={errors.email}
          />
        </Stack>

        <Button
          colorScheme={'purple'}
          type="submit"
          size={'lg'}
          width={'100%'}
          isLoading={isSubmitting}
        >
          Recuperar
        </Button>

        <NextLink href="/">
          <a>
            <Text fontSize="sm" color="gray.600" align="center" mt={'3'}>
              Voltar
            </Text>
          </a>
        </NextLink>
      </Box>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = withSSRGuest(async () => {
  return {
    props: {},
  }
})

ForgotPassword.getLayout = authLayout

export default ForgotPassword
