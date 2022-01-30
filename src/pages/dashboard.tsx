import React from 'react'

import { Container, Flex } from '@chakra-ui/react'

import { Can } from '~/components/Can'
import { RecentDeliveries } from '~/components/Deliveries/Recent'
import { RankDeliverymen } from '~/components/Deliverymen/Rank'
import { Head } from '~/components/Head'
import { Statistics } from '~/components/Statistics'
import { appLayout } from '~/layouts/App'
import { NextPageWithLayout } from '~/utils/types'
import { withSSRAuth } from '~/utils/withSSRAuth'

export const Dashboard: NextPageWithLayout = () => {
  return (
    <Container as="section" maxW="container.xl">
      <Head title="Dashbaord" description="Fastfeet - Visão geral" />

      <Statistics />

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
