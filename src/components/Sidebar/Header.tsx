import React from 'react'
import { BiMenuAltRight, BiMenu } from 'react-icons/bi'

import { Flex, Button } from '@chakra-ui/react'

import { Logo } from '~/components/Logo'
import { DisclosureProps } from '~/utils/types'

export const Header = ({ isOpen, handleClick }: DisclosureProps) => {
  return (
    <Flex
      align="center"
      h="16"
      justify={isOpen ? 'space-between' : 'center'}
      pl={isOpen ? '14px' : '0'}
    >
      <Logo show={isOpen} />

      <Button
        h="10"
        p="0"
        size="sm"
        variant="ghost"
        w="8"
        _focus={{ boxShadow: 'none' }}
        _hover={{ bg: 'transparent' }}
        onClick={handleClick}
      >
        {isOpen ? (
          <BiMenuAltRight color="#444" size={26} />
        ) : (
          <BiMenu color="#444" size={26} />
        )}
      </Button>
    </Flex>
  )
}
