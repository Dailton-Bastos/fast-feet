import React from 'react'
import { RiSearchLine } from 'react-icons/ri'

import {
  Button,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  ListItem,
} from '@chakra-ui/react'

import { DisclosureProps } from '~/utils/types'

import { Tooltip } from './Tooltip'

export const Search = ({ isOpen, handleClick }: DisclosureProps) => {
  return (
    <ListItem my="2.5">
      {isOpen ? (
        <InputGroup>
          <Input
            borderRadius="xl"
            bgColor="white"
            color="gray.600"
            errorBorderColor="red.600"
            fontSize="md"
            fontWeight="normal"
            focusBorderColor="purple.500"
            id="search"
            name="search"
            placeholder="Pesquisar"
            size="lg"
            type="text"
            variant="outline"
            _hover={{
              borderColor: 'purple.500',
            }}
          />
          <InputLeftElement height="100%">
            <Button
              size="md"
              variant="ghost"
              _hover={{ bg: 'transparent' }}
              _focus={{ boxShadow: 'none' }}
            >
              <Icon as={RiSearchLine} boxSize="1.2rem" color="gray.300" />
            </Button>
          </InputLeftElement>
        </InputGroup>
      ) : (
        <Tooltip isOpen={isOpen} label="Pesquisar">
          <Button
            size="md"
            variant="ghost"
            w="100%"
            _hover={{ bg: 'transparent' }}
            _focus={{ boxShadow: 'none' }}
            onClick={handleClick}
          >
            <Icon as={RiSearchLine} boxSize="1.2rem" color="gray.600" />
          </Button>
        </Tooltip>
      )}
    </ListItem>
  )
}
