import React from 'react'

import { Flex, Text, Icon, ScaleFade, Spinner } from '@chakra-ui/react'
import { useSpring, animated } from '@react-spring/web'

import { useMounted } from '~/hooks/useMounted'

interface CardProps {
  isLoading?: boolean
  value: number | undefined
  icon: React.ElementType
  children: string
}

export const Card = ({
  isLoading = false,
  value = 0,
  icon,
  children,
}: CardProps) => {
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
        px={['6', '4']}
        py={['4', '6']}
        shadow="md"
      >
        {isLoading ? (
          <Spinner size="lg" color="purple.500" />
        ) : (
          <>
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

            <Icon
              as={icon}
              boxSize={['6', '8', null, '10']}
              color="purple.500"
            />
          </>
        )}
      </Flex>
    </ScaleFade>
  )
}
