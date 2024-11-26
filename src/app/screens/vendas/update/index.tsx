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
import { EmpresaService } from '@/classes/empresa/empresa.service';
import { useSQLiteContext } from 'expo-sqlite';
import { ClienteService } from '@/classes/cliente/cliente.service';
import { ProdutoService } from '@/classes/produto/produto.service';
import { getDateFromString } from '@/utils';
import VendaService from '@/classes/venda/venda.service';
import { IClienteSimpleRequest } from '@/classes/cliente/interfaces';

const Update: React.FC<AtualizarVendaScreen> = ({ navigation, route }) => {
  if (!route || !route.params || !route.params.id) {
    navigation?.goBack();
    return null;
  }
  const id = route.params.id;
  const [isLoading, setIsLoading] = React.useState(true);

  const db = useSQLiteContext();

  const [clientes, setClientes] = React.useState<IClienteSimpleRequest[]>([]);
  const [venda, setVenda] = React.useState<{
    id: number;
    status: string | 'pago' | 'devendo';
    id_cliente: number;
    data: Date;
    cliente: {
      id: number;
      nome: string;
      cpf: string;
    };
    itens_de_venda: {
      id: number;
      quantidade: number;
      valor_unitario: number;
      produto: {
        data_validade: Date;
        id: number;
        codigo_de_barras: string;
        nome: string;
        marca: string;
        tipo: string;
        valor_unitario: number;
        empresa: string;
        quantidade: number;
      };
    }[];
}>({})
  React.useEffect(() => {
    async function Start() {
      try {
        const cli = await new ClienteService(db).findAllClientes();
        const vnd = await new VendaService(db).findByIdUpdate(id);
        setVenda(vnd);
        setClientes([...cli]);
        setIsLoading(false);
      } catch (error) {
        
      }
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
              initialValues={venda}
              onSubmit={async (values) => {
                try {
                  const { data, cliente, id, itens_de_compra, status } = value;
                  const dados: VendaUpdate = {
                    id: id,
                    data: data,
                    id_cliente: cliente.id, 
                    status: status,
                    itens_de_venda: itens_de_compra.map(({ id, quantidade, valor_unitario, produto}) => {
                      return { id, id_produto: produto.id , valor_unitario, quantidade };
                    })
                  }
                  await new VendaService(db).update(dados);
                  Alert.alert('Sucesso', 'Venda atualizada com sucesso');
                  navigation?.navigate('visualizar-vendas');
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
                  async function insert_cliente() {
                    if (route && route.params && route.params.id_cliente) {
                      const cliente = await new ClienteService(db).findClienteByIdToVenda(route.params.id_cliente);
                      setFieldValue('empresa', { ...cliente });
                    }
                  }
                  insert_cliente();
                }, [route?.params?.id_cliente]);

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
                        const itens_de_venda = values.itens_de_venda;
                        
                        if (route.params.type === 'create') {
                          if (values.itens_de_venda.length === 1 && values.itens_de_venda[0].id === 0) {
                            setFieldValue('itens_de_venda', [{ 
                              produto: prod,
                              valor_unitario: prod.valor_unitario,
                              quantidade: 1,
                            }]);
                          } else {
                            setFieldValue('produtos', [
                              ...itens_de_venda,
                              { 
                                produto: {
                                  ...prod,
                                  data_validade: getDateFromString(prod.data_validade),
                                },
                                valor_unitario: prod.valor_unitario,
                                quantidade: 1,
                              },
                            ]);
                          }
                        } else if (route.params.type === 'update') {
                          let i = route.params.indexUpdated;
                          itens_de_venda[i] = {
                            id: 0,
                            produto: {
                              ...prod,
                              data_validade: getDateFromString(prod.data_validade),
                            },
                            quantidade: 1,
                            valor_unitario: prod.valor_unitario
                          }; 
                          setFieldValue(`itens_de_venda`, itens_de_venda);
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
                            {values.cliente.id === 0
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
                      {values.itens_de_venda.length > 0 ? (
                        <>
                          <Heading textAlign="center" size="xl">
                            Produtos
                          </Heading>
                          {values.itens_de_venda.map(
                            ({ quantidade, produto, valor_unitario, id }, i) => {
                              if (id !== 0) {
                                return (
                                  <Box key={`item_de_compra-${i}`} gap="$5">
                                    <Card>
                                      <HStack>
                                        <VStack>
                                          <Heading size="lg">
                                            {produto.nome}
                                          </Heading>
                                          <Text size="lg">{produto.marca}</Text>
                                          <Text size="lg">{produto.tipo}</Text>
                                          <Text>{quantidade} unidades</Text>
                                          <Text>{mask((valor_unitario * quantidade).toString(), 'money')}</Text>
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
                                           
                                            if ((quantidade + 1) <= produto.quantidade) {
                                              setFieldValue(
                                                `itens_de_venda[${i}].quantidade`,
                                                (quantidade + 1)
                                              );
                                              
                                            } else {
                                              Alert.alert('Erro', 'Quantidade insuficiente');
                                            }
                                          }}
                                          action="positive"
                                        >
                                          <ButtonIcon as={AddIcon} />
                                        </Button>
                                        <InputField
                                          textAlign="center"
                                          type="text"
                                          value={values.itens_de_venda[i].quantidade.toString()}
                                          placeholder="12"
                                          onChangeText={(text) => {
                                            if (Number(text) > 0) {
                                              setFieldValue(
                                                `itens_de_venda[${i}].quantidade`,
                                                Number(text),
                                              );
                                            } else {
                                              Alert.alert(
                                                'Aviso',
                                                `Deseja remover o produto ${produto.nome}?`,
                                                [
                                                  {
                                                    text: 'Sim',
                                                    onPress: () => {
                                                      if (values.itens_de_venda.length > 1) {
                                                        setFieldValue(
                                                          'itens_de_venda',
                                                          values.itens_de_venda.splice(
                                                            i,
                                                            1,
                                                          ),
                                                        );
                                                      } else {
                                                        Alert.alert('Aviso', 'E preciso no minimo um item de venda para a venda existir!')
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
                                            }
                                          }}
                                          keyboardType="number-pad"
                                        />
                                        <Button
                                          onPress={() => {
                                            if ((quantidade - 1) > 0) {
                                              setFieldValue(`itens_de_venda[${i}].quantidade`, (quantidade - 1));
                                            } else {
                                              Alert.alert(
                                                'Aviso',
                                                'Deseja remover esse produto?',
                                                [
                                                  {
                                                    text: 'Sim',
                                                    onPress: () => {
                                                      if (
                                                        values.itens_de_venda.length > 0
                                                      ) {
                                                        setFieldValue(
                                                          'itens_de_venda',
                                                          values.itens_de_venda.splice(i, 1)
                                                        );
                                                      } else {
                                                        Alert.alert('Aviso', 'Nao se pode remover todos os itens de venda!')
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
                                            screen: 'atualizar-venda',
                                            selectedsProdutos: values.itens_de_venda.map(({ produto }) => { return { id: produto.id }; }),
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
                                            screen: 'atualizar-venda',
                                            selectedsProdutos: values.itens_de_venda.map(({ produto }) => { return { id: produto.id }; }),
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
                    <Box>
                      <Card>
                        <Heading>Valor da compra</Heading>
                        <Text>{mask(values.itens_de_venda.map(({ quantidade, valor_unitario }) => quantidade * valor_unitario).reduce((p, c) => p + c, 0).toString(), 'money')}</Text>
                      </Card>
                    </Box>

                    <FormControl
                      isInvalid={errors.status ? true : false}
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
                          Informe o status da venda.
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
                        <ButtonText>Atualizar Venda</ButtonText>
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
