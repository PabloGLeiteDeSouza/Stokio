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
import { ISelectProdutoProps } from './interfaces';
import { Produto, ProdutoFlatList } from '@/types/screens/produto';
import { Text } from '@gluestack-ui/themed';

const SelectProduto: React.FC<ISelectProdutoProps> = ({
  navigation,
  route,
}) => {
  if (!route || !route.params || !route.params.screen || !route.params.type) {
    navigation?.goBack();
    return null;
  }

  const selectedProducts = route.params.selectedsProdutos
    ? route.params.selectedsProdutos
    : [
        {
          id: '',
        },
      ];
  const screen = route.params.screen;
  const indexUpdated = route.params.indexUpdated
    ? route.params.indexUpdated
    : 0;
  const type = route.params.type;
  const [produtos, setProdutos] = React.useState<Array<Produto>>([
    {
      id: '1',
      codigo_de_barras: '7324623784632324',
      nome: 'KAIAK AVENTURA DESODORANTE COLONIA',
      data_validade: '10-25-2026',
      marca: 'KAIAK',
      tipo: 'DESODORANTE COLONIA',
      empresa: 'NATURA',
      valor: '5.00',
      quantidade: '15',
    },
    {
      id: '2',
      codigo_de_barras: '3459765398563487',
      nome: 'MEU PRIMEIRO HUMOR DESODORANTE COLONIA',
      data_validade: '08-17-2025',
      marca: 'HUMOR',
      tipo: 'DESODORANTE COLONIA',
      empresa: 'NATURA',
      valor: '10.00',
      quantidade: '25',
    },
    {
      id: '3',
      codigo_de_barras: '2345320958347982456',
      nome: `KAIAK DESODORANTE ROLL'ON`,
      data_validade: '11-09-2026',
      empresa: 'NATURA',
      marca: 'KAIAK',
      tipo: `DESODORANTE ROLL'ON`,
      valor: '12.99',
      quantidade: '50',
    },
  ]);
  const [produto, setProduto] = React.useState<Produto>({
    id: '',
    codigo_de_barras: '',
    nome: '',
    data_validade: '',
    marca: '',
    tipo: '',
    empresa: '',
    valor: '',
    quantidade: '',
  });
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function startScreen() {
      try {
        setProdutos([...produtos]);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        throw error;
      }
    }
    startScreen();
  }, []);

  const FlatListProdutos = FlatList as ProdutoFlatList;

  const ListRenderProdutos: ListRenderItem<Produto> = ({ item }) => {
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
              <Heading>Quantidade</Heading>
              <Text>{item.quantidade}</Text>
            </Box>
            <Box>
              <Heading>Valor</Heading>
              <Text>R$ {item.valor}</Text>
            </Box>
          </VStack>
          <VStack w="$2/6">
            <Button
              isDisabled={
                selectedProducts.find((prod) => prod.id === item.id)
                  ? true
                  : item.id === produto.id
              }
              onPress={() => {
                setProduto(item);
              }}
            >
              <ButtonText>
                {selectedProducts.find((prod) => prod.id === item.id)
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
              produto,
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
