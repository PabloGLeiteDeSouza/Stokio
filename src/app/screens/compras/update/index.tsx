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
  Radio,
  RadioGroup,
  RadioIcon,
  RadioIndicator,
  RadioLabel,
  Button,
  ButtonText,
  Checkbox,
  CheckboxGroup,
  CheckboxIndicator,
  CheckboxIcon,
  CheckboxLabel,
  Textarea,
  TextareaInput,
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
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Switch,
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  HStack,
  VStack,
  Text,
  Center,
  Icon,
  CircleIcon,
  CheckIcon,
  AlertCircleIcon,
  ChevronDownIcon,
  Card,
  ButtonIcon,
  RemoveIcon,
  AddIcon,
} from '@gluestack-ui/themed';
import { Box, Heading, ScrollView } from '@gluestack-ui/themed';
import { Formik } from 'formik';
import { Alert, GestureResponderEvent } from 'react-native';
import InputDatePicker from '@/components/Custom/Inputs/DatePicker';
import { AtualizarCompraScreen, CadastrarCompraScreen } from '@/interfaces/compra';
import { ProdutoService } from '@/classes/produto/produto.service';
import { ClienteService } from '@/classes/cliente/cliente.service';
import { EmpresaService } from '@/classes/empresa/empresa.service';
import { useSQLiteContext } from 'expo-sqlite';
import LoadingScreen from '@/components/LoadingScreen';
import InputText from '@/components/Input';
import { onAddProduct, onRemoveProduct, onUpdateProduct } from '../functions';
import { Empresa } from '@/types/screens/empresa';
import { getStringFromDate } from '@/utils';
import produtos from '../../../../../components/forms/produtos';

