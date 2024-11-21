import LoadingScreen from '@/components/LoadingScreen';
import { Cliente, ClienteFlatList, ClienteSelectFlatList } from '@/types/screens/cliente';
import {
  Box,
  Button,
  ButtonIcon,
  ButtonText,
  Card,
  CheckIcon,
  FlatList,
  Heading,
  HStack,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import React from 'react';
import { Alert, ListRenderItem } from 'react-native';
import { ISlectClienteProps } from './interfaces';
import { ClienteService } from '@/classes/cliente/cliente.service';
import { useSQLiteContext } from 'expo-sqlite';
import { IClienteSelectCliente, IClienteSimpleRequest } from '@/classes/cliente/interfaces';
import { mask } from '@/utils/mask';

const SelectCliente: React.FC<ISlectClienteProps> = ({ navigation, route }) => {
  if (!route || !route.params || !route.params.screen) {
    navigation?.goBack();
    return null;
  }
  if(typeof route.params.id_cliente === 'undefined'){
    navigation?.goBack();
    return null;
  }
  const screen = route.params.screen;
  const id_cliente = route.params.id_cliente;
  const [isLaoding, setIsLoading] = React.useState(true);
  const [clientes, setClientes] = React.useState<Array<IClienteSelectCliente>>([]);
  const [cliente, setCliente] = React.useState<IClienteSelectCliente>({
    id: id_cliente,
    nome: '',
    cpf: '',
    data_nascimento: '',
  });
  const db = useSQLiteContext();

  const FlatListCliente = FlatList as ClienteSelectFlatList;

  React.useEffect(() => {
    async function StartScreen() {
      try {
        const clis = await new ClienteService(db).findAllClienteSelectCliente();
        setClientes([...clis]);
        setIsLoading(false);
      } catch (error) {
        Alert.alert('Erro', (error as Error).message);
        navigation?.goBack();
      }
    }
    StartScreen();
  }, []);

  const ListRenderCliente: ListRenderItem<IClienteSelectCliente> = ({ item, index }) => {
    return (
      <Card mt={index === 0 ? '$5' : '$2.5'} mb="$2.5" mx="$5">
        <HStack justifyContent="space-between">
          <VStack w="$2/4">
            <Box>
              <Heading>{item.nome}</Heading>
            </Box>
            <Box>
              <Text>{mask(item.cpf, 'cpf')}</Text>
            </Box>
            <Box>
              <Text>{new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(item.data_nascimento))}</Text>
            </Box>
          </VStack>
          <VStack w="$1/3">
            <Button
              isDisabled={item.id === cliente.id}
              onPress={() => {
                setCliente(item);
              }}
            >
              <ButtonText>
                {item.id === cliente.id ? 'Selecionado' : 'Selecionar'}
              </ButtonText>
              {item.id === cliente.id && <ButtonIcon as={CheckIcon} />}
            </Button>
          </VStack>
        </HStack>
      </Card>
    );
  };

  if (isLaoding) {
    return <LoadingScreen />;
  }

  return (
    <Box h="$full" w="$full">
      <Box my="$8">
        <Heading textAlign="center" size="xl">
          Selecionar cliente:
        </Heading>
      </Box>
      <FlatListCliente data={clientes} renderItem={ListRenderCliente} />
      <Box mx="$5" my="$5">
        <Button onPress={() => navigation?.navigate(screen, { id_cliente: cliente.id })}>
          <ButtonText>Selecionar Cliente</ButtonText>
        </Button>
      </Box>
    </Box>
  );
};

export default SelectCliente;
