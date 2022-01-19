import React from 'react'

import { Box, Flex, Text, useBreakpointValue } from '@chakra-ui/react'

import { Menu } from './Menu'

interface ProfileProps {
  user: {
    name: string
    email: string
    avatar?: string
  }
}

export const Profile = ({ user }: ProfileProps) => {
  const isMobile = useBreakpointValue({ base: true, lg: false })

  return (
    <Flex alignItems={'center'}>
      {!isMobile && (
        <Box mr="4" textAlign="right">
          <Text fontWeight="bold">{user.name}</Text>
          <Text fontSize="small" color="gray.600">
            {user.email}
          </Text>
        </Box>
      )}

      <Menu user={user} />
    </Flex>
  )
}
