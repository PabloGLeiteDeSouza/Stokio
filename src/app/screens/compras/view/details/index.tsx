import CompraService from "@/classes/compra/compra.service";
import LoadingScreen from "@/components/LoadingScreen";
import { AtualizarCompraScreen } from "@/interfaces/compra";
import { Button, ButtonText, Text } from "@gluestack-ui/themed";
import { Box, Heading, ScrollView } from "@gluestack-ui/themed";
import { useSQLiteContext } from "expo-sqlite";
import React from "react";

const Details: React.FC<AtualizarCompraScreen> = ({ navigation, route }) => {

  if (!route || !route.params || !route.params.id) {
    navigation?.goBack();
    return null;
  }

  const id = route?.params?.id;
  const db = useSQLiteContext();

  const [compra, setCompra] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(true);


  async function start() {
    try {
      // const venda = new CompraService(db).findById(id);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  }

  React.useEffect(() => {
    start();
  }, []);


  if (isLoading) {
    return <LoadingScreen/>;
  }

  return (
    <Box h="$full" w="$full">
      <ScrollView>
        <Box w="$full" px="$8" my="$5" gap="$5">
          <Heading size="xl" textAlign="center">Detailhes da Compra</Heading>
          <Box>
            <Heading size="sm">Data da Compra:</Heading>
            <Text>2022-01-01</Text>
          </Box>
          <Box>
            <Heading size="sm">Valor da Compra:</Heading>
            <Text>R$ 100,00</Text>
          </Box>
          <Box>
            <Heading textAlign="center" size="xl">Itens da Compra:</Heading>
            <Box gap="$5">
              <Box>
                <Heading size="lg">Nome:</Heading>
                <Text>Kaiak Aventura</Text>
              </Box>
              <Box>
                  <Heading>Empresa:</Heading>
                  <Text>Natura</Text>
              </Box>
              <Box>
                <Heading>Marca</Heading>
                <Text>Kaiak</Text>
              </Box>
              <Box>
                <Heading>Tipo</Heading>
                <Text>Desodorante Corporal</Text>
              </Box>
              <Box>
                <Heading>Conteudo</Heading>
                <Text>50 ml</Text>
              </Box>
              <Box>
                <Heading size="sm">Valor:</Heading>
                <Text>R$ 50,00</Text>
              </Box>
              <Box>
                <Heading size="sm">Quantidade:</Heading>
                <Text>1</Text>
              </Box>
            </Box>
          </Box>
          <Box my="$5" gap="$5">
            <Button onPress={() => navigation?.navigate('atualizar-compra', { id: 1 })}>
              <ButtonText>
                Atualizar
              </ButtonText>
            </Button>
            <Button action="negative">
              <ButtonText>
                Excluir
              </ButtonText>
            </Button>
          </Box>
        </Box>
      </ScrollView>
    </Box>
  );
};

export default Details;
