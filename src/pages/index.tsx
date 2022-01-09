import React from 'react'

import { Flex, Box, Button, Stack, FormControl } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

import { Input } from '../components/Form/Input'

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
                <Input
                  label="SEU E-MAIL"
                  id="email"
                  type={'email'}
                  name="email"
                />
              </FormControl>

              <FormControl>
                <Input
                  label="SUA SENHA"
                  id="password"
                  type={'password'}
                  name="password"
                />
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
