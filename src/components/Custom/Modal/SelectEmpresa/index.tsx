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
  FlatList,
  Checkbox,
  CheckboxIndicator,
  CheckboxLabel,
} from '@gluestack-ui/themed';

import { Box, Button, ButtonText } from '@gluestack-ui/themed';
import React from 'react';
import { IModalSelectEmpresaProps } from './interfaces';
import { ModalVendaFlatList } from './types';
import { Alert, ListRenderItem } from 'react-native';
import { Empresa } from '@/types/screens/empresa';
import { Card } from '@gluestack-ui/themed';
import { CheckIcon } from '@gluestack-ui/themed';
import { CheckboxIcon } from '@gluestack-ui/themed';

const ModalSelectEmpresa: React.FC<IModalSelectEmpresaProps> = ({
  onChangeEmpresa,
}) => {
  const [showModal, setShowModal] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const ref = React.useRef(null);
  const [Empresas, setEmpresas] = React.useState<Array<Empresa>>([]);
  const FlatListEmpresas = FlatList as ModalVendaFlatList;

  React.useEffect(() => {
    const loadEmpresas = async () => {
      try {
        setIsLoading(false);
      } catch (error) {
        Alert.alert('Erro', (error as Error).message);
        throw error;
      }
    };
    loadEmpresas();
  }, []);


  const ListRenderEmpresas: ListRenderItem<Empresa> = ({ item }) => {
    return (
      <Checkbox value={String(item.id)}>
        <CheckboxLabel>
          <Card>
            <HStack>
              <VStack>
                <CheckboxIndicator mr="$2">
                  <CheckboxIcon as={CheckIcon} />
                </CheckboxIndicator>
              </VStack>
            </HStack>
          </Card>
        </CheckboxLabel>
      </Checkbox>
    );
  };


  return (
    <Box>
      {isLoading && (
        <Button isDisabled={true} bg="$darkBlue600" p="$3">
          <ButtonSpinner mr="$1" />
          <ButtonText fontWeight="$medium" fontSize="$sm">
            Por Favor aguarde...
          </ButtonText>
      </Button>
      )}
      {!isLoading && (
        <Button onPress={() => setShowModal(true)}>
          <ButtonText>Seleccionar Empresa</ButtonText>
        </Button>
      )}
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
            <Heading size="lg">Selecione a Empresa:</Heading>
            <ModalCloseButton>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <Box gap="$8">
              <FlatListEmpresas
                data={Empresas}
                renderItem={ListRenderEmpresas}
                keyExtractor={(item) => String(item.id)}
              />
            </Box>
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
