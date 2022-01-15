import React from 'react'

import { Flex } from '@chakra-ui/react'
import Image from 'next/image'

import logo from '../../../public/images/logo.svg'

interface AuthLayoutProps {
  children: React.ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <Flex
      as="main"
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
          <Image alt="FastFeet" src={logo} height={44} width={258} />
        </Flex>

        {children}
      </Flex>
    </Flex>
  )
}

export const authLayout = (page: React.ReactElement) => {
  return <AuthLayout>{page}</AuthLayout>
}
