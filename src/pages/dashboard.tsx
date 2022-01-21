import React from 'react'
import {
  RiShoppingBagLine,
  RiEBike2Line,
  RiHome2Line,
  RiAlertLine,
} from 'react-icons/ri'

import { Container, SimpleGrid, Flex } from '@chakra-ui/react'

import { Can } from '~/components/Can'
import { Card } from '~/components/Card'
import { RecentDeliveries } from '~/components/Deliveries/Recent'
import { RankDeliverymen } from '~/components/Deliverymen/Rank'
import { Head } from '~/components/Head'
import { appLayout } from '~/layouts/App'
import { NextPageWithLayout } from '~/utils/types'
import { withSSRAuth } from '~/utils/withSSRAuth'

export const Dashboard: NextPageWithLayout = () => {
  return (
    <Container as="section" maxW="container.xl">
      <Head title="Dashbaord" description="Fastfeet - Visão geral" />

      <SimpleGrid columns={[1, 2, null, 4]} spacing={5}>
        <Card value={80} icon={RiShoppingBagLine}>
          Encomendas
        </Card>

        <Card value={12} icon={RiEBike2Line}>
          Entregadores
        </Card>

        <Card value={36} icon={RiHome2Line}>
          Destinatários
        </Card>

        <Card value={8} icon={RiAlertLine}>
          Problemas
        </Card>
      </SimpleGrid>

      <Flex
        flexDirection={['column', null, null, 'row']}
        gap={5}
        justifyContent={['center', 'space-between']}
        mt="5"
      >
        <RecentDeliveries />

        <Can permissions={['deliverymen.rank']}>
          <RankDeliverymen />
        </Can>
      </Flex>
    </Container>
  )
}

export const getServerSideProps = withSSRAuth(async () => {
  return {
    props: {},
  }
})

Dashboard.getLayout = appLayout

export default Dashboard
