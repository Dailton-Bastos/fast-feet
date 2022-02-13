import React from 'react'

import { Container, Box, SimpleGrid } from '@chakra-ui/react'

import { HeaderForm } from '~/components/Form/Header'
import { Input } from '~/components/Form/Input'
import { Head } from '~/components/Head'
import { appLayout } from '~/layouts/App'
import { NextPageWithLayout } from '~/utils/types'
import { withSSRAuth } from '~/utils/withSSRAuth'

const NewRecipient: NextPageWithLayout = () => {
  return (
    <Container as="section" maxW="container.lg">
      <Head
        title="Novo destinatário"
        description="Fastfeet - Adicionar novo destinatário"
      />

      <Box as="form" mt="3.5" mb="10">
        <HeaderForm
          title="Cadastro de destinatário"
          linkBack="/recipients"
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
          <SimpleGrid spacing={4} columns={2}>
            <Input
              id="name"
              name="name"
              label="Nome completo"
              placeholder="John Doe"
            />

            <Input
              id="contact"
              name="contact"
              label="Contato"
              placeholder="(xx) xxxxx-xxxx"
            />
          </SimpleGrid>
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
    permissions: ['recipients.create'],
    roles: ['administrator'],
  }
)

NewRecipient.getLayout = appLayout

export default NewRecipient
