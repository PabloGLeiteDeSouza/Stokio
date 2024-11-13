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
  HStack,
  Heading,
  Text,
  AlertCircleIcon,
  Divider,
  ButtonIcon,
  TrashIcon,
  AddIcon,
  FlatList,
  Box,
  Card,
  EditIcon,
  SearchIcon,
} from '@gluestack-ui/themed';
import { Formik } from 'formik';
import { TipoProdutoFlatList } from '@/types/screens/tipo-produto';
import { Alert, GestureResponderEvent, ListRenderItem } from 'react-native';
import { VisualizarTipoProdutoScreen } from '@/interfaces/tipo-produto';
import { useSQLiteContext } from 'expo-sqlite';
import TipoProdutoService from '@/classes/tipo_produto/tipo_produto.service';
import { useIsFocused } from '@react-navigation/native';
import { TipoProdutoUpdate } from '@/classes/tipo_produto/interfaces';
import LoadingScreen from '@/components/LoadingScreen';

const View: React.FC<VisualizarTipoProdutoScreen> = ({ navigation }) => {
  const [tipos_produtos, setTipos_Produtos] = React.useState<
    Array<TipoProdutoUpdate>
  >([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const db = useSQLiteContext();
  const isFocused = useIsFocused();

  async function start() {
    try {
      if (!isLoading) {
        setIsLoading(true);
      }
      const tp = await new TipoProdutoService(db).getAll();
      setTipos_Produtos(tp);
      setIsLoading(false);
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
      setTipos_Produtos([]);
      setIsLoading(false);
    }
  }

  React.useEffect(() => {
    if (isFocused) {
      start();
    }
  }, [isFocused]);

  const FlatListTipoProduto = FlatList as TipoProdutoFlatList;
  const ListRenderTipoProduto: ListRenderItem<TipoProdutoUpdate> = ({
    item,
  }) => {
    return (
      <Card size="md" variant="elevated" m="$3">
        <HStack justifyContent="space-between">
          <Box w="$2/3">
            <Heading mb="$1" size="md">
              {item.nome}
            </Heading>
          </Box>
          <Box gap="$5">
            <Button 
              onPress={async () => {
                Alert.alert('Aviso', `Voce deseja mesmo alterar o tipo de produto: ${item.nome}?`, [{
                  text: 'Sim',
                  onPress: async () => {
                    const data = await new TipoProdutoService(db).delete(item.id);
                    Alert.alert('Aviso', 'Dados deletados com sucesso!');
                    start();
                  },
                  style: 'default'
                },
                {
                  text: 'Nao',
                  onPress: async () => {
                    Alert.alert('Aviso', 'Operacao cancelada com sucesso!');
                  },
                  style: 'cancel' 
                }])
              }}
              action="negative">
              <ButtonIcon as={TrashIcon} />
            </Button>
            <Button
              onPress={() =>
                navigation?.navigate('atualizar-tipo-produto', {
                  id: item.id,
                })
              }
            >
              <ButtonIcon as={EditIcon} />
            </Button>
          </Box>
        </HStack>
      </Card>
    );
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return tipos_produtos.length < 1 ? (
    <Box h="$full" w="$full" alignItems="center" justifyContent="center">
      <Box gap="$5">
        <Heading textAlign="center">Tipos de Produtos não encontrados</Heading>
        <Box>
          <Button
            onPress={() => navigation?.navigate('cadastrar-tipo-produto')}
          >
            <ButtonText>Cadastrar Tipo de Produto</ButtonText>
            <ButtonIcon as={AddIcon} />
          </Button>
        </Box>
      </Box>
    </Box>
  ) : (
    <Box h="$full" w="$full" px="$8" py="$8">
      <Box gap="$5">
        <Formik
          initialValues={{
            busca: '',
          }}
          onSubmit={async (values) => {
            try {
              const res = await new TipoProdutoService(db).getByNome(
                values.busca,
              );
              setTipos_Produtos(res);
            } catch (error) {
              Alert.alert('Error', (error as Error).message);
              throw error;
            }
          }}
        >
          {({ values, handleChange, handleSubmit, errors }) => {
            return (
              <>
                <FormControl
                  isInvalid={false}
                  size={'md'}
                  isDisabled={false}
                  isRequired={true}
                >
                  <FormControlLabel>
                    <FormControlLabelText>Buscar</FormControlLabelText>
                  </FormControlLabel>
                  <Input>
                    <InputField
                      type="text"
                      value={values.busca}
                      placeholder="Buscar"
                      onChangeText={handleChange('busca')}
                    />
                    <Button
                      onPress={
                        handleSubmit as unknown as (
                          event: GestureResponderEvent,
                        ) => void
                      }
                    >
                      <ButtonIcon as={SearchIcon} />
                    </Button>
                  </Input>

                  <FormControlHelper>
                    <FormControlHelperText>
                      Informe o nome do tipo de produto que deseja buscar.
                    </FormControlHelperText>
                  </FormControlHelper>

                  <FormControlError>
                    <FormControlErrorIcon as={AlertCircleIcon} />
                    <FormControlErrorText>{errors.busca}</FormControlErrorText>
                  </FormControlError>
                </FormControl>
              </>
            );
          }}
        </Formik>
        <Button onPress={() => navigation?.navigate('cadastrar-tipo-produto')}>
          <ButtonText>Cadastrar Tipos de produtos</ButtonText>
          <ButtonIcon ml="$5" as={AddIcon} />
        </Button>
      </Box>
      <Box w="$full" alignItems="center" gap="$5" my="$5">
        <Divider />
        <Text>Tipos de Produtos</Text>
        <Divider />
      </Box>
      <FlatListTipoProduto
        data={tipos_produtos}
        renderItem={ListRenderTipoProduto}
        keyExtractor={(item) => String(item.id)}
        refreshing={isLoading}
        onRefresh={async () => {
          try {
            await start();
          } catch (error) {
            Alert.alert('Error', (error as Error).message);
            if (isLoading) {
              start();
              setIsLoading(false);
            }
            throw error;
          }
        }}
      />
    </Box>
  );
};
export default View;
