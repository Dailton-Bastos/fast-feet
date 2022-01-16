import React from 'react'

import { Flex, Container } from '@chakra-ui/react'

import { Logo } from '~/components/Logo'
import { useAuthContext } from '~/contexts/AuthContext'
import { DisclosureProps } from '~/utils/types'

import { Profile } from './Profile'

export const Header = ({ isOpen }: DisclosureProps) => {
  const { user } = useAuthContext()

  return (
    <Flex as="header" bgColor="white" shadow="base" width="100%">
      <Container centerContent maxW="container.xl">
        <Flex
          alignItems="center"
          height="16"
          width="100%"
          my="1.5"
          px="2.5"
          py="1.5"
        >
          <Logo show={!isOpen} />

          <Flex alignItems="center" ml="auto" position="relative">
            {user && (
              <Profile
                name={user.name}
                email={user.email}
                avatar={user.avatar}
              />
            )}
          </Flex>
        </Flex>
      </Container>
    </Flex>
  )
}