const Update: React.FC<AtualizarCompraScreen> = ({navigation, route}) => {
  const [haveProducts, setHaveProducts] = React.useState(false);
  const [temEmpresas, setTemEmpresas] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const db = useSQLiteContext();

  const StartScreen = async () => {
    try {
      // const emp = await new EmpresaService(db).getAllEmpresas();
      // if (emp.length < 1) {
      //   throw new Error('Não há empresas cadastradas', { cause: 'ERR_EMPRESA_FINDALL_NOT_FOUND' });
      // }
      setTemEmpresas(true);
      // const prod = await new ProdutoService(db).getAllProdutos();
      // if (prod.length < 1) {
      //   throw new Error('Não há produtos cadastrados', { cause: 'ERR_PRODUTO_FINDALL_NOT_FOUND' });
      // }
      setHaveProducts(true);
      setIsLoading(false);
    } catch (error) {
      Alert.alert('Erro', (error as Error).message);
      navigation?.goBack();
      setIsLoading(false);
      if ((error as Error).cause === "ERR_EMPRESA_FINDALL_NOT_FOUND") {
        navigation?.navigate('screens-empresas');
      } else if ((error as Error).cause === "ERR_PRODUTO_FINDALL_NOT_FOUND") {
        navigation?.navigate('screens-produtos');
      } else {
        navigation?.navigate('visualizar-compras');
      }
    }
  }


  React.useEffect(() => {
    StartScreen();
  }, []);

  if (isLoading) {
    return <LoadingScreen/>;
  }

  return (
    <Box w="$full" h="$full">
      <ScrollView>
        <Box p="$8">
          <Box mb="$8">
            <Heading textAlign="center" size="2xl">
              Atualizar Compra
            </Heading>
          </Box>
          <Box gap="$8">
            <Formik
              initialValues={{
                produtos: [
                  {
                    id: 1,
                    codigo_de_barras: '23432432424324',
                    nome: 'sadasdasdasas',
                    tipo: 'asdasd',
                    marca: 'asdsadsa',
                    empresa: 'asdasddsadas',
                    data_validade: new Date(),
                    valor: 10.00,
                    quantidade: 5,
                    quantidade_disponivel: 50,
                  },
                ],
                empresa: {
                  id: 1,
                  nome_fantasia: 'asdadsadasdsa',
                  razao_social: '',
                  cpf: '21332154312',
                  cnpj: '32446542000112',
                } as Empresa,
                valor: 50.00,
                data: new Date(),
                status: 'pendente' as 'pago' | 'pendente',
              }}
              onSubmit={async (value) => {
                try {
                  
                } catch (error) {
                  
                }
              }}
            >
              {({
                values,
                errors,
                handleChange,
                setFieldValue,
                handleSubmit,
              }) => {
                React.useEffect(() => {
                  if (route && route.params && route.params.empresa) {
                    setFieldValue('empresa', { ...route.params.empresa });
                  }
                }, [route?.params?.empresa]);

                React.useEffect(() => {
                  if (
                    route &&
                    route.params &&
                    route.params.produto &&
                    route.params.type &&
                    typeof route.params.indexUpdated !== 'undefined'
                  ) {
                    const prod = route.params.produto;
                    const prods = values.produtos;
                    if (route.params.type === 'create') {
                      if (values.produtos.length === 1 && values.produtos[0].id === 0) {
                        setFieldValue('produtos', [{
                          ...prod,
                          data_validade: new Date(prod.data_validade),
                          quantidade: 1,
                          quantidade_disponivel: prod.quantidade,
                        }]);
                        setFieldValue('valor', prod.valor);
                      } else {
                        setFieldValue('produtos', [
                          ...prods,
                          { ...prod, data_validade: new Date(prod.data_validade), quantidade: 1, quantidade_disponivel: prod.quantidade, },
                        ]);
                        setFieldValue('valor', values.valor + prod.valor);
                      }
                    } else if (route.params.type === 'update') {
                      let i = route.params.indexUpdated;
                      const produto = prods[i];
                      setFieldValue('valor', (values.valor - (produto.valor * produto.quantidade)) + (prod.valor * 1));
                      prods[route.params.indexUpdated] = {
                        ...prod,
                        data_validade: new Date(prod.data_validade),
                        quantidade: 1,
                        quantidade_disponivel: prod.quantidade,
                      }; 
                      setFieldValue(`produtos[${i}]`, {...prod, data_validade: new Date(prod.data_validade),
                        quantidade: 1,
                        quantidade_disponivel: prod.quantidade,}
                      );  
                    } else {
                      Alert.alert('Aviso', 'Erro ao selecionar o clinente!');
                    }
                  }
                }, [route?.params?.produto]);

                return (
                  <>
                    <Box gap="$5">
                      {values.empresa.id !== 0 && (
                        <Card>
                          <HStack>
                            <VStack>
                              <Heading size="lg">Empresa</Heading>
                              <Text size="lg">{values.empresa.nome_fantasia}</Text>
                              <Text size="lg">{values.empresa.cpf}</Text>
                            </VStack>
                          </HStack>
                        </Card>
                      )}
                      {temEmpresas && (
                        <Button
                          onPress={() =>
                            navigation?.navigate('selecionar-empresa', {
                              screen: 'cadastrar-compra',
                            })
                          }
                        >
                          <ButtonText>
                            {values.empresa.id === 0
                              ? 'Selecionar Empresa'
                              : 'Atualizar Empresa'}
                          </ButtonText>
                        </Button>
                      )}
                      <Button
                        onPress={() => navigation?.navigate('screens-empresas')}
                      >
                        <ButtonText>Cadastrar Empresa</ButtonText>
                      </Button>
                    </Box>

                    <Box gap="$5">
                      <Heading textAlign="center" size="xl">
                        Produtos
                      </Heading>

                      {values.produtos.map(
                        ({ quantidade, quantidade_disponivel, ...produto }, i) => {
                          if (produto.id !== 0) {
                            return (
                              <Box key={`produto-${i}`} gap="$5">
                                <Card>
                                  <HStack>
                                    <VStack>
                                      <Heading size="lg">
                                        {produto.nome}
                                      </Heading>
                                      <Text size="lg">{produto.marca}</Text>
                                      <Text size="lg">{produto.tipo}</Text>
                                      <Text>{quantidade} unidades</Text>
                                      <Text>{(quantidade * produto.valor)} reais</Text>
                                    </VStack>
                                  </HStack>
                                </Card>
                                <FormControl
                                  isInvalid={false}
                                  size={'md'}
                                  isDisabled={false}
                                  isRequired={true}
                                >
                                  <FormControlLabel>
                                    <FormControlLabelText>
                                      Quantidade
                                    </FormControlLabelText>
                                  </FormControlLabel>
                                  <Input>
                                    <Button
                                      onPress={() => {
                                        try {
                                          const result = onAddProduct(
                                            quantidade_disponivel,
                                            quantidade,
                                            produto.valor,
                                            values.valor,
                                          );
                                          setFieldValue(`produtos[${i}].quantidade`, result.quantidade);
                                          setFieldValue('valor', result.valor);
                                        } catch (error) {
                                          Alert.alert("Erro", (error as Error).message);
                                        }
                                      }}
                                      action="positive"
                                    >
                                      <ButtonIcon as={AddIcon} />
                                    </Button>
                                    <InputField
                                      textAlign="center"
                                      type="text"
                                      value={values.produtos[i].quantidade.toString()}
                                      placeholder="12"
                                      onChangeText={(text) => {
                                        try {
                                          const result = onUpdateProduct(
                                            text,
                                            quantidade,
                                            produto.valor,
                                            values.valor,
                                          );
                                          setFieldValue(
                                            `produtos[${i}].quantidade`,
                                            result.quantidade,
                                          );
                                          setFieldValue(
                                            'valor',
                                            result.valor,
                                          );
                                        } catch (error) {
                                          const e = error as Error
                                          if (e.cause === "ERR_REMOVE_PRODUCT") {
                                            Alert.alert("Aviso", e.message, [
                                              {
                                                text: "Sim",
                                                onPress: async () => {
                                                  if (values.produtos.length === 1) {
                                                    await setFieldValue('produtos', [
                                                      {
                                                        id: 0,
                                                        codigo_de_barras: '',
                                                        nome: '',
                                                        tipo: '',
                                                        marca: '',
                                                        empresa: '',
                                                        data_validade: new Date(),
                                                        valor: 0,
                                                        quantidade: 0,
                                                        quantidade_disponivel: 0,
                                                      },
                                                    ])
                                                  } else {
                                                    await setFieldValue(
                                                      'produtos',
                                                      values.produtos.splice(
                                                        i,
                                                        1,
                                                      ),
                                                    );
                                                  }
                                                }
                                              }, 
                                              {
                                                text: "Não",
                                                onPress: () => {
                                                  Alert.alert(
                                                    'Aviso',
                                                    'Operação cancelada!',
                                                  );
                                                }
                                              }
                                            ])
                                          }
                                        }
                                      }}
                                      keyboardType="number-pad"
                                    />
                                    <Button
                                      onPress={() => {
                                        try {
                                          const result = onRemoveProduct(
                                            quantidade,
                                            produto.valor,
                                            values.valor,
                                          );
                                          setFieldValue(
                                            `produtos[${i}].quantidade`,
                                            result.quantidade,
                                          );
                                          setFieldValue('valor', result.valor);
                                        } catch (error) {
                                          const e = error as Error;
                                          if(e.cause === "ERR_REMOVE_PRODUCT") {
                                            Alert.alert("Aviso", e.message, [
                                              {
                                                text: "Sim",
                                                onPress: async () => {
                                                  if (values.produtos.length === 1) {
                                                    await setFieldValue('produtos', [
                                                      {
                                                        id: 0,
                                                        codigo_de_barras: '',
                                                        nome: '',
                                                        tipo: '',
                                                        marca: '',
                                                        empresa: '',
                                                        data_validade: new Date(),
                                                        valor: 0,
                                                        quantidade: 0,
                                                        quantidade_disponivel: 0,
                                                      },
                                                    ])
                                                  } else {
                                                    await setFieldValue(
                                                      'produtos',
                                                      values.produtos.splice(
                                                        i,
                                                        1,
                                                      ),
                                                    );
                                                  }
                                                }
                                              }, 
                                              {
                                                text: "Não",
                                                onPress: () => {
                                                  Alert.alert(
                                                    'Aviso',
                                                    'Operação cancelada!',
                                                  );
                                                }
                                              }
                                            ])
                                          }
                                        }
                                      }}
                                      action="negative"
                                    >
                                      <ButtonIcon as={RemoveIcon} />
                                    </Button>
                                  </Input>

                                  <FormControlHelper>
                                    <FormControlHelperText>
                                      Must be atleast 6 characters.
                                    </FormControlHelperText>
                                  </FormControlHelper>

                                  <FormControlError>
                                    <FormControlErrorIcon
                                      as={AlertCircleIcon}
                                    />
                                    <FormControlErrorText>
                                      Atleast 6 characters are required.
                                    </FormControlErrorText>
                                  </FormControlError>
                                </FormControl>
                                <Button
                                  onPress={() => {
                                    navigation?.navigate('selecionar-produto', {
                                      screen: 'cadastrar-compra',
                                      type: 'update',
                                      indexUpdated: i,
                                      selectedsProdutos:
                                        values.produtos[0].id === 0
                                          ? undefined
                                          : values.produtos.map((data) => { return {...data, data_validade: getStringFromDate(data.data_validade) }; }),
                                    });
                                  }}
                                >
                                  <ButtonText>Atualizar Produto</ButtonText>
                                </Button>
                              </Box>
                            );
                          }
                        },
                      )}

                      <Button
                        onPress={() => {
                          navigation?.navigate('selecionar-produto', {
                            screen: 'cadastrar-compra',
                            type: 'create',
                            selectedsProdutos:
                              values.produtos[0].id === 0
                              ? undefined
                              : values.produtos.map((data) => { return {...data, data_validade: getStringFromDate(data.data_validade) }; }),
                          });
                        }}
                      >
                        <ButtonText>Adicionar Produto</ButtonText>
                      </Button>
                      <Button
                        onPress={() => navigation?.navigate('screens-produtos')}
                      >
                        <ButtonText>Cadastrar Produto</ButtonText>
                      </Button>
                    </Box>

                    <InputDatePicker
                      onChangeDate={(dt) => setFieldValue('data', dt)}
                      title="Data da Compra"
                      value={values.data}
                    />

                    <InputText
                      isReadOnly={true}
                      title="Valor da compra"
                      inputType='money'
                      value={values.valor.toString()}
                      onChangeValue={handleChange('valor')}
                    />

                    <FormControl
                      isInvalid={false}
                      size={'md'}
                      isDisabled={false}
                      isRequired={true}
                    >
                      <FormControlLabel>
                        <FormControlLabelText>
                          Selecione o status da compra
                        </FormControlLabelText>
                      </FormControlLabel>
                      <Select
                        onValueChange={handleChange('status')}
                        selectedValue={
                          values.status === 'pago'
                            ? 'Pago'
                            : values.status === 'pendente'
                              ? 'Pendente'
                              : ''
                        }
                        isInvalid={false}
                        isDisabled={false}
                      >
                        <SelectTrigger size={'lg'} variant={'rounded'}>
                          <SelectInput placeholder="Selecione um status" />
                          <SelectIcon mr={'$3'} ml={0} as={ChevronDownIcon} />
                        </SelectTrigger>
                        <SelectPortal>
                          <SelectBackdrop />
                          <SelectContent>
                            <SelectDragIndicatorWrapper>
                              <SelectDragIndicator />
                            </SelectDragIndicatorWrapper>
                            <SelectItem
                              label="Pendente"
                              value="pendente"
                              isPressed={values.status === 'pendente'}
                            />
                            <SelectItem
                              label="Pago"
                              value="pago"
                              isPressed={values.status === 'pago'}
                            />
                          </SelectContent>
                        </SelectPortal>
                      </Select>

                      <FormControlHelper>
                        <FormControlHelperText>
                          Must be atleast 6 characters.
                        </FormControlHelperText>
                      </FormControlHelper>

                      <FormControlError>
                        <FormControlErrorIcon as={AlertCircleIcon} />
                        <FormControlErrorText>
                          Atleast 6 characters are required.
                        </FormControlErrorText>
                      </FormControlError>
                    </FormControl>
                    <Box>
                      <Button
                        onPress={
                          handleSubmit as unknown as (
                            event: GestureResponderEvent,
                          ) => void
                        }
                      >
                        <ButtonText>Atualizar</ButtonText>
                      </Button>
                    </Box>
                  </>
                );
              }}
            </Formik>
          </Box>
        </Box>
      </ScrollView>
    </Box>
  );
};

export default Update;
