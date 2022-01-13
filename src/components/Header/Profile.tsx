import React from 'react'

import { Avatar, Box, Flex, Text } from '@chakra-ui/react'

import { Menu } from './Menu'

interface ProfileProps {
  name: string | undefined
  email: string | undefined
  avatar?: string
}

export const Profile = ({ name, email, avatar }: ProfileProps) => {
  return (
    <Flex alignItems={'center'}>
      <Box mr={'4'} textAlign={'right'}>
        <Text fontWeight={'bold'}>{name}</Text>
        <Text fontSize={'small'} color={'gray.600'}>
          {email}
        </Text>
      </Box>

      <Menu>
        <Avatar size={'md'} name={name} src={avatar} />
      </Menu>
    </Flex>
  )
}
