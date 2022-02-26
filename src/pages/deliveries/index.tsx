import React from 'react'

import { Container, Box } from '@chakra-ui/react'

import { ListDeliveries } from '~/components/Deliveries/List'
import { Head } from '~/components/Head'
import { ListHeader } from '~/components/Listing/Header'
import { appLayout } from '~/layouts/App'
import { NextPageWithLayout } from '~/utils/types'
import { withSSRAuth } from '~/utils/withSSRAuth'

const Deliveries: NextPageWithLayout = () => {
  return (
    <Container as="section" maxW="container.xl">
      <Head
        title="Encomendas"
        description="Fastfeet - Gerenciamento de encomendas"
      />

      <Box mt="3.5" mb="10">
        <ListHeader title="Gerenciando encomendas" linkTo="/deliveries/new" />
      </Box>

      <ListDeliveries />
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
    permissions: ['deliveries.list'],
    roles: ['administrator'],
  }
)

Deliveries.getLayout = appLayout

export default Deliveries
