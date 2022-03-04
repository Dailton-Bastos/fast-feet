import React from 'react'

import { Modal as ChakraModal, ModalOverlay } from '@chakra-ui/react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactElement
}

export const Modal = ({ isOpen = false, onClose, children }: ModalProps) => {
  return (
    <ChakraModal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      motionPreset="slideInBottom"
    >
      <ModalOverlay bg="rgba(0,0,0,0.6)" />

      {children}
    </ChakraModal>
  )
}
