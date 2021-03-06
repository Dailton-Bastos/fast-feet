import React from 'react'

import { Flex, Box } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'

import logo from '../../../public/images/logo-md.svg'

interface LogoProps {
  show?: boolean
}

export const Logo = ({ show = true }: LogoProps) => {
  if (!show) return null

  return (
    <Box transition="all 0.5s">
      <Link href="/dashboard" passHref>
        <Flex as="a" align="center" justify="space-between">
          <Image height={26} src={logo} width={135} priority />
        </Flex>
      </Link>
    </Box>
  )
}
