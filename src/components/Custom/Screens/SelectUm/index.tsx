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
} from '@gluestack-ui/themed';
import React from 'react';
import { Alert, ListRenderItem } from 'react-native';
import { ISelectUmProps } from './interfaces';
import { Um, UmFlatList } from '@/types/screens/um';
import { Text } from '@gluestack-ui/themed';
import { UmUpdate } from '@/classes/um/interfaces';
import UmService from '@/classes/um/um.service';
import { useSQLiteContext } from 'expo-sqlite';

const SelectUm: React.FC<ISelectUmProps> = ({ navigation, route }) => {
  if (!route || !route.params || !route.params.screen || !route.params.umSelecionada) {
    navigation?.goBack();
    return null;
  }
  const screen = route.params.screen;
  const um_selecionada = oute.params.umSelecionada;
  const db = useSQLiteContext();
  const [ums, setUms] = React.useState<Array<UmUpdate>>([]);
  const [um, setUm] = React.useState<UmUpdate>(um_selecionada);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function startScreen() {
      try {
        const Ums = await new UmService(db).getAll();
        setUms([...Ums]);
        setIsLoading(false);
      } catch (error) {
        Alert.alert('Erro', 'Erro: ' + (error as Error).message);
        navigation?.goBack();
        setIsLoading(false);
        throw error;
      }
    }
    startScreen();
  }, []);

  const FlatListUms = FlatList as UmFlatList;

  const ListRenderUms: ListRenderItem<UmUpdate> = ({ item }) => {
    return (
      <Card my="$2.5">
        <HStack justifyContent="space-between">
          <VStack>
            <Box>
              <Heading>{item.nome}</Heading>
            </Box>
            <Box>
              <Text>{item.valor}</Text>
            </Box>
          </VStack>
          <VStack>
            <Button isDisabled={item.id === um.id} onPress={() => setUm(item)}>
              <ButtonText>
                {item.id === um.id ? 'selcionado' : 'selecionar'}
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
      <Box my="$5">
        <Heading size="2xl" textAlign="center">
          Selecionar Unidade de Medida:
        </Heading>
      </Box>

      <FlatListUms
        px="$5"
        data={ums}
        renderItem={ListRenderUms}
        keyExtractor={(item) => String(item.id)}
      />
      <Box my="$2.5" mx="$2.5">
        <Button onPress={() => navigation?.navigate(screen, { um })}>
          <ButtonText>Selecionar Um</ButtonText>
        </Button>
      </Box>
    </Box>
  );
};

export default SelectUm;
