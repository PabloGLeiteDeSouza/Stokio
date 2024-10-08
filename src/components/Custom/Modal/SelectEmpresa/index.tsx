import {
  CloseIcon,
  ButtonIcon,
  Heading,
  Text,
  Icon,
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Center,
  VStack,
  HStack,
  CheckCircleIcon,
  Input,
  InputField,
  ArrowLeftIcon,
  Link,
} from '@gluestack-ui/themed';

import { Box, Button, ButtonText } from '@gluestack-ui/themed';
import React from 'react';
import { IModalSelectEmpresaProps } from './interfaces/index.ts';

const ModalSelectEmpresa: React.FC<IModalSelectEmpresaProps> = ({
  onChangeEmpresa,
}) => {
  const [showModal, setShowModal] = React.useState(false);
  const ref = React.useRef(null);
  const [Empresas, setEmpresas] = React.useState([]);
  return (
    <Box>
      <Button>
        <ButtonText>Seleccionar Empresa</ButtonText>
      </Button>
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        finalFocusRef={ref}
      >
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="lg">Engage with Modals</Heading>
            <ModalCloseButton>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <Text>
              Elevate user interactions with our versatile modals. Seamlessly
              integrate notifications, forms, and media displays. Make an impact
              effortlessly.
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="outline"
              size="sm"
              action="secondary"
              mr="$3"
              onPress={() => {
                setShowModal(false);
              }}
            >
              <ButtonText>Cancel</ButtonText>
            </Button>
            <Button
              size="sm"
              action="positive"
              borderWidth="$0"
              onPress={() => {
                setShowModal(false);
              }}
            >
              <ButtonText>Explore</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
export default ModalSelectEmpresa;
