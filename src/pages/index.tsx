import React from 'react'

import {
  Flex,
  Box,
  Button,
  Stack,
  Input,
  FormControl,
  FormLabel,
} from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

const SignIn: NextPage = () => {
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

          <Box as={'form'} width={'100%'}>
            <Stack mt={'10'} mb={'4'} spacing={'4'}>
              <FormControl>
                <FormLabel htmlFor="email">Seu E-mail</FormLabel>
                <Input id="email" type={'email'} />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="password">Sua Senha</FormLabel>
                <Input id="password" type={'password'} />
              </FormControl>
            </Stack>

            <Button
              colorScheme={'purple'}
              type="submit"
              size={'lg'}
              width={'100%'}
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
