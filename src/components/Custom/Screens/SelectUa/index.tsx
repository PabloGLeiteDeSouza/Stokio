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
import { ISelectUaProps } from './interfaces';
import { Ua, UaFlatList } from '@/types/screens/ua';
import { useSQLiteContext } from 'expo-sqlite';
import UaService from '@/classes/ua/ua.service';

const SelectUa: React.FC<ISelectUaProps> = ({ navigation, route }) => {
  if (!route || !route.params || !route.params.screen || !route.params.uaSelecionada) {
    navigation?.goBack();
    return null;
  }
  const screen = route.params.screen;
  const selectedUa = route.params.uaSelecionada;
  const [uas, setUas] = React.useState<Array<Ua>>([]);
  const [ua, setUa] = React.useState<Ua>(selectedUa);
  const [isLoading, setIsLoading] = React.useState(true);
  const db = useSQLiteContext();

  React.useEffect(() => {
    async function startScreen() {
      try {
        const data = await new UaService(db).findAll();
        setUas([...data]);
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
        <HStack gap="$2.5">
          <VStack w="$3/5">
            <Box>
              <Heading>{item.nome}</Heading>
            </Box>
            <Box>
              <Text>{item.tipo}</Text>
            </Box>
          </VStack>
          <VStack w="$1/3">
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
      <Box py="$5">
        <Heading size="2xl" textAlign="center">
          Selecionar Unidade de Armazenamento:
        </Heading>
      </Box>
      <FlatListUas
        px="$5"
        data={uas}
        renderItem={ListRenderUas}
        keyExtractor={(item) => String(item.id)}
      />
      <Box px="$5" py="$5">
        <Button onPress={() => navigation?.navigate(screen, { ua })}>
          <ButtonText>Selecionar Ua</ButtonText>
        </Button>
      </Box>
    </Box>
  );
};

export default SelectUa;
