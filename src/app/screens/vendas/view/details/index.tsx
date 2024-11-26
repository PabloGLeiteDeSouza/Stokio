import { VendaDetails } from '@/classes/venda/interfaces';
import VendaService from '@/classes/venda/venda.service';
import { DetalhesVendaScreen } from '@/interfaces/venda';
import { mask } from '@/utils/mask';
import {
  Box,
  Button,
  ButtonText,
  Heading,
  ScrollView,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import { useIsFocused } from '@react-navigation/native';
import { useSQLiteContext } from 'expo-sqlite';
import React from 'react';

const Details: React.FC<DetalhesVendaScreen> = ({ navigation, route }) => {
  if(!route || !route.params || !route.params.id){
    navigation?.goBack();
    return null;
  }
  const id = route.params.id;
  const [venda, setVenda] = React.useState<VendaDetails>({});
  const db = useSQLiteContext();
  const isFocused = useIsFocused();

  const start = React.useCallback(async () => {
    try {
      const venda = await new VendaService(db).findByIdDetails(id);
      setVenda(venda);
    } catch (error) {
      throw error;
    }
  }, [])

  React.useEffect(() => {
    if (isFocused) {
      start();
    }
  }, [isFocused])

  return (
    <Box h="$full" w="$full">
      <ScrollView mx="$1">
        <VStack space="3xl" p="$8" gap="$5">
          <Box>
            <Heading textAlign="center" size="xl">Informações da Venda</Heading>
          </Box>
          <Box gap="$8">
            <Box>
              <Heading>Nome do cliente:</Heading>
              <Text>{venda.cliente.nome}</Text>
            </Box>
            <Box>
              <Heading>Cpf:</Heading>
              <Text>{mask(venda.cliente.cpf, 'cpf')}</Text>
            </Box>
            <Box>
              <Heading>Data de nascimento:</Heading>
              <Text>{new Intl.DateTimeFormat('pt-BR', { day: "2-digit", month: "2-digit", year: "numeric" }).format(venda.cliente.data_nascimento)}</Text>
            </Box>
            <Box gap="$5">
              <Heading>Produtos</Heading>
              {venda.itens_de_venda.map((itv, i) => {
                return (
                  <Box key={`itens-de-venda-${i}`} gap="$5">
                    <Box>
                      <Heading>Nome:</Heading>
                      <Text>{itv.nome}</Text>
                    </Box>
                    <Box>
                      <Heading>Marca:</Heading>
                      <Text>{itv.marca}</Text>
                    </Box>
                    <Box>
                      <Heading>Tipo:</Heading>
                      <Text>{itv.tipo}</Text>
                    </Box>
                    <Box>
                      <Heading>Quantidade:</Heading>
                      <Text>{itv.quantidade}</Text>
                    </Box>
                    <Box>
                      <Heading>Preço:</Heading>
                      <Text>{mask(itv.valor_unitario.toString(), 'money')}</Text>
                    </Box>
                  </Box>
                )
              })}
            </Box>
            <Box>
              <Heading>Valor da Venda:</Heading>
              <Text>{mask(venda.itens_de_venda.map(({ quantidade, valor_unitario }) => quantidade * valor_unitario).reduce((p, c) => p + c, 0).toString(), 'money')}</Text>
            </Box>
            <Box>
              <Heading>Data da Venda:</Heading>
              <Text>{new Intl.DateTimeFormat('pt-BR', { day: "2-digit", month: "2-digit", year: "numeric" }).format(venda.data)}</Text>
            </Box>
            <Box>
              <Heading>Status</Heading>
              <Text color={venda.status === "pago" ? "$green600" : "$red600"} >{venda.status}</Text>
            </Box>
            <Box gap="$5">
              <Button
                onPress={() =>
                  navigation?.navigate('atualizar-venda', { id: 1 })
                }
              >
                <ButtonText>Editar</ButtonText>
              </Button>
              <Button action="negative">
                <ButtonText>Excluir</ButtonText>
              </Button>
            </Box>
          </Box>
        </VStack>
      </ScrollView>
    </Box>
  );
};

export default Details;
