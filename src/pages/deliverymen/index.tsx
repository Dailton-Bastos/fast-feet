import React from 'react'

import { Container, Box } from '@chakra-ui/react'

import { ListDeliverymen } from '~/components/Deliverymen/List'
import { Head } from '~/components/Head'
import { ListHeader } from '~/components/ListHeader'
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

      <Box mt="3.5" mb="10">
        <ListHeader
          title="Gerenciando entregadores"
          linkTo="/deliverymen/new"
        />
      </Box>

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
