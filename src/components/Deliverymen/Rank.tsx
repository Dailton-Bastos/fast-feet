import React from 'react'

import {
  Box,
  Flex,
  Heading,
  List,
  ListItem,
  Avatar,
  Text,
} from '@chakra-ui/react'
import NextLink from 'next/link'

export const RankDeliverymen = () => {
  return (
    <Box
      bg="white"
      borderRadius="base"
      boxShadow="base"
      flex="1 0 30%"
      py="10"
      px="6"
    >
      <Heading fontSize={['lg', 'xl']}>Top entregadores</Heading>

      <List mt="6">
        <Flex
          flexDirection={['row', null, null, 'column']}
          flexWrap="wrap"
          gap={2}
          mt={['0', null]}
        >
          <ListItem
            flex={['1 1 100%', '1 1 45%']}
            p="2"
            _hover={{
              bg: 'purple.500',
              color: 'white',
              transition: 'all 0.3s',
            }}
          >
            <NextLink href="/deliverymen" passHref>
              <Flex as="a" alignItems="center" gap="4">
                <Avatar name="Dailton Bastos" size="md" />
                <Box>
                  <Text fontWeight="semibold" fontSize="md">
                    Dailton Bastos
                  </Text>
                  <Text fontSize="sm">35 entregas</Text>
                </Box>
              </Flex>
            </NextLink>
          </ListItem>

          <ListItem
            flex={['1 1 100%', '1 1 45%']}
            p="2"
            _hover={{
              bg: 'purple.500',
              color: 'white',
              transition: 'all 0.3s',
            }}
          >
            <NextLink href="/deliverymen" passHref>
              <Flex as="a" alignItems="center" gap="4">
                <Avatar name="José Sousa" size="md" />
                <Box>
                  <Text fontWeight="semibold" fontSize="md">
                    José Sousa
                  </Text>
                  <Text fontSize="sm">28 entregas</Text>
                </Box>
              </Flex>
            </NextLink>
          </ListItem>

          <ListItem
            flex={['1 1 100%', '1 1 45%']}
            p="2"
            _hover={{
              bg: 'purple.500',
              color: 'white',
              transition: 'all 0.3s',
            }}
          >
            <NextLink href="/deliverymen" passHref>
              <Flex as="a" alignItems="center" gap="4">
                <Avatar name="Adriana de Gomes" size="md" />
                <Box>
                  <Text fontWeight="semibold" fontSize="md">
                    Adriana de Gomes
                  </Text>
                  <Text fontSize="sm">24 entregas</Text>
                </Box>
              </Flex>
            </NextLink>
          </ListItem>

          <ListItem
            flex={['1 1 100%', '1 1 45%']}
            p="2"
            _hover={{
              bg: 'purple.500',
              color: 'white',
              transition: 'all 0.3s',
            }}
          >
            <NextLink href="/deliverymen" passHref>
              <Flex as="a" alignItems="center" gap="4">
                <Avatar name="Bernardo Oliveira" size="md" />
                <Box>
                  <Text fontWeight="semibold" fontSize="md">
                    Bernardo Oliveira
                  </Text>
                  <Text fontSize="sm">20 entregas</Text>
                </Box>
              </Flex>
            </NextLink>
          </ListItem>

          <ListItem
            flex={['1 1 100%', '1 1 45%']}
            p="2"
            _hover={{
              bg: 'purple.500',
              color: 'white',
              transition: 'all 0.3s',
            }}
          >
            <NextLink href="/deliverymen" passHref>
              <Flex as="a" alignItems="center" gap="4">
                <Avatar name="Bruno Lima" size="md" />
                <Box>
                  <Text fontWeight="semibold" fontSize="md">
                    Bruno Lima
                  </Text>
                  <Text fontSize="sm">18 entregas</Text>
                </Box>
              </Flex>
            </NextLink>
          </ListItem>
        </Flex>
      </List>
    </Box>
  )
}
