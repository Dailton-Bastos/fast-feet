import React from 'react'
import { BiMenuAltRight, BiMenu } from 'react-icons/bi'

import { Flex, Button } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'

import logo from '../../../public/images/header-logo.svg'

interface LogoProps {
  isOpen: boolean
  handleClick: () => void
}

export const Logo = ({ isOpen, handleClick }: LogoProps) => {
  return (
    <Flex align="center" h={16} justify={isOpen ? 'space-between' : 'center'}>
      {!!isOpen && (
        <Link href="/deliveries" passHref>
          <Flex as="a" align="center" justify="space-between">
            <Image height={26} src={logo} width={135} />
          </Flex>
        </Link>
      )}
      <Button
        h={10}
        p="0"
        size="sm"
        variant="ghost"
        w={8}
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
