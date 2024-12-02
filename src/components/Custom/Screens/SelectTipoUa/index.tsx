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
import { Alert, ListRenderItem } from 'react-native';
import { ISelectTipoUaProps } from './interfaces';
import { UaFlatList } from '@/types/screens/ua';
import { TipoUaUpdate } from '@/classes/tipo_ua/interfaces';
import { useSQLiteContext } from 'expo-sqlite';
import TipoUaService from '@/classes/tipo_ua/tipo_ua.service';
import { TipoUaFlatList } from '@/types/screens/tipo-ua';

const SelectTipoUA: React.FC<ISelectTipoUaProps> = ({ navigation, route }) => {
  if (!route || !route.params || !route.params.screen) {
    navigation?.goBack();
    return null;
  }
  const screen = route.params.screen;
  const tipoUa = route.params.tipo_ua;
  const [tiposUas, setTiposUas] = React.useState<TipoUaUpdate[]>([]);
  const [tipo_ua, set_tipo_ua] = React.useState<TipoUaUpdate>(tipoUa);
  const [isLoading, setIsLoading] = React.useState(true);
  const db = useSQLiteContext();

  async function startScreen() {
    try {
      const tiposUas = await new TipoUaService(db).getAll();
      setTiposUas([...tiposUas]);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      Alert.alert('Error', (error as Error).message);
      navigation?.goBack();
      throw error;
    }
  }
  React.useEffect(() => {
    startScreen();
  }, []);

  const FlatListTiposUas = FlatList as TipoUaFlatList;

  const ListRenderUas: ListRenderItem<TipoUaUpdate> = ({ item, index }) => {
    return (
      <Card mt={index === 0 ? "$5" : "$2.5"} mb={index === (tiposUas.length - 1) ? "$5" : "$2.5"}>
        <HStack justifyContent='space-between'>
          <VStack w="$2/3">
            <Box>
              <Heading>{item.nome}</Heading>
            </Box>
            <Box>
              <Text>{item.descricao}</Text>
            </Box>
          </VStack>
          <VStack w="$1/3">
            <Button 
              isDisabled={item.id === tipo_ua.id} 
              onPress={() => set_tipo_ua(item)}
            >
              <ButtonText>
                {item.id === tipo_ua.id ? 'selcionado' : 'selecionar'}
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
      <Box mt="$5">
        <Heading size="2xl" textAlign="center">
          Selecionar Tipo de Unidade de Armazenamento:
        </Heading>
      </Box>
      <Box mx="$5" gap="$5">
        <FlatListTiposUas
          data={tiposUas}
          renderItem={ListRenderUas}
          keyExtractor={(item) => String(item.id)}
        />
        <Box>
          <Button onPress={() => navigation?.navigate(screen, { tipo_ua })}>
            <ButtonText>Selecionar Tipo de Ua</ButtonText>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SelectTipoUA;
