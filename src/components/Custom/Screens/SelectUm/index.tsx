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
import { ISelectUmProps } from './interfaces';
import { Um, UmFlatList } from '@/types/screens/um';

const SelectUm: React.FC<ISelectUmProps> = ({ navigation, route }) => {
  if (!route || !route.params || !route.params.screen) {
    navigation?.goBack();
    return null;
  }
  const screen = route.params.screen;
  const [ums, setUms] = React.useState<Array<Um>>([
    {
      id: 1,
      nome: 'João',
    },
    {
      id: 2,
      nome: 'Maria',
    },
  ]);
  const [um, setUm] = React.useState<Um>(ums[0]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function startScreen() {
      try {
        setUms([
          ...ums,
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

  const FlatListUms = FlatList as UmFlatList;

  const ListRenderUms: ListRenderItem<Um> = ({ item }) => {
    return (
      <Card>
        <HStack>
          <VStack>
            <Box>
              <Heading>{item.nome}</Heading>
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
      <Box>
        <Heading size="2xl" textAlign="center">
          Selecionar Unidade de Armazenamento:
        </Heading>
      </Box>
      <Box>
        <FlatListUms
          data={ums}
          renderItem={ListRenderUms}
          keyExtractor={(item) => String(item.id)}
        />
        <Box>
          <Button onPress={() => navigation?.navigate(screen, { um })}>
            <ButtonText>Selecionar Um</ButtonText>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SelectUm;
