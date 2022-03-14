import React from 'react'
import { BsXCircle } from 'react-icons/bs'

import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Text,
  Button,
  Icon,
  UseDisclosureProps,
} from '@chakra-ui/react'

interface ModalProps extends UseDisclosureProps {
  onToggle: () => void
  handleClick: () => void
  isLoading?: boolean
}

export const ModalConfirm = ({
  isOpen = false,
  onToggle,
  handleClick,
  isLoading,
}: ModalProps) => {
  return (
    <ChakraModal
      isCentered
      isOpen={isOpen}
      onClose={onToggle}
      motionPreset="slideInBottom"
    >
      <ModalOverlay bg="rgba(0,0,0,0.6)" />

      <ModalContent mx="4">
        <ModalHeader
          alignItems="center"
          display="flex"
          justifyContent="center"
          mt="4"
        >
          <Icon as={BsXCircle} color="red.500" h={12} w={12} />
        </ModalHeader>

        <ModalBody textAlign="center">
          <Text fontSize="xl" fontWeight="semibold" mb="4">
            Deseja continuar?
          </Text>
          <Text color="gray.500">Esse processo não pode ser desfeito.</Text>
        </ModalBody>

        <ModalFooter
          alignItems="center"
          display="flex"
          gap={3}
          justifyContent="center"
        >
          <Button colorScheme="gray" w="50%" onClick={onToggle}>
            Cancelar
          </Button>

          <Button
            colorScheme="red"
            w="50%"
            onClick={handleClick}
            isLoading={isLoading}
          >
            Continuar
          </Button>
        </ModalFooter>
      </ModalContent>
    </ChakraModal>
  )
}
