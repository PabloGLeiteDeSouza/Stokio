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
  ButtonSpinner,
  FlatList,
  Card,
  Checkbox,
} from '@gluestack-ui/themed';

import { Box, Button, ButtonText } from '@gluestack-ui/themed';
import React from 'react';
import { IModalSelectClienteProps } from './interfaces';
import { useFocusEffect } from '@react-navigation/native';
import { Alert } from 'react-native';
import { CheckIcon } from '@gluestack-ui/themed';
import { CheckboxIndicator } from '@gluestack-ui/themed';
import { CheckboxIcon } from '@gluestack-ui/themed';
const ModalSelectCliente: React.FC<IModalSelectClienteProps> = ({
  onChangeCliente,
}) => {
  const [showModal, setShowModal] = React.useState(false);
  const ref = React.useRef(null);
  const [clientes, setClientes] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  async function start() {
    try {
      setIsLoading(true);

      setIsLoading(false);
    } catch (error) {
      Alert.alert('Erro', (error as Error).message);
      throw error;
    }
  }

  React.useEffect(() => {
    start();
  }, []);

  return (
    <Box>
      {isLoading && (
        <>
          <Button isDisabled={isLoading} bg="$darkBlue600" p="$3">
            <ButtonSpinner mr="$1" />
            <ButtonText fontWeight="$medium" fontSize="$sm">
              Por favor aguarde...
            </ButtonText>
          </Button>
        </>
      )}
      {!isLoading && (
        <>
          <Button onPress={() => setShowModal(true)}>
            <ButtonText>Seleccionar cliente</ButtonText>
          </Button>
        </>
      )}
      <Modal
        size="lg"
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        finalFocusRef={ref}
      >
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="lg">Selecione Um cliente</Heading>
            <ModalCloseButton>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <Card>
              <HStack>
                <VStack>
                  <Box></Box>
                </VStack>
              </HStack>
            </Card>
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
export default ModalSelectCliente;
