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
import { getDateFromString, getStringFromDate } from '@/utils';
import produtos from '../../../../../components/forms/produtos';
import CompraService from '@/classes/compra/compra.service';
import { CompraObjectBaseUpdate, CompraUpdate } from '@/classes/compra/interfaces';
import { mask } from '@/utils/mask';

const Update: React.FC<AtualizarCompraScreen> = ({navigation, route}) => {

  if(!route || !route.params || !route.params.id){
    navigation?.goBack();
    return null;
  }
  const id = route.params.id;
  const [haveProducts, setHaveProducts] = React.useState(false);
  const [temEmpresas, setTemEmpresas] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [compra, setCompra] = React.useState<CompraObjectBaseUpdate>({})
  const db = useSQLiteContext();

  const StartScreen = async () => {
    try {
      const cmp = await new CompraService(db).findByIdToUpdate(id);
      setCompra(cmp);
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
              initialValues={compra}
              onSubmit={async (value) => {
                try {
                  const { data, empresa, id, itens_de_compra, status } = value
                  const dados: CompraUpdate = {
                    id: id,
                    data: data,
                    id_empresa: empresa.id, 
                    status: status,
                    itens_de_compra: itens_de_compra.map(({ id, quantidade, valor_unitario, produto}) => {
                      return { id, id_produto: produto.id , valor_unitario, quantidade };
                    })
                  }
                  await new CompraService(db).update(dados);
                  Alert.alert('Sucesso', 'Compra atualizada com sucesso');
                  navigation?.navigate('visualizar-compras');
                } catch (error) {
                  Alert.alert('Erro', (error as Error).message);
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
                        const prod = await new ProdutoService(db).getProdutoByIdToCompra(route.params.id_produto);
                        const itens_de_compra = values.itens_de_compra;
                       
                        if (route.params.type === 'create') {
                            setFieldValue('itens_de_compra', [
                              ...itens_de_compra,
                              {
                                id: 0,
                                produto: {
                                  ...prod
                                },
                                quantidade: 1,
                                valor_unitario: prod.valor_unitario,
                              },
                            ]);
                        } else if (route.params.type === 'update') {
                          const i = route.params.indexUpdated;
                          itens_de_compra[i] = {
                            ...itens_de_compra[i],
                            produto: {
                              ...prod,
                              data_validade: getDateFromString(prod.data_validade),
                            },
                            quantidade: 1,
                            valor_unitario: prod.valor_unitario,
                          }; 
                          setFieldValue(`itens_de_compra`, itens_de_compra);
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
                              {values.empresa.cnpj && (
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
                      {values.itens_de_compra.map(({produto, quantidade, id, valor_unitario}, i) => {
                        return (
                          <Box key={`item-de-compra-${i}`} gap="$2">
                            <Card>
                              <HStack>
                                <VStack>
                                  <Heading size="lg">
                                    {produto.nome}
                                  </Heading>
                                  <Text size="lg">{produto.marca}</Text>
                                  <Text size="lg">{produto.tipo}</Text>
                                  <Text>{quantidade} unidades</Text>
                                  <Text>{mask((quantidade * valor_unitario).toString(), 'money')}</Text>
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
                                    setFieldValue(`itens_de_compra[${i}].quantidade`, (quantidade + 1));
                                  }}
                                  action="positive"
                                >
                                  <ButtonIcon as={AddIcon} />
                                </Button>
                                <InputField
                                  textAlign="center"
                                  type="text"
                                  value={values.itens_de_compra[i].quantidade.toString()}
                                  placeholder="12"
                                  onChangeText={(text) => {
                                    const new_qtd = Number(text);
                                    if (new_qtd > 0) {
                                      setFieldValue(`itens_de_compra[${i}].quantidade`, new_qtd);
                                    } else {
                                      Alert.alert('Aviso', `Voce deseja remover o produto ${produto.nome} ?`, [
                                        {
                                          text: 'Sim',
                                          onPress: async () => {
                                            if (values.itens_de_compra.length > 1) {
                                              setFieldValue('itens_de_compra', values.itens_de_compra.splice(i, 1))
                                            } else {
                                              Alert.alert("Aviso", "E necessario que exista ao menos um item de compra!")
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
                                      setFieldValue(`itens_de_compra[${i}].quantidade`, (quantidade - 1));
                                    } else {
                                      Alert.alert("Aviso", `Voce deseja mesmo remover o produto ${produto.nome} da compra?`, [
                                        {
                                          text: "Sim",
                                          onPress: async() => {
                                            if (values.itens_de_compra.length > 1) {
                                              setFieldValue('item_de_compra', values.itens_de_compra.splice(i, 1));
                                              Alert.alert("Aviso", "Operação realizada com sucesso!");
                                            } else {
                                              Alert.alert("Aviso", "E necessario que exista ao menos um item de compra!")
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
                                  Informe o uma quantidade valida.
                                </FormControlHelperText>
                              </FormControlHelper>

                              <FormControlError>
                                <FormControlErrorIcon
                                  as={AlertCircleIcon}
                                />
                                <FormControlErrorText>
                                  {typeof errors.itens_de_compra !== 'undefined' && 
                                    typeof errors.itens_de_compra[i] === 'object' ? 
                                      errors.itens_de_compra[i].quantidade : ''}
                                </FormControlErrorText>
                              </FormControlError>
                            </FormControl>
                            <Button
                              onPress={() => {
                                navigation?.navigate('selecionar-produto', {
                                  screen: 'atualizar-compra',
                                  type: 'update',
                                  indexUpdated: i,
                                  selectedsProdutos: values.itens_de_compra.map((data) => { return { id_produto: data.produto.id };}),
                                });
                              }}
                            >
                              <ButtonText>Atualizar Produto</ButtonText>
                            </Button>
                          </Box>
                        )
                      })}
                      <Button
                        onPress={() => {
                          navigation?.navigate('selecionar-produto', {
                            screen: 'cadastrar-compra',
                            type: 'create',
                            selectedsProdutos: values.itens_de_compra.map(({produto}) => { return { id_produto: produto.id } }),
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
                      value={values.itens_de_compra.map(({ quantidade, valor_unitario }) => quantidade * valor_unitario).reduce((p, c) => p+c).toString()}
                      onChangeValue={handleChange('valor')}
                    />

                    <FormControl
                      isInvalid={errors.status ? true : false}
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
                          Informe o status da compra.
                        </FormControlHelperText>
                      </FormControlHelper>

                      <FormControlError>
                        <FormControlErrorIcon as={AlertCircleIcon} />
                        <FormControlErrorText>
                          {errors.status}
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
