import React from 'react'

import {
  Box,
  Flex,
  Heading,
  List,
  ListItem,
  Avatar,
  Text,
  Spinner,
} from '@chakra-ui/react'
import NextLink from 'next/link'

import { useRankDeliverymen } from '~/hooks/useRankDeliverymen'

export const RankDeliverymen = () => {
  const { data, isLoading, isFetching } = useRankDeliverymen()

  return (
    <Box
      bg="white"
      borderRadius="base"
      boxShadow="base"
      flex="1 0 30%"
      py={['4', '10']}
      px="6"
    >
      <Heading fontSize={['lg', 'xl']}>
        <Flex align="center">
          Top entregadores
          {!isLoading && isFetching && (
            <Spinner size="sm" color="gray.500" ml="4" />
          )}
        </Flex>
      </Heading>

      <List mt="6">
        <Flex
          flexDirection={['row', null, null, 'column']}
          flexWrap="wrap"
          gap={2}
          mt={['0', null]}
        >
          {data?.deliverymen.map((deliveryman) => (
            <ListItem
              key={deliveryman.id}
              flex={['1 1 100%', '1 1 45%']}
              p="2"
              _hover={{
                bg: 'purple.500',
                color: 'white',
                transition: 'all 0.3s',
              }}
            >
              <NextLink href={`/deliverymen/${deliveryman.id}/edit`} passHref>
                <Flex as="a" alignItems="center" gap="4">
                  <Avatar
                    name={deliveryman.name}
                    src={deliveryman.avatar}
                    size="md"
                  />
                  <Text fontWeight="semibold" fontSize="md">
                    {deliveryman.name}
                  </Text>
                </Flex>
              </NextLink>
            </ListItem>
          ))}
        </Flex>
      </List>
    </Box>
  )
}
