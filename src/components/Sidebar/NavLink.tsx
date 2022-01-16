import React from 'react'

import { ListItem, Icon, Link, Text } from '@chakra-ui/react'

import { Tooltip } from './Tooltip'

interface NavLinkProps {
  icon: React.ElementType
  isOpen: boolean
  children: React.ReactNode
}

export const NavLink = ({ icon, isOpen, children }: NavLinkProps) => {
  return (
    <>
      <Tooltip isOpen={isOpen} label={children}>
        <ListItem
          borderRadius={isOpen ? '12px' : '0'}
          color="gray.600"
          display="flex"
          w="100%"
          _hover={{
            bgColor: isOpen ? 'purple.500' : 'white',
            color: isOpen ? 'white' : 'gray.600',
            transition: 'all 0.2s',
          }}
        >
          <Link
            align="center"
            display="flex"
            h="100%"
            justifyContent={isOpen ? 'flex-start' : 'center'}
            px="1.5"
            py="3"
            w="100%"
            _hover={{ textDecoration: 'none' }}
          >
            <Icon as={icon} fontSize="20" />
            {!!isOpen && (
              <Text fontSize="md" fontWeight="medium" ml="4">
                {children}
              </Text>
            )}
          </Link>
        </ListItem>
      </Tooltip>
    </>
  )
}
