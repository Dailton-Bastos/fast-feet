import React from 'react'

import {
  Container,
  Box,
  VStack,
  Flex,
  Text,
  Input as ChakraInput,
} from '@chakra-ui/react'
import Image from 'next/image'

import { HeaderForm } from '~/components/Form/Header'
import { Input } from '~/components/Form/Input'
import { Head } from '~/components/Head'
import { appLayout } from '~/layouts/App'
import { NextPageWithLayout } from '~/utils/types'
import { withSSRAuth } from '~/utils/withSSRAuth'

import avatarIcon from '../../../public/images/avatar_icon.png'

const NewDeliveryman: NextPageWithLayout = () => {
  return (
    <Container as="section" maxW="container.lg">
      <Head
        title="Novo entregador"
        description="Fastfeet - Adicionar novo entregador"
      />

      <Box as="form" mt="3.5" mb="10">
        <HeaderForm
          title="Cadastro de entregadores"
          linkBack="/deliverymen"
          isLoading={false}
        />

        <Box
          bg="white"
          borderRadius={4}
          boxShadow="sm"
          flex="1"
          py="10"
          px="8"
          mt="5"
        >
          <Flex
            as="label"
            align="center"
            borderStyle="dashed"
            borderWidth="1px"
            borderColor="#ddd"
            borderRadius="50%"
            cursor="pointer"
            direction="column"
            htmlFor="avatar"
            height="40"
            justify="center"
            mx="auto"
            mb="6"
            width="40"
          >
            <Image height={39} src={avatarIcon} width={39} priority />
            <Text color="#ddd" fontWeight="semibold">
              Adicionar foto
            </Text>

            <ChakraInput type="file" name="avatar" id="avatar" display="none" />
          </Flex>

          <VStack spacing={'4'}>
            <Input name="name" label="Nome completo" placeholder="John Doe" />
            <Input
              name="contact"
              label="Contato"
              placeholder="(xx) xxxxx-xxxx"
            />
          </VStack>
        </Box>
      </Box>
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
    permissions: ['deliverymen.create'],
    roles: ['administrator'],
  }
)

NewDeliveryman.getLayout = appLayout

export default NewDeliveryman
