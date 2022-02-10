import React from 'react'
import { RiArrowLeftSLine, RiCheckLine } from 'react-icons/ri'

import { Flex, Heading, Icon, Text, Stack, Button } from '@chakra-ui/react'
import NextLink from 'next/link'

interface HeaderFormProps {
  title: string
  linkBack: string
  isLoading: boolean
}

export const HeaderForm = ({
  title,
  linkBack,
  isLoading = false,
}: HeaderFormProps) => {
  return (
    <Flex align="center" justify="space-between">
      <Heading as="h2" size="md">
        {title}
      </Heading>

      <Stack direction="row" spacing={4}>
        <NextLink href={linkBack} passHref>
          <Flex
            as="a"
            alignItems="center"
            bgColor="gray.300"
            borderRadius="base"
            height="9"
            justifyContent="center"
            width="28"
          >
            <Icon as={RiArrowLeftSLine} color="white" h={6} w={6} />

            <Text
              color="white"
              fontWeight="semibold"
              fontSize="sm"
              textTransform="uppercase"
            >
              Voltar
            </Text>
          </Flex>
        </NextLink>

        <Button
          borderRadius="base"
          colorScheme="purple"
          fontSize="sm"
          height="9"
          leftIcon={<RiCheckLine size={20} />}
          size="md"
          type="submit"
          textTransform="uppercase"
          variant="solid"
          width="28"
          isLoading={isLoading}
        >
          Salvar
        </Button>
      </Stack>
    </Flex>
  )
}
