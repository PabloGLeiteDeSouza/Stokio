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

const SelectMarca: React.FC<ISelectMarcaProps> = ({ navigation, route }) => {
  if (!route || !route.params || !route.params.screen) {
    navigation?.goBack();
    return null;
  }
  const screen = route.params.screen;
  const [ramos, setMarcas] = React.useState<Array<Marca>>([
    {
      id: '1',
      nome: 'João',
    },
    {
      id: '2',
      nome: 'Maria',
    },
  ]);
  const [marca, setMarca] = React.useState<Marca>(ramos[0]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function startScreen() {
      try {
        setMarcas([
          ...ramos,
          {
            id: '3',
            nome: 'Pedro',
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

  const FlatListMarcas = FlatList as MarcaFlatList;

  const ListRenderMarcas: ListRenderItem<Marca> = ({ item }) => {
    return (
      <Card>
        <HStack>
          <VStack>
            <Box>
              <Heading>{item.nome}</Heading>
            </Box>
          </VStack>
          <VStack>
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
      <Box>
        <Heading size="2xl" textAlign="center">
          Selecionar Marca:
        </Heading>
      </Box>
      <FlatListMarcas
        mx="$8"
        data={ramos}
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
