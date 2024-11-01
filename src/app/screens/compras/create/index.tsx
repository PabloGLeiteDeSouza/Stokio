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
} from '@gluestack-ui/themed';
import { Box, Heading, ScrollView } from '@gluestack-ui/themed';
import { Formik } from 'formik';
import { Alert, GestureResponderEvent } from 'react-native';
import InputDatePicker from '@/components/Custom/Inputs/DatePicker';
import { CadastrarCompraScreen } from '@/interfaces/compra';
import { ProdutoService } from '@/classes/produto/produto.service';
import { useSQLiteContext } from 'expo-sqlite';
import { ClienteService } from '@/classes/cliente/cliente.service';
import { EmpresaService } from '@/classes/empresa/empresa.service';
import LoadingScreen from '@/components/LoadingScreen';
const Create: React.FC<CadastrarCompraScreen> = ({ navigation, route}) => {
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
              Cadastrar Compra
            </Heading>
          </Box>
          <Box gap="$8">
            <Formik
              initialValues={{
                produtos: [
                  {
                    id: '',
                    codigo_de_barras: '',
                    nome: '',
                    data_validade: '',
                    marca: '',
                    tipo: '',
                    valor_total: '',
                    valor: '',
                    empresa: '',
                    quantidade: '',
                    qtd: '',
                  },
                ],
                cliente: {
                  id: '',
                  nome: '',
                  cpf: '',
                },
                valor: '',
                data_venda: new Date(),
                data_atualizacao: new Date(),
                status: '' as 'pago' | 'devendo',
              }}
              onSubmit={() => {}}
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
                    if (
                      route.params.type === 'create' &&
                      values.produtos.length === 1 &&
                      values.produtos[0].id === ''
                    ) {
                      prods[0] = {
                        ...prod,
                        valor_total: prod.valor,
                        qtd: '1',
                      };
                      setFieldValue('produtos', [...prods]);
                    } else if (route.params.type === 'create') {
                      setFieldValue('produtos', [
                        ...prods,
                        { ...prod, valor_total: prod.valor, qtd: '1' },
                      ]);
                    } else if (route.params.type === 'update') {
                      prods[route.params.indexUpdated] = {
                        ...prod,
                        valor_total: prod.valor,
                        qtd: '1',
                      };
                      setFieldValue('produtos', [...prods]);
                    } else {
                      Alert.alert('Aviso', 'Erro ao selecionar o clinente!');
                    }
                    if (values.valor === '') {
                      setFieldValue('valor', prod.valor);
                    } else {
                      setFieldValue(
                        'valor',
                        formatValue(
                          Number(values.valor.replace(',', '.')) +
                            Number(prod.valor.replace(',', '.')),
                        ),
                      );
                    }
                  }
                }, [route?.params?.produto]);

                return (
                  <>
                    <Box gap="$5">
                      {values.cliente.id !== '' && (
                        <Card>
                          <HStack>
                            <VStack>
                              <Heading size="lg">Cliente</Heading>
                              <Text size="lg">{values.cliente.nome}</Text>
                              <Text size="lg">{values.cliente.cpf}</Text>
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
                            {values.cliente.id === ''
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
                        ({ qtd, valor_total, ...produto }, i) => {
                          if (produto.id !== '') {
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
                                      <Text>{qtd} unidades</Text>
                                      <Text>{valor_total} reais</Text>
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
                                        const result = onAddProduct(
                                          qtd,
                                          values.valor,
                                          produto,
                                        );
                                        if (typeof result != 'undefined') {
                                          setFieldValue(
                                            `produtos[${i}].qtd`,
                                            result.quantidade,
                                          );
                                          setFieldValue(
                                            `produtos[${i}].valor_total`,
                                            result.valor_produto,
                                          );
                                          setFieldValue('valor', result.valor);
                                        }
                                      }}
                                      action="positive"
                                    >
                                      <ButtonIcon as={AddIcon} />
                                    </Button>
                                    <InputField
                                      textAlign="center"
                                      type="text"
                                      value={values.produtos[i].qtd}
                                      placeholder="12"
                                      onChangeText={(text) => {
                                        const result = onUpdateProduct(
                                          text,
                                          produto,
                                          values.valor,
                                          valor_total,
                                        );
                                        if (result.erro) {
                                          Alert.alert(
                                            'Aviso',
                                            'Limite do produto atingido',
                                          );
                                        } else if (result.remove) {
                                          Alert.alert(
                                            'Aviso',
                                            'Deseja remover esse produto?',
                                            [
                                              {
                                                text: 'Sim',
                                                onPress: () => {
                                                  setFieldValue(
                                                    'produtos',
                                                    values.produtos.splice(
                                                      i,
                                                      1,
                                                    ),
                                                  );
                                                },
                                              },
                                              {
                                                text: 'Não',
                                                onPress: () =>
                                                  Alert.alert(
                                                    'Aviso',
                                                    'Operação cancelada!',
                                                  ),
                                              },
                                            ],
                                          );
                                        } else {
                                          setFieldValue(
                                            `produtos[${i}].qtd`,
                                            result.quantidade,
                                          );
                                          setFieldValue(
                                            'valor',
                                            result.valor_total,
                                          );
                                          setFieldValue(
                                            `produtos[${i}].valor_total`,
                                            result.valor_total,
                                          );
                                        }
                                      }}
                                      keyboardType="number-pad"
                                    />
                                    <Button
                                      onPress={() => {
                                        const result = onRemoveProduct(
                                          qtd,
                                          produto,
                                          valor_total,
                                          values.valor,
                                        );
                                        if (result.remove) {
                                          Alert.alert(
                                            'Aviso',
                                            'Deseja remover esse produto?',
                                            [
                                              {
                                                text: 'Sim',
                                                onPress: () => {
                                                  if (
                                                    values.produtos.splice(i, 1)
                                                      .length < 1
                                                  ) {
                                                    setFieldValue('produtos', [
                                                      {
                                                        id: '',
                                                        codigo_de_barras: '',
                                                        nome: '',
                                                        data_validade: '',
                                                        marca: '',
                                                        tipo: '',
                                                        valor_total: '',
                                                        valor: '',
                                                        empresa: '',
                                                        quantidade: '',
                                                        qtd: '',
                                                      },
                                                    ]);
                                                    setFieldValue('valor', '');
                                                  } else {
                                                    setFieldValue(
                                                      'valor',
                                                      `${Number(values.valor.replace(',', '.')) - Number(valor_total.replace(',', '.'))}`,
                                                    );
                                                    setFieldValue('produtos', [
                                                      ...values.produtos.splice(
                                                        i,
                                                        1,
                                                      ),
                                                    ]);
                                                  }
                                                },
                                              },
                                              {
                                                text: 'Não',
                                                onPress: () =>
                                                  Alert.alert(
                                                    'Aviso',
                                                    'Operação cancelada!',
                                                  ),
                                              },
                                            ],
                                          );
                                        } else {
                                          setFieldValue(
                                            `produtos[${i}].qtd`,
                                            result.quantidade,
                                          );
                                          setFieldValue(
                                            `produtos[${i}].valor_total`,
                                            result.valor_total,
                                          );
                                          setFieldValue('valor', result.valor);
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
                                      screen: 'cadastrar-venda',
                                      type: 'update',
                                      indexUpdated: i,
                                      selectedsProdutos:
                                        values.produtos[0].id === ''
                                          ? undefined
                                          : values.produtos,
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
                            screen: 'cadastrar-venda',
                            type: 'create',
                            selectedsProdutos:
                              values.produtos[0].id === ''
                                ? undefined
                                : values.produtos,
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
                      onChangeDate={handleChange('data_venda')}
                      title="Data da Venda"
                      value={values.data_venda}
                    />

                    <InputDatePicker
                      onChangeDate={handleChange('data_atualizacao')}
                      title="Data da Atualizacao"
                      value={values.data_venda}
                    />

                    <FormControl
                      isInvalid={false}
                      size={'md'}
                      isDisabled={false}
                      isRequired={true}
                    >
                      <FormControlLabel>
                        <FormControlLabelText>Valor</FormControlLabelText>
                      </FormControlLabel>
                      <Input>
                        <InputField
                          editable={false}
                          type="text"
                          value={values.valor}
                          placeholder="120,00"
                        />
                      </Input>

                      <FormControlHelper>
                        <FormControlHelperText>
                          Valor da compra.
                        </FormControlHelperText>
                      </FormControlHelper>

                      <FormControlError>
                        <FormControlErrorIcon as={AlertCircleIcon} />
                        <FormControlErrorText>
                          {errors.valor}
                        </FormControlErrorText>
                      </FormControlError>
                    </FormControl>

                    <FormControl
                      isInvalid={false}
                      size={'md'}
                      isDisabled={false}
                      isRequired={true}
                    >
                      <FormControlLabel>
                        <FormControlLabelText>
                          Selecione o status da venda
                        </FormControlLabelText>
                      </FormControlLabel>
                      <Select
                        onValueChange={handleChange('status')}
                        selectedValue={
                          values.status === 'pago'
                            ? 'Pago'
                            : values.status === 'devendo'
                              ? 'Devendo'
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
                              label="Devendo"
                              value="devendo"
                              isPressed={values.status === 'devendo'}
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
                        <ButtonText>Cadastrar Venda</ButtonText>
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
