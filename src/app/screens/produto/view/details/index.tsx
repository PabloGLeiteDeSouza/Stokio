import { ProdutoObjectComplete } from '@/classes/produto/interfaces';
import { ProdutoService } from '@/classes/produto/produto.service';
import LoadingScreen from '@/components/LoadingScreen';
import {
  DetalhesProdutoScreen,
} from '@/interfaces/produto';
import { getDateFromString } from '@/utils';
import { mask } from '@/utils/mask';
import {
  Box,
  Button,
  ButtonText,
  Heading,
  ScrollView,
  Text,
} from '@gluestack-ui/themed';
import { useSQLiteContext } from 'expo-sqlite';
import React from 'react';
import { Alert } from 'react-native';

const Details: React.FC<DetalhesProdutoScreen> = ({ navigation, route }) => {
  if (!route || !route.params || !route.params.id) {
    navigation?.navigate('visualizar-produtos');
    return null;
  }
  const id = route.params.id;
  const [isLoading, setIsLoading] = React.useState(true);
  const [produto, setProduto] = React.useState<ProdutoObjectComplete>({});
  const db = useSQLiteContext();

  const StartScreen = async () => {
    try {
      const data = await new ProdutoService(db).getProdutoById(id);
      setProduto(data);
      setIsLoading(false);
    } catch (error) {
      Alert.alert("Erro", (error as Error).message);
      navigation?.goBack();
      setIsLoading(false);
    }
  }


  React.useEffect(() => {
    StartScreen()
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Box w="$full" h="$full">
      <ScrollView w="$full">
        <Box w="$full" gap="$5" px="$8" py="$5">
          <Box w="$full" alignItems="center">
            <Text size="3xl">Detalhes do Produto</Text>
          </Box>
          <Box gap="$5">
            <Box gap="$1.5">
              <Heading>Nome:</Heading>
              <Text>{produto.nome}</Text>
            </Box>
            <Box gap="$1.5">
              <Heading>Empresa:</Heading>
              <Box>
                <Heading>Nome fantasia</Heading>
                <Text>{produto.empresa.nome_fantasia}</Text>
              </Box>
              <Box>
                <Heading>Razão Social</Heading>
                <Text>{produto.empresa.razao_social}</Text>
              </Box>
            </Box>
            {produto.empresa.cnpj && (
                <>
                  <Box gap="$1.5">
                    <Heading>CNPJ:</Heading>
                    <Text>{mask(produto.empresa.cnpj, 'cnpj')}</Text>
                  </Box>
                </>
              )}
            <Box>
              <Heading>Codigo de barras:</Heading>
              <Text>{produto.codigo_de_barras}</Text>
            </Box>
            <Box>
              <Heading>Data de Validade:</Heading>
              <Text>{new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(getDateFromString(produto.data_de_validade))}</Text>
            </Box>
            <Box>
              <Heading>Tipo:</Heading>
              <Text>{produto.tipo_produto.nome}</Text>
            </Box>
            <Box>
              <Heading>Marca:</Heading>
              <Text>{produto.marca.nome}</Text>
            </Box>
            <Box gap="$1.5">
              <Heading>Valor:</Heading>
              <Text>{mask(`${produto.valor}`, 'money')}</Text>
            </Box>
            <Box gap="$1.5">
              <Heading>Tamanho:</Heading>
              <Text>{`${produto.tamanho}${produto.unidade_de_medida.valor}`}</Text>
            </Box>
            <Box>
              <Heading>Qauntidade:</Heading>
              <Text>{produto.quantidade}</Text>
            </Box>
            <Box>
              <Heading>Unidade de armazenamento</Heading>
              <Text>{produto.unidade_de_armazenamento.nome}</Text>
            </Box>
            <Box gap="$5">
              <Button
                onPress={() =>
                  navigation?.navigate('atualizar-produto', { id: produto.id })
                }
              >
                <ButtonText>Editar</ButtonText>
              </Button>
              <Button action="negative">
                <ButtonText>Excluir</ButtonText>
              </Button>
            </Box>
          </Box>
        </Box>
      </ScrollView>
    </Box>
  );
};

export default Details;
