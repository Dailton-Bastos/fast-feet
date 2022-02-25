import React from 'react'

import { Container, Box } from '@chakra-ui/react'

import { ListDeliveriesProblems } from '~/components/Deliveries/Problems'
import { Head } from '~/components/Head'
import { ListHeader } from '~/components/Listing/Header'
import { appLayout } from '~/layouts/App'
import { NextPageWithLayout } from '~/utils/types'
import { withSSRAuth } from '~/utils/withSSRAuth'

const DeliveriesProblems: NextPageWithLayout = () => {
  return (
    <Container as="section" maxW="container.xl">
      <Head
        title="Problemas na entrega"
        description="Fastfeet - Gerenciamento de problemas nas entregas"
      />

      <Box mt="3.5" mb="10">
        <ListHeader title="Problemas na entrega" />
      </Box>

      <ListDeliveriesProblems />
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
    permissions: ['problems.list'],
    roles: ['administrator', 'editor'],
  }
)

DeliveriesProblems.getLayout = appLayout

export default DeliveriesProblems
