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
import { Box, Heading, ScrollView, Text } from '@gluestack-ui/themed';
import { Formik } from 'formik';
import { CadastrarVendaScreen } from '@/interfaces/venda';
import InputDatePicker from '@/components/Custom/Inputs/DatePicker';
import { Alert } from 'react-native';
const Create: React.FC<CadastrarVendaScreen> = ({ navigation, route }) => {
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
      } catch (error) {}
    }
    Start();
  }, []);
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
                    route.params.indexUpdated
                  ) {
                    console.log('hello');
                    const prod = route.params.produto;
                    const prods = values.produtos;
                    if (
                      route.params.type === 'create' &&
                      route.params.indexUpdated === 0
                    ) {
                      prods[route.params.indexUpdated] = {
                        ...prod,
                        valor_total: prod.valor,
                        qtd: '1',
                      };
                      setFieldValue('produtos', [...prods]);
                    } else if (route.params.type === 'create') {
                      setFieldValue('produtos', [
                        ...prods,
                        { ...prod, valor_tota: prod.valor, qtd: '1' },
                      ]);
                    } else {
                      prods[route.params.indexUpdated] = {
                        ...prod,
                        valor_total: prod.valor,
                        qtd: '1',
                      };
                      setFieldValue('produtos', [...prods]);
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
                          <Heading textAlign="center">Produtos</Heading>
                          {values.produtos.map(
                            ({ qtd, valor_total, ...produto }, i) => {
                              if (produto.id !== '') {
                                return (
                                  <Box key={`produto-${i}`}>
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
                                            if (
                                              Number(qtd) <=
                                              Number(produto.quantidade)
                                            ) {
                                              setFieldValue(
                                                `produto[${i}].qtd`,
                                                `${Number(qtd) + 1}`,
                                              );
                                            } else {
                                              Alert.alert(
                                                'Aviso',
                                                'Quantidade indisponível',
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
                                            if (
                                              Number(text) <=
                                              Number(produto.quantidade)
                                            ) {
                                              setFieldValue(
                                                `produtos[${i}].qtd`,
                                                text,
                                              );
                                            } else if (
                                              Number(text) >
                                              Number(produto.quantidade)
                                            ) {
                                              Alert.alert(
                                                'Aviso',
                                                'Quantidade indisponível',
                                              );
                                            } else if (Number(text) == 0) {
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
                                            }
                                          }}
                                          keyboardType="number-pad"
                                        />
                                        <Button
                                          onPress={() => {
                                            if (Number(qtd) > 1) {
                                              setFieldValue(
                                                `produto[${i}].qtd`,
                                                `${Number(qtd) - 1}`,
                                              );
                                            } else {
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
                      <Button>
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
