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
import { ISelectRamoProps } from './interfaces';
import { Ramo, RamoFlatList } from '@/types/screens/ramo';

const SelectRamo: React.FC<ISelectRamoProps> = ({ navigation, route }) => {
  if (!route || !route.params || !route.params.screen) {
    navigation?.goBack();
    return null;
  }
  const screen = route.params.screen;
  const [ramos, setRamos] = React.useState<Array<Ramo>>([
    {
      id: 1,
      nome: 'João',
    },
    {
      id: 2,
      nome: 'Maria',
    },
  ]);
  const [ramo, setRamo] = React.useState<Ramo>(ramos[0]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function startScreen() {
      try {
        setRamos([
          ...ramos,
          {
            id: 3,
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

  const FlatListRamos = FlatList as RamoFlatList;

  const ListRenderRamos: ListRenderItem<Ramo> = ({ item }) => {
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
              isDisabled={item.id === ramo.id}
              onPress={() => setRamo(item)}
            >
              <ButtonText>
                {item.id === ramo.id ? 'selcionado' : 'selecionar'}
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
          Selecionar Ramo:
        </Heading>
      </Box>
      <Box>
        <FlatListRamos
          data={ramos}
          renderItem={ListRenderRamos}
          keyExtractor={(item) => String(item.id)}
        />
        <Box>
          <Button onPress={() => navigation?.navigate(screen, { ramo })}>
            <ButtonText>Selecionar Ramo</ButtonText>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SelectRamo;
