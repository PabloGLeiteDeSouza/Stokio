import LoadingScreen from '@/components/LoadingScreen';
import {
  Box,
  Button,
  ButtonText,
  Card,
  FlatList,
  Heading,
  HStack,
  VStack,
  Text,
} from '@gluestack-ui/themed';
import React from 'react';
import { ListRenderItem } from 'react-native';
import { ISelectTipoUaProps } from './interfaces';
import { Ua, UaFlatList } from '@/types/screens/ua';

const SelectTipoUA: React.FC<ISelectTipoUaProps> = ({ navigation, route }) => {
  if (!route || !route.params || !route.params.screen) {
    navigation?.goBack();
    return null;
  }
  const screen = route.params.screen;
  const [uas, setUas] = React.useState<Array<Ua>>([
    {
      id: 1,
      nome: 'João',
      tipo: 'teste',
    },
    {
      id: 2,
      nome: 'Maria',
      tipo: 'teste1',
    },
  ]);
  const [ua, setUa] = React.useState<Ua>(uas[0]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function startScreen() {
      try {
        setUas([
          ...uas,
          {
            id: 3,
            nome: 'Pedro',
            tipo: 'teste2',
          },
        ]);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        throw error;
      }
    }
    startScreen();
  }, []);

  const FlatListUas = FlatList as UaFlatList;

  const ListRenderUas: ListRenderItem<Ua> = ({ item }) => {
    return (
      <Card>
        <HStack>
          <VStack>
            <Box>
              <Heading>{item.nome}</Heading>
            </Box>
            <Box>
              <Text>{item.tipo}</Text>
            </Box>
          </VStack>
          <VStack>
            <Button isDisabled={item.id === ua.id} onPress={() => setUa(item)}>
              <ButtonText>
                {item.id === ua.id ? 'selcionado' : 'selecionar'}
              </ButtonText>
            </Button>
          </VStack>
        </HStack>
      </Card>
    );
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Box h="$full" w="$full">
      <Box>
        <Heading size="2xl" textAlign="center">
          Selecionar Unidade de Armazenamento:
        </Heading>
      </Box>
      <Box>
        <FlatListUas
          data={uas}
          renderItem={ListRenderUas}
          keyExtractor={(item) => String(item.id)}
        />
        <Box>
          <Button onPress={() => navigation?.navigate(screen, { ua })}>
            <ButtonText>Selecionar Ua</ButtonText>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SelectUa;
