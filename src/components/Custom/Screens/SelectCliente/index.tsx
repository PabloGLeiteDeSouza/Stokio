import LoadingScreen from '@/components/LoadingScreen';
import { Cliente, ClienteFlatList } from '@/types/screens/cliente';
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
import { ListRenderItem } from 'react-native';
import { ISlectClienteProps } from './interfaces';

const SelectCliente: React.FC<ISlectClienteProps> = ({ navigation, route }) => {
  if (!route || !route.params || !route.params.screen) {
    navigation?.goBack();
    return null;
  }
  const screen = route.params.screen;
  const [isLaoding, setIsLoading] = React.useState(true);
  const [clientes, setClientes] = React.useState<Array<Cliente>>([
    {
      id: 1,
      nome: '',
      cpf: '',
      data_nascimento: '',
    },
    {
      id: 2,
      nome: '',
      cpf: '',
      data_nascimento: '',
    },
  ]);
  const [cliente, setCliente] = React.useState<Cliente>(clientes[0]);

  const FlatListCliente = FlatList as ClienteFlatList;

  React.useEffect(() => {
    async function StartScreen() {
      try {
        setClientes([...clientes]);
        setIsLoading(false);
      } catch (error) {}
    }
    StartScreen();
  }, []);

  const ListRenderCliente: ListRenderItem<Cliente> = ({ item, index }) => {
    return (
      <>
        <Card>
          <HStack>
            <VStack>
              <Box>
                <Heading>{item.nome}</Heading>
              </Box>
              <Box>
                <Text>{item.cpf}</Text>
              </Box>
              <Box>
                <Text>{item.data_nascimento}</Text>
              </Box>
            </VStack>
            <VStack>
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
        {index === clientes.length - 1 && (
          <Box>
            <Button
              onPress={() => {
                navigation?.navigate(screen, { cliente });
              }}
            >
              <ButtonText>Selecionar Cliente</ButtonText>
            </Button>
          </Box>
        )}
      </>
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
      <Box>
        <FlatListCliente data={clientes} renderItem={ListRenderCliente} />
      </Box>
    </Box>
  );
};

export default SelectCliente;
