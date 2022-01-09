import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Flex, Box, Button, Stack, FormControl } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import * as yup from 'yup'

import { Input } from '~/components/Form/Input'
import { useAuthContext } from '~/contexts/AuthContext'

type SignInFormData = {
  email: string
  password: string
}

const SignInFormSchema = yup
  .object({
    email: yup.string().required('Campo obrigatório*').email('E-mail inválido'),
    password: yup.string().required('Campo obrigatório*'),
  })
  .required()

const SignIn: NextPage = () => {
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
      <Head>
        <title>FastFeet | Login</title>
      </Head>

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

export default SignIn
