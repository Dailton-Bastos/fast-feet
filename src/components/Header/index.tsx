import React from 'react'

import { Flex } from '@chakra-ui/react'

import { useAuthContext } from '~/contexts/AuthContext'

import { Logo } from './Logo'
import { Profile } from './Profile'

export const Header = () => {
  const { user } = useAuthContext()

  return (
    <Flex as="header" bgColor={'white'} width={'100%'}>
      <Flex
        alignItems={'center'}
        height={'16'}
        width={'100%'}
        maxWidth={'1440px'}
        mx={'auto'}
        p={'2.5'}
      >
        <Logo />

        <Flex alignItems={'center'} ml={'auto'} position={'relative'}>
          {user && (
            <Profile name={user.name} email={user.email} avatar={user.avatar} />
          )}
        </Flex>
      </Flex>
    </Flex>
  )
}
