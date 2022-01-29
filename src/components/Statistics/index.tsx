import React from 'react'

import { SimpleGrid } from '@chakra-ui/react'

import { Card } from '~/components/Card'

import { Cards } from './content'
import { Icons } from './icons'

interface StatisticsProps {
  isLoading?: boolean
  error?: boolean | unknown
}

export const Statistics = ({ isLoading, error }: StatisticsProps) => {
  return (
    <SimpleGrid columns={[1, 2, null, 4]} spacing={5}>
      {!error &&
        Cards.map((card) => {
          const Icon = Icons[card.label]

          return (
            <Card key={card.label} value={80} icon={Icon} isLoading={isLoading}>
              {card.title}
            </Card>
          )
        })}
    </SimpleGrid>
  )
}
