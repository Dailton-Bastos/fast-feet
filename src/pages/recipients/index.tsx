import React from 'react'

import { Container, Box } from '@chakra-ui/react'

import { Head } from '~/components/Head'
import { ListHeader } from '~/components/Listing/Header'
import { ListRecipients } from '~/components/Recipients/List'
import { appLayout } from '~/layouts/App'
import { NextPageWithLayout } from '~/utils/types'
import { withSSRAuth } from '~/utils/withSSRAuth'

const Recipients: NextPageWithLayout = () => {
  return (
    <Container as="section" maxW="container.xl">
      <Head
        title="Destinatários"
        description="Fastfeet - Gerenciando destinatários"
      />

      <Box mt="3.5" mb="10">
        <ListHeader
          title="Gerenciando destinatários"
          linkTo="/recipients/new"
        />
      </Box>

      <ListRecipients />
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
    permissions: ['recipients.list'],
    roles: ['administrator', 'editor'],
  }
)

Recipients.getLayout = appLayout

export default Recipients
