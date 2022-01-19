import React from 'react'

import {
  Drawer as ChakraDrawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
} from '@chakra-ui/react'

import { useDrawer } from '~/contexts/DrawerContext'

interface DrawerProps {
  children: React.ReactElement
}

export const Drawer = ({ children }: DrawerProps) => {
  const { isOpen, onClose } = useDrawer()

  return (
    <ChakraDrawer placement="left" isOpen={isOpen} onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent bg="white">
          <DrawerCloseButton fontSize="md" />

          <DrawerBody mt="6" p="0">
            {children}
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </ChakraDrawer>
  )
}
