import React from 'react'
import { BiMenu } from 'react-icons/bi'

import {
  Flex,
  Container,
  IconButton,
  Icon,
  useBreakpointValue,
  Box,
  Progress,
} from '@chakra-ui/react'

import { Logo } from '~/components/Logo'
import { useAuthContext } from '~/contexts/AuthContext'
import { useDrawer } from '~/contexts/DrawerContext'
import { useMounted } from '~/hooks/useMounted'
import { DisclosureProps } from '~/utils/types'

import { Profile } from './Profile'

export const Header = ({ isOpen }: DisclosureProps) => {
  const isMobile = useBreakpointValue({ base: true, lg: false })
  const { user } = useAuthContext()
  const { hasMounted } = useMounted()
  const { onOpen } = useDrawer()

  if (!hasMounted) {
    return <Progress size="sm" isIndeterminate colorScheme="purple" />
  }

  if (isMobile) {
    return (
      <Flex as="header" bgColor="white" shadow="base" width="100%">
        <Flex
          alignItems="center"
          height="12"
          justify="space-between"
          py="1.5"
          px="2.5"
          width="100%"
        >
          <IconButton
            aria-label="Abir menu"
            display="flex"
            fontSize="26"
            variant="unstyled"
            icon={<Icon as={BiMenu} />}
            onClick={onOpen}
          />

          <Logo />

          {!!user && (
            <Box mx={2}>
              <Profile user={user} />
            </Box>
          )}
        </Flex>
      </Flex>
    )
  }

  return (
    <Flex as="header" bgColor="white" shadow="base" width="100%">
      <Container centerContent maxW="container.xl">
        <Flex
          alignItems="center"
          height="16"
          justify="space-between"
          my="1.5"
          py="1.5"
          width="100%"
        >
          <Logo show={!isOpen} />

          {!!user && (
            <Flex alignItems="center" ml="auto" mr="2">
              <Profile user={user} />
            </Flex>
          )}
        </Flex>
      </Container>
    </Flex>
  )
}
