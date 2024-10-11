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
import { ISelectTipoProdutoProps } from './interfaces';
import { TipoProduto, TipoProdutoFlatList } from '@/types/screens/tipo-produto';

const SelectTipoProduto: React.FC<ISelectTipoProdutoProps> = ({
  navigation,
  route,
}) => {
  if (!route || !route.params || !route.params.screen) {
    navigation?.goBack();
    return null;
  }
  const screen = route.params.screen;
  const [tipoProdutos, setTipoProdutos] = React.useState<Array<TipoProduto>>([
    {
      id: 1,
      nome: 'João',
    },
    {
      id: 2,
      nome: 'Maria',
    },
  ]);
  const [tipo_produto, setTipoProduto] = React.useState<TipoProduto>(
    tipoProdutos[0],
  );
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function startScreen() {
      try {
        setTipoProdutos([
          ...tipoProdutos,
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

  const FlatListTipoProdutos = FlatList as TipoProdutoFlatList;

  const ListRenderTipoProdutos: ListRenderItem<TipoProduto> = ({ item }) => {
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
              isDisabled={item.id === tipo_produto.id}
              onPress={() => setTipoProduto(item)}
            >
              <ButtonText>
                {item.id === tipo_produto.id ? 'selcionado' : 'selecionar'}
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
          Selecionar Tipo de Produto:
        </Heading>
      </Box>
      <Box>
        <FlatListTipoProdutos
          data={tipoProdutos}
          renderItem={ListRenderTipoProdutos}
          keyExtractor={(item) => String(item.id)}
        />
        <Box>
          <Button
            onPress={() => navigation?.navigate(screen, { tipo_produto })}
          >
            <ButtonText>Selecionar Tipo de Produto</ButtonText>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SelectTipoProduto;
