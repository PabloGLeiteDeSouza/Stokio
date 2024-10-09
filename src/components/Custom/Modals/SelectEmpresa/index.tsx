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
import { Alert, ListRenderItem, TouchableHighlight } from 'react-native';
import { Empresa } from '@/types/screens/empresa';
import { Card } from '@gluestack-ui/themed';
import { CheckIcon } from '@gluestack-ui/themed';
import { CheckboxIcon } from '@gluestack-ui/themed';
import { ButtonSpinner } from '@gluestack-ui/themed';
import ItemListEmpresas from './ItemListEmpresas';

const ModalSelectEmpresa: React.FC<IModalSelectEmpresaProps> = ({
  onChangeEmpresa,
}) => {
  const [showModal, setShowModal] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const ref = React.useRef(null);
  const [Empresas, setEmpresas] = React.useState<Array<Empresa>>([
    {
      id: 1,
      nome_fantasia: 'Empresa 1',
      razao_social: 'Empresa 1',
      cnpj: '12345678901234',
      cpf: '43857395034',
    },
    {
      id: 2,
      nome_fantasia: 'Empresa 2',
      razao_social: 'Empresa 2',
      cnpj: '98765434567898',
      cpf: '452617832193',
    },
  ]);
  const [selectedEmpresa, setSelectedEmpresa] = React.useState<Empresa>({
    id: 0,
    cpf: '',
    cnpj: '',
    nome_fantasia: '',
    razao_social: '',
  });
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
      <ItemListEmpresas
        item={item}
        onChangeItem={(item) => {
          setSelectedEmpresa(item);
        }}
        selectedEmpresa={selectedEmpresa}
      />
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
            <Box>
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
              <ButtonText>Cancelar</ButtonText>
            </Button>
            <Button
              size="sm"
              action="positive"
              borderWidth="$0"
              onPress={() => {
                onChangeEmpresa(selectedEmpresa);
                setShowModal(false);
              }}
            >
              <ButtonText>Confirmar</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
export default ModalSelectEmpresa;
