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
import { ISelectProdutoProps } from './interfaces';
import { Produto, ProdutoFlatList, ProdutoSelectFlatList } from '@/types/screens/produto';
import { Text } from '@gluestack-ui/themed';
import { getDateFromString, getStringFromDate } from '@/utils';
import { useSQLiteContext } from 'expo-sqlite';
import { ProdutoService } from '@/classes/produto/produto.service';
import { ProdutoVendaRequest } from '@/classes/produto/interfaces';

const SelectProduto: React.FC<ISelectProdutoProps> = ({
  navigation,
  route,
}) => {
  if (!route || !route.params || !route.params.screen || !route.params.type || !route.params.selectedsProdutos) {
    navigation?.goBack();
    return null;
  }
  if (route.params.type === 'update' && typeof route?.params?.indexUpdated === 'undefined') {
    Alert.alert('Aviso', 'informe o identificador para alterar!');
    navigation?.goBack();
    return null;
  }
  const selectedProducts = route.params.selectedsProdutos;
  const screen = route.params.screen;
  const indexUpdated = route.params.indexUpdated
    ? route.params.indexUpdated
    : 0;
  const type = route.params.type;
  const [produtos, setProdutos] = React.useState<Array<ProdutoVendaRequest>>([]);
  const [produto, setProduto] = React.useState<ProdutoVendaRequest>({
    id: 0,
    codigo_de_barras: '',
    nome: '',
    data_validade: '',
    marca: '',
    tipo: '',
    empresa: '',
    valor_unitario: 0,
    quantidade: 0,
  });
  const [isLoading, setIsLoading] = React.useState(true);
  const db = useSQLiteContext();

  React.useEffect(() => {
    async function startScreen() {
      try {
        if (screen === "cadastrar-venda") {
          const prods = await new ProdutoService(db).getProdutoBySelectProdutoToVenda();
          setProdutos([...prods]);
        } else {
          const prods = await new ProdutoService(db).getProdutoBySelectProdutoToCompra();
          setProdutos([...prods]);
        }
        setIsLoading(false);
      } catch (error) {
        Alert.alert('Erro', (error as Error).message);
        navigation?.goBack()
        setIsLoading(false);
        throw error;
      }
    }
    startScreen();
  }, []);

  const FlatListProdutos = FlatList as ProdutoSelectFlatList;

  const ListRenderProdutos: ListRenderItem<ProdutoVendaRequest> = ({ item }) => {
    return (
      <Card my="$5" mx="$5">
        <HStack justifyContent="space-between">
          <VStack w="$3/6" gap="$2.5">
            <Box>
              <Heading>{item.nome}</Heading>
            </Box>
            <Box>
              <Heading>Codigo de Barras</Heading>
              <Text>{item.codigo_de_barras}</Text>
            </Box>
            <Box>
              <Heading>Data de Validade</Heading>
              <Text>
                {new Date(item.data_validade).toLocaleDateString('PT-BR')}
              </Text>
            </Box>
            <Box>
              <Heading>Empresa</Heading>
              <Text>{item.empresa}</Text>
            </Box>
            <Box>
              <Heading>Marca</Heading>
              <Text>{item.marca}</Text>
            </Box>
            <Box>
              <Heading>Tipo de Produto</Heading>
              <Text>{item.tipo}</Text>
            </Box>
            <Box>
              <Heading>Empresa</Heading>
              <Text>{item.empresa}</Text>
            </Box>
            <Box>
              <Heading>Quantidade Disponivel</Heading>
              <Text>{item.quantidade}</Text>
            </Box>
            <Box>
              <Heading>Valor unitario</Heading>
              <Text>R$ {item.valor_unitario}</Text>
            </Box>
          </VStack>
          <VStack w="$2/6">
            <Button
              isDisabled={
                selectedProducts.find((prod) => prod.id_produto === item.id)
                  ? true
                  : item.id === produto.id
              }
              onPress={() => {
                setProduto(item);
              }}
            >
              <ButtonText>
                {selectedProducts.find((prod) => prod.id_produto === item.id)
                  ? 'Ja usado'
                  : item.id === produto.id
                    ? 'Selecionado'
                    : 'Selecionar'}
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
      <Box my="$2.5">
        <Heading size="2xl" textAlign="center">
          Selecionar Produto:
        </Heading>
      </Box>
      <FlatListProdutos
        data={produtos}
        renderItem={ListRenderProdutos}
        keyExtractor={(item) => String(item.id)}
      />
      <Box my="$5">
        <Button
          onPress={() =>
            navigation?.navigate(screen, {
              id_produto: produto.id,
              indexUpdated,
              type,
            })
          }
        >
          <ButtonText>Selecionar Produto</ButtonText>
        </Button>
      </Box>
    </Box>
  );
};

export default SelectProduto;
