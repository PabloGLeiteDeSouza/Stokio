import { ProdutoService } from '@/classes/produto/produto.service';
import LoadingScreen from '@/components/LoadingScreen';
import {
  DetalhesEmpresaScreen,
  DetalhesProdutoScreen,
} from '@/interfaces/produto';
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
  const [produto, setProduto] = React.useState({});
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
              <Text>Velho</Text>
            </Box>
            <Box gap="$1.5">
              <Heading>cnpj:</Heading>
              <Text>123456789</Text>
            </Box>
            <Box>
              <Heading>Codigo de barras:</Heading>
              <Text>12345678901234</Text>
            </Box>
            <Box>
              <Heading>Data de Validade:</Heading>
              <Text>12/02/2026</Text>
            </Box>
            <Box>
              <Heading>Tipo:</Heading>
              <Text>João</Text>
            </Box>
            <Box>
              <Heading>Marca:</Heading>
              <Text>João</Text>
            </Box>
            <Box gap="$1.5">
              <Heading>Valor:</Heading>
              <Text>22,50</Text>
            </Box>
            <Box gap="$1.5">
              <Heading>Tamanho:</Heading>
              <Text>20g</Text>
            </Box>
            <Box>
              <Heading>Qauntidade:</Heading>
              <Text>50</Text>
            </Box>
            <Box>
              <Heading>Unidade de armazenamento</Heading>
              <Text>Caixa 05</Text>
            </Box>
            <Box>
              <Heading>Tipo de Unidade de armazenamento:</Heading>
              <Text>Caixa</Text>
            </Box>
            <Box gap="$5">
              <Button
                onPress={() =>
                  navigation?.navigate('atualizar-produto', { id: '1' })
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
