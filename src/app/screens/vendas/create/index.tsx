import React from 'react';
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlHelper,
  FormControlHelperText,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  Input,
  InputField,
  Button,
  ButtonText,
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicatorWrapper,
  SelectDragIndicator,
  SelectItem,
  HStack,
  VStack,
  AlertCircleIcon,
  ChevronDownIcon,
  Card,
  ButtonIcon,
  RemoveIcon,
  AddIcon,
} from '@gluestack-ui/themed';
import { Box, Heading, ScrollView, Text } from '@gluestack-ui/themed';
import { Formik } from 'formik';
import { CadastrarVendaScreen } from '@/interfaces/venda';
import InputDatePicker from '@/components/Custom/Inputs/DatePicker';
import { Alert, GestureResponderEvent } from 'react-native';
import onUpdateProduct from './functions/onUpdateProduct';
import onAddProduct from './functions/onAddProduct';
import onRemoveProduct from './functions/onRemoveProduct';
import { formatValue } from '@/utils/calc';
import { ClienteService } from '@/classes/cliente/cliente.service';
import { useSQLiteContext } from 'expo-sqlite';
import LoadingScreen from '@/components/LoadingScreen';
import { ProdutoService } from '@/classes/produto/produto.service';
import FormCreateVenda from '@/components/Forms/venda';
const Create: React.FC<CadastrarVendaScreen> = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [haveClientes, setHaveClientes] = React.useState(false);
  const [haveProdutos, setHaveProdutos] = React.useState(false);
  const db = useSQLiteContext();

  React.useEffect(() => {
    async function Start() {
      try {
        const cli = await new ClienteService(db).findAllClientes();
        if (cli.length < 1) {
          throw new Error("Não há clientes cadastrados", { cause: "ERR_DONT_HAVE_CLIENTS" });
        }
        setHaveClientes(true);
        const produto = await new ProdutoService(db).getAllProdutos();
        if (produto.length < 1) {
          throw new Error("Não há produtos cadastrados", { cause: "ERR_DONT_HAVE_PRODUTOS" });
        }
        setHaveProdutos(true);
        setIsLoading(false);
      } catch (error) {
        const err = error as Error;
        if (err.cause === 'ERR_DB_FIND_ALL_CLIENTES') {
          Alert.alert('Erro', 'Erro ao buscar clientes contacte o suporte do aplicativo!');
          navigation?.goBack();
        } else if (err.cause === "ERR_DONT_HAVE_CLIENTS") {
          Alert.alert("Erro", err.message);
          navigation?.goBack();
          navigation?.navigate('screens-clientes');
        } else if (err.cause === "ERR_DONT_HAVE_PRODUTOS") {
          Alert.alert("Erro", err.message);
          navigation?.goBack();
          navigation?.navigate('screens-produtos');
        } else {

        }
        setIsLoading(false);
      }
    }
    Start();
  }, []);

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <Box w="$full" h="$full">
      <ScrollView>
        <Box p="$8">
          <Box mb="$8">
            <Heading textAlign="center" size="2xl">
              Cadastrar Venda
            </Heading>
          </Box>
          <Box gap="$8">
            <FormCreateVenda
              id_cliente={route?.params?.id_cliente}
              id_produto={route?.params?.id_produto}
              tipo={route?.params?.type}
              indexUpdated={route?.params?.indexUpdated}
              haveClientes={haveClientes}
              haveProdutos={haveProdutos}
              onAddProductToVenda={(selectedsProdutos) => {
                navigation?.navigate('selecionar-produto', {
                  screen: 'cadastrar-venda',
                  type: 'create',
                  selectedsProdutos
                });
              }}
              onChangeCliente={(id_cliente) => { navigation?.navigate('selecionar-cliente', { screen: 'cadastrar-venda', id_cliente }); }}
              onCreateCliente={() => { navigation?.navigate('screens-clientes'); }}
              onCreateProduct={() => { navigation?.navigate('screens-produtos'); }}
              onUpdateProductToVenda={(selectedsProdutos, indexUpdated) => {
                navigation?.navigate('selecionar-produto', { screen: 'cadastrar-venda', type: 'update', indexUpdated, selectedsProdutos });
              }}
              onCreatedVenda={() => {
                navigation?.goBack();
              }}
            />
          </Box>
        </Box>
      </ScrollView>
    </Box>
  );
};
export default Create;
