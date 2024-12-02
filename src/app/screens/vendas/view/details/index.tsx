import { VendaDetails } from '@/classes/venda/interfaces';
import VendaService from '@/classes/venda/venda.service';
import LoadingScreen from '@/components/LoadingScreen';
import { DetalhesVendaScreen } from '@/interfaces/venda';
import { mask } from '@/utils/mask';
import {
  Box,
  Button,
  ButtonText,
  EditIcon,
  Heading,
  ScrollView,
  Text,
  VStack,
  ButtonIcon,
  TrashIcon
} from '@gluestack-ui/themed';
import { useIsFocused } from '@react-navigation/native';
import { useSQLiteContext } from 'expo-sqlite';
import React from 'react';
import delete_venda from './delete_venda';

const Details: React.FC<DetalhesVendaScreen> = ({ navigation, route }) => {
  if(!route || !route.params || !route.params.id){
    navigation?.goBack();
    return null;
  }
  const id = route.params.id;
  const [venda, setVenda] = React.useState<VendaDetails>({});
  const [isLoading, setIsLoading] = React.useState(true);
  const db = useSQLiteContext();
  const isFocused = useIsFocused();

  const start = React.useCallback(async () => {
    try {
      if (!isLoading) {
        setIsLoading(true)
        const venda = await new VendaService(db).findByIdDetails(id);
        setVenda(venda);
        setIsLoading(false);
      } else {
        const venda = await new VendaService(db).findByIdDetails(id);
        setVenda(venda);
        setIsLoading(false);
      }
    } catch (error) {
      throw error;
    }
  }, [isLoading])

  React.useEffect(() => {
    if (isFocused) {
      start();
    }
  }, [isFocused])

  if (isLoading) {
    return <LoadingScreen />
  }

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
                gap="$3"
                onPress={() =>
                  navigation?.navigate('atualizar-venda', { id: venda.id })
                }
              >
                <ButtonIcon as={EditIcon} />
                <ButtonText>Editar</ButtonText>
              </Button>
              <Button onPress={async () => delete_venda(venda.id, db, () => { navigation?.navigate('visualizar-vendas') })} gap="$3" action="negative">
                <ButtonIcon as={TrashIcon} />
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
