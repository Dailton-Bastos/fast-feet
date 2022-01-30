import React from 'react'
import {
  RiShoppingBagLine,
  RiEBike2Line,
  RiHome2Line,
  RiAlertLine,
} from 'react-icons/ri'

import { SimpleGrid } from '@chakra-ui/react'

import { Card } from '~/components/Card'
import { useStatistics } from '~/hooks/useStatistics'

export const Statistics = () => {
  const { data, isLoading } = useStatistics()

  return (
    <SimpleGrid columns={[1, 2, null, 4]} spacing={5}>
      <Card isLoading={isLoading} icon={RiShoppingBagLine} value={36}>
        Encomendas
      </Card>

      <Card icon={RiEBike2Line} value={data?.deliverymen} isLoading={isLoading}>
        Entregadores
      </Card>

      <Card icon={RiHome2Line} value={data?.recipients} isLoading={isLoading}>
        Destinatários
      </Card>

      <Card icon={RiAlertLine} value={9} isLoading={isLoading}>
        Problemas
      </Card>
    </SimpleGrid>
  )
}
