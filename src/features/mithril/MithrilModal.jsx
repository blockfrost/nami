import { Button } from '@chakra-ui/button';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal';
import { useDisclosure } from '@chakra-ui/react';
import { Link, Text } from '@chakra-ui/layout';
import React from 'react';
import PrivacyPolicy from '../../../ui/app/components/privacyPolicy';

const MithrilModal = React.forwardRef((props, ref) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  React.useImperativeHandle(ref, () => ({
    openModal() {
      onOpen();
    },
    closeModal() {
      onClose();
    },
  }));
  return (
    <>
      <Modal
        size="xs"
        isCentered
        isOpen={isOpen}
        onClose={onClose}
        blockScrollOnMount={false}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="md">Mithril</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize="sm">{props.tx}</Text>
          </ModalBody>
          {/* <ModalFooter>
           
          </ModalFooter> */}
        </ModalContent>
      </Modal>
    </>
  );
});

export default MithrilModal;
