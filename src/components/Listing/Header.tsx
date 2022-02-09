import React from 'react'
import { RiAddLine } from 'react-icons/ri'

import { Flex, Heading, Icon, Spinner, Text } from '@chakra-ui/react'
import NextLink from 'next/link'

import { useQueryContext } from '~/contexts/QueryContext'

interface ListHeaderProps {
  title: string
  linkTo: string
}

export const ListHeader = ({ title, linkTo }: ListHeaderProps) => {
  const { isLoading, isFetching } = useQueryContext()

  return (
    <Flex align="center" justify="space-between">
      <Flex align="center">
        <Heading as="h2" size="md">
          {title}
        </Heading>

        {!isLoading && isFetching && (
          <Spinner size="sm" color="gray.500" ml="4" />
        )}
      </Flex>

      <NextLink href={linkTo} passHref>
        <Flex
          as="a"
          alignItems="center"
          bgColor="purple.500"
          borderRadius="base"
          gap="2"
          height="9"
          justifyContent="center"
          width="40"
        >
          <Icon as={RiAddLine} color="white" h={6} w={6} />

          <Text
            color="white"
            fontWeight="bold"
            fontSize="sm"
            textTransform="uppercase"
          >
            Cadastrar
          </Text>
        </Flex>
      </NextLink>
    </Flex>
  )
}
