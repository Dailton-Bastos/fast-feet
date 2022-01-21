import React from 'react'

import { Flex, Text, Icon, ScaleFade } from '@chakra-ui/react'
import { useSpring, animated } from '@react-spring/web'

import { useMounted } from '~/hooks/useMounted'

interface CardProps {
  value: number
  icon: React.ElementType
  children: string
}

export const Card = ({ value, icon, children }: CardProps) => {
  const { hasMounted } = useMounted()

  const randomNumber = Math.floor(Math.random() * (value - 1) + 1)

  const { number } = useSpring({
    from: { number: randomNumber },
    number: value,
    delay: 300,
  })

  const formattedNumber = number.to((n) => Math.floor(n))

  return (
    <ScaleFade initialScale={0.9} in={hasMounted}>
      <Flex
        align="center"
        bg="white"
        borderRadius="base"
        justify="space-between"
        px={['8', '6']}
        py={['6', '8']}
        shadow="md"
      >
        <Flex direction="column">
          <Text
            color="#222"
            fontSize={['xl', null, null, '4xl']}
            fontWeight="semibold"
          >
            {hasMounted && <animated.span>{formattedNumber}</animated.span>}
          </Text>
          <Text color="#666" fontSize={['md', null, null, 'lg']}>
            {children}
          </Text>
        </Flex>

        <Icon as={icon} boxSize={['6', '8', null, '10']} color="purple.500" />
      </Flex>
    </ScaleFade>
  )
}
