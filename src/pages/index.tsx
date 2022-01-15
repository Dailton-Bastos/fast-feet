import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Box, Button, Stack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import type { GetServerSideProps } from 'next'

import { Input } from '~/components/Form/Input'
import { InputPassword } from '~/components/Form/InputPassword'
import { Head } from '~/components/Head'
import { useAuthContext } from '~/contexts/AuthContext'
import { authLayout } from '~/layouts/Auth'
import { NextPageWithLayout } from '~/utils/types'
import { withSSRGuest } from '~/utils/withSSRGuest'
import { SignInFormSchema } from '~/validators/signInFormSchema'

type SignInFormData = {
  email: string
  password: string
}

const SignIn: NextPageWithLayout = () => {
  const { signIn } = useAuthContext()

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(SignInFormSchema),
  })

  const { errors, isSubmitting } = formState

  const handleSignIn: SubmitHandler<SignInFormData> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    await signIn(data)
  }
  return (
    <>
      <Head title="Login" description="FastFeet | Autenticação" />

      <Box as={'form'} width={'100%'} onSubmit={handleSubmit(handleSignIn)}>
        <Stack mt={'10'} mb={'4'} spacing={'4'}>
          <Input
            {...register('email')}
            label="SEU E-MAIL"
            id="email"
            type={'email'}
            name="email"
            error={errors.email}
          />

          <InputPassword
            {...register('password')}
            label="SUA SENHA"
            id="password"
            name="password"
            error={errors.password}
          />
        </Stack>

        <Button
          colorScheme={'purple'}
          type="submit"
          size={'lg'}
          width={'100%'}
          isLoading={isSubmitting}
        >
          Entrar no sistema
        </Button>
      </Box>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = withSSRGuest(async () => {
  return {
    props: {},
  }
})

SignIn.getLayout = authLayout

export default SignIn
