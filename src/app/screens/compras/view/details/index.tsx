import CompraService from "@/classes/compra/compra.service";
import { CompraObjectBaseToDetails, ItemDeCompraObjectBase } from "@/classes/compra/interfaces";
import LoadingScreen from "@/components/LoadingScreen";
import { AtualizarCompraScreen } from "@/interfaces/compra";
import { getDateFromString } from "@/utils";
import { sumAllValues } from "@/utils/calc";
import { mask } from "@/utils/mask";
import { Button, ButtonText, EditIcon, Text, TrashIcon } from "@gluestack-ui/themed";
import { ButtonIcon } from "@gluestack-ui/themed";
import { Box, Heading, ScrollView } from "@gluestack-ui/themed";
import { useSQLiteContext } from "expo-sqlite";
import React from "react";
import delete_compra from "./delete_compra";

const Details: React.FC<AtualizarCompraScreen> = ({ navigation, route }) => {

  if (!route || !route.params || !route.params.id) {
    navigation?.goBack();
    return null;
  }

  const id = route?.params?.id;
  const db = useSQLiteContext();

  const [compra, setCompra] = React.useState<CompraObjectBaseToDetails>({});
  const [isLoading, setIsLoading] = React.useState(true);


  async function start() {
    try {
      const compra = await new CompraService(db).findByIdToDetails(id);
      setCompra(compra)
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
            <Text>{new Intl.DateTimeFormat('pt-br', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(getDateFromString(compra.data))}</Text>
          </Box>
          <Box>
            <Heading size="sm">Valor da Compra:</Heading>
            <Text>{mask(sumAllValues(compra.itens_compra.map((i) => (i.valor_unitario * i.quantidade))).toString(), 'money')}</Text>
          </Box>
          <Box>
            <Heading textAlign="center" size="xl">Itens da Compra:</Heading>
            {compra.itens_compra.map((vl) => {
              return (
                <Box key={vl.id} gap="$5">
                  <Box>
                    <Heading size="lg">Nome:</Heading>
                    <Text>{vl.nome}</Text>
                  </Box>
                  <Box>
                      <Heading>Empresa:</Heading>
                      <Text>{vl.empresa}</Text>
                  </Box>
                  <Box>
                    <Heading>Marca</Heading>
                    <Text>{vl.marca}</Text>
                  </Box>
                  <Box>
                    <Heading>Tipo</Heading>
                    <Text>{vl.tipo}</Text>
                  </Box>
                  <Box>
                    <Heading>Conteudo</Heading>
                    <Text>{`${vl.tamanho} ${vl.medida}`}</Text>
                  </Box>
                  <Box>
                    <Heading size="sm">Valor Unitario:</Heading>
                    <Text>{mask(vl.valor_unitario.toString(), 'money')}</Text>
                  </Box>
                  <Box>
                    <Heading size="sm">Quantidade:</Heading>
                    <Text>{vl.quantidade}</Text>
                  </Box>
                  <Box>
                    <Heading size="sm">Valor Total do item:</Heading>
                    <Text>{mask((vl.valor_unitario * vl.quantidade).toString(), 'money')}</Text>
                  </Box>
                </Box>
              )
            })}
            
          </Box>
          <Box my="$5" gap="$5">
            <Button gap="$2.5" onPress={() => navigation?.navigate('atualizar-compra', { id: compra.id })}>
              <ButtonIcon as={EditIcon} />
              <ButtonText>
                Atualizar
              </ButtonText>
            </Button>
            <Button onPress={ async () => {
              await delete_compra(compra.id, db, () => {
                navigation?.navigate('visualizar-compras')
              })
            }} gap="$5" action="negative">
              <ButtonIcon as={TrashIcon} />
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
