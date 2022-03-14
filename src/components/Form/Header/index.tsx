import React from 'react'
import { RiArrowLeftSLine, RiCheckLine } from 'react-icons/ri'

import { Flex, Heading, Button, ButtonGroup } from '@chakra-ui/react'
import { useRouter } from 'next/router'

interface HeaderFormProps {
  title: string
  isLoading: boolean
}

export const HeaderForm = ({ title, isLoading = false }: HeaderFormProps) => {
  const router = useRouter()

  return (
    <Flex
      align="center"
      justify="space-between"
      direction={['column', 'row']}
      gap={5}
    >
      <Heading as="h2" size="md">
        {title}
      </Heading>

      <ButtonGroup variant="solid" spacing="4" width={['100%', 'auto']}>
        <Button
          colorScheme="gray"
          fontSize="sm"
          height="9"
          leftIcon={<RiArrowLeftSLine size={20} />}
          size="sm"
          textTransform="uppercase"
          width={['100%', '28']}
          onClick={() => router.back()}
        >
          Voltar
        </Button>

        <Button
          colorScheme="purple"
          fontSize="sm"
          height="9"
          leftIcon={<RiCheckLine size={20} />}
          size="sm"
          type="submit"
          textTransform="uppercase"
          width={['100%', '28']}
          isLoading={isLoading}
        >
          Salvar
        </Button>
      </ButtonGroup>
    </Flex>
  )
}
