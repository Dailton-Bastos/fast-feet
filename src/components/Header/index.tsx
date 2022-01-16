import React from 'react'

import { Flex } from '@chakra-ui/react'

import { Logo } from '~/components/Logo'
import { useAuthContext } from '~/contexts/AuthContext'
import { DisclosureProps } from '~/utils/types'

import { Profile } from './Profile'

export const Header = ({ isOpen }: DisclosureProps) => {
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
        <Logo show={!isOpen} />

        <Flex alignItems={'center'} ml={'auto'} position={'relative'}>
          {user && (
            <Profile name={user.name} email={user.email} avatar={user.avatar} />
          )}
        </Flex>
      </Flex>
    </Flex>
  )
}
