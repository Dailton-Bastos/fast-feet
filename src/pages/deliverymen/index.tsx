import React from 'react'
import { RiAddLine } from 'react-icons/ri'

import { Container, Flex, Heading, Text, Icon } from '@chakra-ui/react'
import NextLink from 'next/link'

import { ListDeliverymen } from '~/components/Deliverymen/List'
import { Head } from '~/components/Head'
import { appLayout } from '~/layouts/App'
import { NextPageWithLayout } from '~/utils/types'
import { withSSRAuth } from '~/utils/withSSRAuth'

const Deliverymen: NextPageWithLayout = () => {
  return (
    <Container as="section" maxW="container.xl">
      <Head
        title="Entregadores"
        description="Fastfeet - Gerenciamento de entregadores"
      />

      <Flex align="center" justify="space-between" mt="3.5" mb="10">
        <Heading as="h2" size="md">
          Gerenciando entregadores
        </Heading>

        <NextLink href="/deliverymen/new" passHref>
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

      <ListDeliverymen />
    </Container>
  )
}

export const getServerSideProps = withSSRAuth(
  async () => {
    return {
      props: {},
    }
  },
  {
    permissions: ['deliverymen.list'],
    roles: ['administrator'],
  }
)

Deliverymen.getLayout = appLayout

export default Deliverymen
