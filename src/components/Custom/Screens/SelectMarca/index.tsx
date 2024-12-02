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
import { ListRenderItem } from 'react-native';
import { ISelectMarcaProps } from './interfaces';
import { Marca, MarcaFlatList } from '@/types/screens/marca';
import { useSQLiteContext } from 'expo-sqlite';
import MarcaService from '@/classes/marca/marca.service';

const SelectMarca: React.FC<ISelectMarcaProps> = ({ navigation, route }) => {
  if (!route || !route.params || !route.params.screen || !route.params.marcaSelecionada) {
    navigation?.goBack();
    return null;
  }
  const screen = route.params.screen;
  const mrc = route.params.marcaSelecionada;
  const [marcas, setMarcas] = React.useState<Array<Marca>>([]);
  const [marca, setMarca] = React.useState<Marca>(mrc);
  const [isLoading, setIsLoading] = React.useState(true);
  const db = useSQLiteContext();

  React.useEffect(() => {
    async function startScreen() {
      try {
        const marcas = await new MarcaService(db).getAll();
        setMarcas([
          ...marcas,
        ]);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        throw error;
      }
    }
    startScreen();
  }, []);

  const FlatListMarcas = FlatList as MarcaFlatList;

  const ListRenderMarcas: ListRenderItem<Marca> = ({ item, index }) => {
    return (
      <Card mt={ index === 0 ? "$5" : "$2.5"} mb={index === (marcas.length - 1) ? "$5" : "$2.5"}>
        <HStack w="$full" justifyContent='space-between'>
          <VStack w="$3/5">
            <Box>
              <Heading>{item.nome}</Heading>
            </Box>
          </VStack>
          <VStack w="$1/3">
            <Button
              isDisabled={item.id === marca.id}
              onPress={() => setMarca(item)}
            >
              <ButtonText>
                {item.id === marca.id ? 'selcionado' : 'selecionar'}
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
      <Box mt="$4">
        <Heading size="2xl" textAlign="center">
          Selecionar Marca:
        </Heading>
      </Box>
      <FlatListMarcas
        mt='$8'
        mx="$8"
        data={marcas}
        renderItem={ListRenderMarcas}
        keyExtractor={(item) => String(item.id)}
      />
      <Box my="$5" mx="$8">
        <Button onPress={() => navigation?.navigate(screen, { marca })}>
          <ButtonText>Selecionar Marca</ButtonText>
        </Button>
      </Box>
    </Box>
  );
};

export default SelectMarca;
