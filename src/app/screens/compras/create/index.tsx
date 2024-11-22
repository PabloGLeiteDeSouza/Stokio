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
import { Formik, validateYupSchema } from 'formik';
import { Alert, GestureResponderEvent } from 'react-native';
import InputDatePicker from '@/components/Custom/Inputs/DatePicker';
import { CadastrarCompraScreen } from '@/interfaces/compra';
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
import CompraService from '@/classes/compra/compra.service';
import { CompraCreate } from '@/classes/compra/interfaces';
import { mask } from '@/utils/mask';
const Create: React.FC<CadastrarCompraScreen> = ({ navigation, route}) => {
  const [haveProducts, setHaveProducts] = React.useState(false);
  const [temEmpresas, setTemEmpresas] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const db = useSQLiteContext();

  const StartScreen = async () => {
    try {
      const emp = await new EmpresaService(db).getAllEmpresas();
      if (emp.length < 1) {
        throw new Error('Não há empresas cadastradas', { cause: 'ERR_EMPRESA_FINDALL_NOT_FOUND' });
      }
      setTemEmpresas(true);
      const prod = await new ProdutoService(db).getAllProdutos();
      if (prod.length < 1) {
        throw new Error('Não há produtos cadastrados', { cause: 'ERR_PRODUTO_FINDALL_NOT_FOUND' });
      }
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
              Cadastrar Compra
            </Heading>
          </Box>
          <Box gap="$8">
            <Formik
              initialValues={{
                produtos: [
                  {
                    id: 0,
                    codigo_de_barras: '',
                    nome: '',
                    tipo: '',
                    marca: '',
                    empresa: '',
                    data_validade: new Date(),
                    valor_total: 0,
                    valor_unitario: 0,
                    quantidade: 0,
                    quantidade_disponivel: 0,
                  },
                ],
                empresa: {
                  id: 0,
                  nome_fantasia: '',
                  razao_social: '',
                  cpf: '',
                  cnpj: '',
                } as Empresa,
                valor: 0,
                data: new Date(),
                status: '' as 'pago' | 'pendente',
              }}
              onSubmit={async (value) => {
                try {
                  const dados: CompraCreate = {
                    data: value.data, 
                    id_empresa: value.empresa.id, 
                    status: value.status, 
                    item_compra: value.produtos.map(({ id, valor_unitario, quantidade }) => {
                      return { id_produto: id, valor_unitario, quantidade };
                    })
                  }
                  await new CompraService(db).create(dados);
                  Alert.alert('Sucesso', 'Compra cadastrada com sucesso!');
                  navigation?.goBack();
                } catch (error) {
                  Alert.alert('Error', (error as Error).message);
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
                  async function insert_produto() {
                    try {
                      if (
                        typeof route !== 'undefined' &&
                        typeof route.params !== 'undefined' &&
                        typeof route.params.id_produto !== 'undefined' &&
                        typeof route.params.type !== 'undefined' &&
                        typeof route.params.indexUpdated !== 'undefined'
                      ) {
                        const prod = await new ProdutoService(db).getProdutoByIdToVenda(route.params.id_produto);
                        const prods = values.produtos;
                       
                        if (route.params.type === 'create') {
                          if (values.produtos.length === 1 && values.produtos[0].id === 0) {
                            setFieldValue('produtos', [{
                              ...prod,
                              data_validade: new Date(prod.data_validade),
                              valor_total: prod.valor_unitario,
                              quantidade: 1,
                              quantidade_disponivel: prod.quantidade,
                            }]);
                            setFieldValue('valor', prod.valor_unitario);
                          } else {
                            setFieldValue('produtos', [
                              ...prods,
                              { ...prod, 
                                data_validade: new Date(prod.data_validade), 
                                quantidade: 1,
                                valor_total: prod.valor_unitario, 
                                quantidade_disponivel: prod.quantidade,
                              },
                            ]);
                            setFieldValue('valor', values.valor + prod.valor_unitario);
                          }
                        } else if (route.params.type === 'update') {
                          let i = route.params.indexUpdated;
                          const produto = prods[i];
                          setFieldValue('valor', (values.valor - (produto.valor_unitario * produto.quantidade)) + (prod.valor_unitario * 1));
                          prods[i] = {
                            ...prod,
                            data_validade: new Date(prod.data_validade), 
                            quantidade: 1,
                            valor_total: prod.valor_unitario, 
                            quantidade_disponivel: prod.quantidade,
                          }; 
                          setFieldValue(`produtos`, prods);
                        } else {
                          throw new Error("Erro ao selecionar o produto!");
                        }
                      } else {
                        throw new Error("Erro ao selecionar o produto!");
                      }
                    } catch (error) {
                      Alert.alert("Erro", (error as Error).message);
                    }
                  }
                  if(typeof route?.params?.id_produto === 'number'){
                    insert_produto();
                  }
                }, [route?.params?.id_produto]);

                return (
                  <>
                    <Box gap="$5">
                      {values.empresa.id !== 0 && (
                        <Card>
                          <HStack>
                            <VStack>
                              <Heading size="lg">Empresa</Heading>
                              <Text size="lg">{values.empresa.nome_fantasia}</Text>
                              <Text size="lg">{mask(values.empresa.cpf, 'cpf')}</Text>
                              {values.empresa.cnpj &&(
                                <Text size="lg">{mask(values.empresa.cnpj, 'cnpj')}</Text>
                              )}
                            </VStack>
                          </HStack>
                        </Card>
                      )}
                      {temEmpresas && (
                        <Button
                          onPress={() =>
                            navigation?.navigate('selecionar-empresa', {
                              screen: 'cadastrar-compra',
                              empresaSelecionada: values.empresa,
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
                        ({ quantidade, quantidade_disponivel,  valor_total, valor_unitario, ...produto }, i) => {
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
                                      <Text>{mask(valor_total.toString(), 'money')}</Text>
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
                                        setFieldValue(`produtos[${i}].quantidade`, (quantidade + 1));
                                        setFieldValue(`produtos[${i}].valor_total`, (quantidade + 1) * valor_unitario);
                                        setFieldValue('valor', values.valor + valor_unitario);
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
                                        const new_qtd = Number(text);
                                        if (new_qtd > 0) {
                                          const valor_total_old = quantidade * valor_unitario;
                                          const valor_total_new = new_qtd * valor_unitario;
                                          setFieldValue(`produtos[${i}].quantidade`, new_qtd);
                                          setFieldValue(`produtos[${i}].valor_total`, valor_total_new);
                                          setFieldValue('valor', (values.valor - valor_total_old) + valor_total_new);
                                        } else {
                                          Alert.alert('Aviso', `Voce deseja remover o produto ${produto.nome} ?`, [
                                            {
                                              text: 'Sim',
                                              onPress: async () => {
                                                if (values.produtos.length > 1) {
                                                  setFieldValue('produtos', values.produtos.splice(i, 1))
                                                } else {
                                                  setFieldValue('produtos', [
                                                    {
                                                      id: 0,
                                                      codigo_de_barras: '',
                                                      nome: '',
                                                      tipo: '',
                                                      marca: '',
                                                      empresa: '',
                                                      data_validade: new Date(),
                                                      valor_total: 0,
                                                      valor_unitario: 0,
                                                      quantidade: 0,
                                                      quantidade_disponivel: 0,
                                                    }
                                                  ])
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
                                      }}
                                      keyboardType="number-pad"
                                    />
                                    <Button
                                      onPress={() => {
                                        if (quantidade > 1) {
                                          setFieldValue(`produtos[${i}].quantidade`, (quantidade - 1));
                                          setFieldValue(`produtos[${i}].valor_total`, (quantidade - 1) * valor_unitario);
                                          setFieldValue('valor', values.valor - valor_unitario);
                                        } else {
                                          Alert.alert("Aviso", `Voce deseja mesmo remover o produto ${produto.nome} da compra?`, [
                                            {
                                              text: "Sim",
                                              onPress: async() => {
                                                setFieldValue('valor', (values.valor - (quantidade * valor_unitario)));
                                                if (values.produtos.length > 1) {
                                                  setFieldValue('produtos', values.produtos.splice(i, 1));
                                                  Alert.alert("Aviso", "Operação realizada com sucesso!");
                                                } else {
                                                  setFieldValue('produtos', [{
                                                    id: 0,
                                                    codigo_de_barras: '',
                                                    nome: '',
                                                    tipo: '',
                                                    marca: '',
                                                    empresa: '',
                                                    data_validade: new Date(),
                                                    valor_total: 0,
                                                    valor_unitario: 0,
                                                    quantidade: 0,
                                                    quantidade_disponivel: 0,
                                                  }])
                                                }
                                              }
                                            },
                                            {
                                              text: "Não",
                                              onPress: () => {
                                                Alert.alert("Aviso", "Operação cancelada!");
                                              }
                                            }
                                          ])
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
                                      selectedsProdutos: values.produtos.map((data) => { return { id_produto: data.id };}),
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
                            selectedsProdutos: values.produtos.map((data) => { return { id_produto: data.id } }),
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
                        <ButtonText>Cadastrar</ButtonText>
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
export default Create;
