import React from 'react'

import {
  ListItem,
  Icon,
  Link as ChakraLink,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react'

import { DisclosureProps } from '~/utils/types'

import { ActiveLink } from '../ActiveLink'
import { Tooltip } from './Tooltip'

interface NavLinkProps extends DisclosureProps {
  icon: React.ElementType
  href: string
  children: React.ReactNode
}

export const NavLink = ({
  icon,
  href,
  isOpen,
  children,
  ...rest
}: NavLinkProps) => {
  const isMobile = useBreakpointValue({ base: true, lg: false })

  return (
    <>
      <Tooltip isOpen={isOpen} label={children}>
        <ListItem
          borderRadius={isOpen ? '6px' : '0'}
          display="flex"
          w="100%"
          _hover={{
            bgColor: isOpen && !isMobile ? 'purple.500' : 'white',
            transition: 'all 0.2s',
          }}
        >
          <ActiveLink href={href} passHref isOpen={isOpen}>
            <ChakraLink
              align="center"
              display="flex"
              h="100%"
              justifyContent={isOpen ? 'flex-start' : 'center'}
              px="1.5"
              py="3"
              w="100%"
              _hover={{
                textDecoration: 'none',
                color: isOpen && !isMobile ? 'white' : 'gray.600',
              }}
              {...rest}
            >
              <Icon as={icon} fontSize="20" />
              {!!isOpen && (
                <Text
                  fontSize={isMobile ? 'sm' : 'md'}
                  fontWeight="medium"
                  ml="4"
                >
                  {children}
                </Text>
              )}
            </ChakraLink>
          </ActiveLink>
        </ListItem>
      </Tooltip>
    </>
  )
}
