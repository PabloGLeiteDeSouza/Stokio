import { AtualizarVendaScreen } from '@/interfaces/venda';
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
import InputDatePicker from '@/components/Custom/Inputs/DatePicker';
import { Alert, GestureResponderEvent } from 'react-native';
import onUpdateProduct from './functions/onUpdateProduct';
import onAddProduct from './functions/onAddProduct';
import onRemoveProduct from './functions/onRemoveProduct';
import { formatValue } from '@/utils/calc';
import LoadingScreen from '@/components/LoadingScreen';
import { mask } from '@/utils/mask';
import InputText from '@/components/Input';

const Update: React.FC<AtualizarVendaScreen> = ({ navigation, route }) => {
  if (!route || !route.params || !route.params.id) {
    navigation?.goBack();
    return null;
  }
  const [isLoading, setIsLoading] = React.useState(true);

  const [clientes, setClientes] = React.useState([
    {
      id: '1',
      nome: 'Cliente 1',
      cpf: '213.213.321.23',
    },
  ]);
  React.useEffect(() => {
    async function Start() {
      try {
        setClientes([...clientes]);
        setIsLoading(false);
      } catch (error) {}
    }
    Start();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Box w="$full" h="$full">
      <ScrollView>
        <Box p="$8">
          <Box mb="$8">
            <Heading textAlign="center" size="2xl">
              Atualizar Venda
            </Heading>
          </Box>
          <Box gap="$8">
            <Formik
              initialValues={{
                produtos: [
                  {
                    id: 1,
                    codigo_de_barras: '2343243432432432',
                    nome: 'asdasdsadsadasd',
                    data_validade: new Date('2026-10-27'),
                    marca: 'asdasdsadas',
                    tipo: 'asdsadsadsada',
                    valor: 10.00,
                    empresa: 'asdsadsadsaasdsa',
                    quantidade_disponivel: 50,
                    quantidade: 5,
                  },
                ],
                cliente: {
                  id: 1,
                  nome: 'sdasddsadassdas',
                  cpf: '12323154387',
                },
                valor: 50.00,
                data: new Date(),
                status: 'devendo' as 'pago' | 'devendo',
              }}
              onSubmit={async () => {}}
            >
              {({
                values,
                errors,
                handleChange,
                setFieldValue,
                handleSubmit,
              }) => {
                React.useEffect(() => {
                  if (route && route.params && route.params.cliente) {
                    setFieldValue('cliente', { ...route.params.cliente });
                  }
                }, [route?.params?.cliente]);

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
                      {values.cliente.id !== 0 && (
                        <Card>
                          <HStack>
                            <VStack>
                              <Heading size="lg">Cliente</Heading>
                              <Text size="lg">{values.cliente.nome}</Text>
                              <Text size="lg">{mask(values.cliente.cpf, 'cpf')}</Text>
                            </VStack>
                          </HStack>
                        </Card>
                      )}
                      {clientes.length > 0 && (
                        <Button
                          onPress={() =>
                            navigation?.navigate('selecionar-cliente', {
                              screen: 'cadastrar-venda',
                            })
                          }
                        >
                          <ButtonText>
                            {values.cliente.id === ''
                              ? 'Selecionar Cliente'
                              : 'Atualizar Cliente'}
                          </ButtonText>
                        </Button>
                      )}
                      <Button
                        onPress={() => navigation?.navigate('screens-clientes')}
                      >
                        <ButtonText>Cadastrar Cliente</ButtonText>
                      </Button>
                    </Box>

                    <Box gap="$5">
                      {values.produtos.length > 0 ? (
                        <>
                          <Heading textAlign="center" size="xl">
                            Produtos
                          </Heading>
                          {values.produtos.map(
                            ({ quantidade, quantidade_disponivel, valor, ...produto }, i) => {
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
                                          <Text>{quantidade} unidades</Text>
                                          <Text>{valor * quantidade} reais</Text>
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
                                              quantidade.toString(),
                                              valor.toString(),
                                              produto,
                                            );
                                            if (typeof result != 'undefined') {
                                              setFieldValue(
                                                `produtos[${i}].quantidade`,
                                                result.quantidade,
                                              );
                                              setFieldValue(
                                                `produtos[${i}].valor`,
                                                result.valor_produto,
                                              );
                                              setFieldValue(
                                                'valor',
                                                result.valor,
                                              );
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
                                                        values.produtos.splice(
                                                          i,
                                                          1,
                                                        ).length < 1
                                                      ) {
                                                        setFieldValue(
                                                          'produtos',
                                                          [
                                                            {
                                                              id: '',
                                                              codigo_de_barras:
                                                                '',
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
                                                        );
                                                        setFieldValue(
                                                          'valor',
                                                          '',
                                                        );
                                                      } else {
                                                        setFieldValue(
                                                          'valor',
                                                          `${Number(values.valor.replace(',', '.')) - Number(valor_total.replace(',', '.'))}`,
                                                        );
                                                        setFieldValue(
                                                          'produtos',
                                                          [
                                                            ...values.produtos.splice(
                                                              i,
                                                              1,
                                                            ),
                                                          ],
                                                        );
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
                                              setFieldValue(
                                                'valor',
                                                result.valor,
                                              );
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
                                        navigation?.navigate(
                                          'selecionar-produto',
                                          {
                                            screen: 'cadastrar-venda',
                                            produtoSelecionado: produto,
                                            type: 'update',
                                            indexUpdated: i,
                                          },
                                        );
                                      }}
                                    >
                                      <ButtonText>Atualizar Produto</ButtonText>
                                    </Button>
                                    <Button
                                      onPress={() => {
                                        navigation?.navigate(
                                          'selecionar-produto',
                                          {
                                            screen: 'cadastrar-venda',
                                            produtoSelecionado: produto,
                                            type: 'create',
                                          },
                                        );
                                      }}
                                    >
                                      <ButtonText>Adicionar Produto</ButtonText>
                                    </Button>
                                  </Box>
                                );
                              } else {
                                return (
                                  <Box key={`prduto-vazio-${i}`}>
                                    <Button
                                      onPress={() =>
                                        navigation?.navigate(
                                          'selecionar-produto',
                                          {
                                            screen: 'cadastrar-venda',
                                            type: 'create',
                                          },
                                        )
                                      }
                                    >
                                      <ButtonText>
                                        Selecionar Produto
                                      </ButtonText>
                                    </Button>
                                  </Box>
                                );
                              }
                            },
                          )}
                        </>
                      ) : (
                        <>
                          <Button
                            onPress={() =>
                              navigation?.navigate('selecionar-produto', {
                                screen: 'cadastrar-venda',
                                type: 'create',
                              })
                            }
                          >
                            <ButtonText>Selecionar Produto</ButtonText>
                          </Button>
                        </>
                      )}
                      <Button
                        onPress={() => navigation?.navigate('screens-produtos')}
                      >
                        <ButtonText>Cadastrar Produto</ButtonText>
                      </Button>
                    </Box>

                    <InputDatePicker
                      onChangeDate={(dt) => setFieldValue('data', dt)}
                      title="Data da Venda"
                      value={values.data}
                    />

                    <InputText
                      isReadOnly={true}
                      inputType='money'
                      title="Valor da Venda"
                      value={values.valor}
                      errors={errors.valor}
                    />

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
                        defaultValue={values.status}
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
export default Update;
