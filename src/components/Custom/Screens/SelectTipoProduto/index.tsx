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
import { TipoProdutoFlatList } from '@/types/screens/tipo-produto';
import { useSQLiteContext } from 'expo-sqlite';
import TipoProdutoService from '@/classes/tipo_produto/tipo_produto.service';
import { TipoProduto } from '@/classes/produto/interfaces';

const SelectTipoProduto: React.FC<ISelectTipoProdutoProps> = ({
  navigation,
  route,
}) => {
  if (!route || !route.params || !route.params.screen) {
    navigation?.goBack();
    return null;
  }

  if (!route || !route.params || !route.params.screen || !route.params.tipoProdutoSelecionado) {
    navigation?.goBack();
    return null;
  }

  const screen = route.params.screen;
  const tp_prod = route.params.tipoProdutoSelecionado;
  const [tipoProdutos, setTipoProdutos] = React.useState<Array<TipoProduto>>([]);
  const [tipo_produto, setTipoProduto] = React.useState<TipoProduto>(tp_prod);
  const [isLoading, setIsLoading] = React.useState(true);
  const db = useSQLiteContext();

  React.useEffect(() => {
    async function startScreen() {
      try {
        const data = await new TipoProdutoService(db).getAll();
        setTipoProdutos(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        throw error;
      }
    }
    startScreen();
  }, []);

  const FlatListTipoProdutos = FlatList as TipoProdutoFlatList;

  const ListRenderTipoProdutos: ListRenderItem<TipoProduto> = ({ item, index }) => {
    return (
      <Card mt={index === 0 ? "$5" : "$2.5"} mb={index === (tipoProdutos.length - 1) ? "$5" : "$2.5"}>
        <HStack w="$full" justifyContent="space-between">
          <VStack w="$3/5">
            <Box>
              <Heading>{item.nome}</Heading>
            </Box>
          </VStack>
          <VStack w="$1/3">
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
      <Box py="$5">
        <Heading size="2xl" textAlign="center">
          Selecionar Tipo de Produto:
        </Heading>
      </Box>
      <FlatListTipoProdutos
        px="$5"
        data={tipoProdutos}
        renderItem={ListRenderTipoProdutos}
        keyExtractor={(item) => String(item.id)}
      />
      <Box px="$5" py="$5">
        <Button onPress={() => navigation?.navigate(screen, { tipo_produto })}>
          <ButtonText>Selecionar Tipo de Produto</ButtonText>
        </Button>
      </Box>
    </Box>
  );
};

export default SelectTipoProduto;
