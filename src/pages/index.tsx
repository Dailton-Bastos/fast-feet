import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Flex, Box, Button, Stack, FormControl } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import type { GetServerSideProps } from 'next'
import Image from 'next/image'

import { Input } from '~/components/Form/Input'
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

      <Flex
        alignItems={'center'}
        height={'100vh'}
        justifyContent={'center'}
        width={'100vw'}
      >
        <Flex
          alignItems={'center'}
          border={'1px'}
          borderColor={'gray.10'}
          bg={'white'}
          borderRadius={'5px'}
          boxShadow={'md'}
          flexDirection={'column'}
          maxWidth={360}
          px={'8'}
          py={'16'}
          width={'100%'}
        >
          <Flex alignItems={'center'} justifyContent={'center'}>
            <Image
              alt="FastFeet"
              height={44}
              src="/images/logo.png"
              width={258}
            />
          </Flex>

          <Box as={'form'} width={'100%'} onSubmit={handleSubmit(handleSignIn)}>
            <Stack mt={'10'} mb={'4'} spacing={'4'}>
              <FormControl>
                <Input
                  {...register('email')}
                  label="SEU E-MAIL"
                  id="email"
                  type={'email'}
                  name="email"
                  error={errors.email}
                />
              </FormControl>

              <FormControl>
                <Input
                  {...register('password')}
                  label="SUA SENHA"
                  id="password"
                  type={'password'}
                  name="password"
                  error={errors.password}
                />
              </FormControl>
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
        </Flex>
      </Flex>
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
