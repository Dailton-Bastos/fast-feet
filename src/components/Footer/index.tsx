import React from 'react'

import { Flex, Text } from '@chakra-ui/react'

import packageInfo from '../../../package.json'

const Footer = () => {
  return (
    <Flex as="footer" align="center" justify="center" py="6" mt="6">
      <Text fontSize="sm" color="gray.400">
        &copy; 2022 FastFeet - v{packageInfo.version}
      </Text>
    </Flex>
  )
}

export default React.memo(Footer)
