import InputDatePicker from '@/components/Custom/Inputs/DatePicker';
import InputText from '@/components/Input';
import { mask } from '@/utils/mask';
import { AddIcon } from '@gluestack-ui/themed';
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
  Center,
  Icon,
  CircleIcon,
  CheckIcon,
  AlertCircleIcon,
  ChevronDownIcon,
  ButtonIcon,
  RemoveIcon,
} from '@gluestack-ui/themed';

import {
  Box,
  Button,
  ButtonText,
  Card,
  Heading,
  HStack,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import { Formik } from 'formik';
import React from 'react';
import { Alert, GestureResponderEvent } from 'react-native';
import { IFormCreateVenda } from './interfaces';
import { ProdutoService } from '@/classes/produto/produto.service';
import { useSQLiteContext } from 'expo-sqlite';
import { ClienteService } from '@/classes/cliente/cliente.service';
const FormCreateVenda: React.FC<IFormCreateVenda> = ({ haveClientes, haveProdutos, id_cliente, produto, onCreateProduct, onCreateCliente, onChangeCliente, onAddProductToVenda, onUpdateProductToVenda }) => {

    const db = useSQLiteContext();
  
  
    return (
    <>
      <Formik
        initialValues={{
          produtos: [
            {
              id: 0,
              codigo_de_barras: '',
              nome: '',
              data_validade: '',
              marca: '',
              tipo: '',
              valor_total: 0,
              valor_unitario: 0,
              empresa: '',
              quantidade_disponivel: 0,
              quantidade: 0,
            },
          ],
          cliente: {
            id: 0,
            nome: '',
            cpf: '',
          },
          valor: 0,
          data: new Date(),
          status: '' as 'pago' | 'devendo',
        }}
        onSubmit={() => {}}
      >
        {({ values, errors, handleChange, setFieldValue, handleSubmit }) => {
          React.useEffect(() => {
            async function insert_cliente(id_cliente: number) {
                try {
                    const cli = await new ClienteService(db).findClienteByIdToVenda(id_cliente);
                    setFieldValue('cliente', cli);
                } catch (error) {
                    Alert.alert('Erro', (error as Error).message);
                }
            }
            if (id_cliente) {
                insert_cliente(id_cliente);
            }
          }, [id_cliente]);

          React.useEffect(() => {
            async function insert_product() {
                if (produto.id_produto && produto.type && produto.i) {
                    try {
                        const { quantidade, ...prod} = await new ProdutoService(db).getProdutoByIdToVenda(produto.id_produto);
                        const prods = values.produtos;
                        if (
                            produto.type === 'create' &&
                            values.produtos.length === 1 &&
                            values.produtos[0].id === 0
                          ) {
                            prods[0] = {
                              ...prod,
                              quantidade_disponivel: quantidade,
                              valor_total: prod.valor_unitario,
                              quantidade: 1,
                            };
                            setFieldValue('produtos', [{
                                ...prod,
                                quantidade_disponivel: quantidade,
                                valor_total: prod.valor_unitario,
                                quantidade: 1,
                              }]);
                              setFieldValue('valor', prod.valor_unitario);
                          } else if (produto.type === 'create') {
                            setFieldValue('produtos', prods.push({
                                ...prod,
                                quantidade_disponivel: quantidade,
                                valor_total: prod.valor_unitario,
                                quantidade: 1,
                            }));
                            setFieldValue('valor',values.valor + prod.valor_unitario);
                          } else if (produto.type === 'update' && produto.i) {
                            setFieldValue('valor',(values.valor - values.produtos[produto.i].valor_total) + prod.valor_unitario);
                            prods[produto.i] = {
                                ...prod,
                                quantidade_disponivel: quantidade,
                                valor_total: prod.valor_unitario,
                                quantidade: 1,
                            };
                            setFieldValue('produtos', [...prods]);
                          } else {
                            Alert.alert('Aviso', 'Erro ao selecionar o cliente!');
                          }
                    } catch (error) {
                        Alert.alert('Erro', (error as Error).message);
                    }
                }
            }
            insert_product();
          }, [produto]);
          return (
            <>
              <Box gap="$5">
                {values.cliente.id !== 0 && (
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
                {haveClientes && (
                  <Button
                    onPress={() => onChangeCliente(values.cliente.id)}
                  >
                    <ButtonText>
                      {values.cliente.id === 0
                        ? 'Selecionar Cliente'
                        : 'Atualizar Cliente'}
                    </ButtonText>
                  </Button>
                )}
                <Button
                  onPress={() => onCreateCliente()}
                >
                  <ButtonText>Cadastrar Cliente</ButtonText>
                </Button>
              </Box>

              <Box gap="$5">
                <Heading textAlign="center" size="xl">
                  Produtos
                </Heading>

                {values.produtos.map(({ quantidade, quantidade_disponivel, valor_total, valor_unitario, ...produto }, i) => {
                  if (produto.id !== 0) {
                    return (
                      <Box key={`produto-${i}`} gap="$5">
                        <Card>
                          <HStack>
                            <VStack>
                              <Heading size="lg">{produto.nome}</Heading>
                              <Text size="lg">{produto.marca}</Text>
                              <Text size="lg">{produto.tipo}</Text>
                              <Text>{quantidade} unidades</Text>
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
                                if ((quantidade + 1) < quantidade_disponivel) {
                                    setFieldValue('valor', values.valor + valor_unitario);
                                    setFieldValue(`produtos[${i}].valor_total`, valor_total + valor_unitario);
                                    setFieldValue(`produtos[${i}].quantidade`, quantidade + 1);
                                } else {
                                    Alert.alert("Aviso", "Nao ha mais produtos para poderem ser adicionados!");
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
                                const new_quantidade = Number(text.replace(',', '.'));
                                if (new_quantidade < quantidade_disponivel && new_quantidade > 0) {
                                    const old_valor_total = quantidade * valor_unitario;
                                    const new_valor_total = new_quantidade * valor_unitario;
                                    setFieldValue('valor', (values.valor - old_valor_total) + new_valor_total);
                                    setFieldValue(`produtos[${i}].valor_total`, new_valor_total);
                                    setFieldValue(`produtos[${i}].quantidade`, new_quantidade);
                                } else if (new_quantidade <= 0) {
                                    Alert.alert('Aviso', `O produto ${produto.nome} sera removido da venda, deseja fazer essa alteracao?`, [
                                        {
                                            text: 'Sim',
                                            onPress: async () => {
                                                setFieldValue('produtos', values.produtos.splice(i, 1));
                                                Alert.alert('Sucesso', 'Produto removido da venda!');
                                            },
                                        },
                                        {
                                            text: 'Não',
                                            onPress: () => Alert.alert('Aviso', 'Operação cancelada!'),
                                        }
                                    ])
                                } else {
                                    Alert.alert('Aviso', 'Quantidade invalida!');
                                }
                              }}
                              keyboardType="number-pad"
                            />
                            <Button
                              onPress={() => {
                                if (quantidade > 1) {
                                    setFieldValue('valor', values.valor - valor_unitario);
                                    setFieldValue(`produtos[${i}].quantidade`, quantidade - 1);
                                    setFieldValue(`produtos[${i}].valor_total`, valor_total - valor_unitario);
                                } else {
                                    Alert.alert('Aviso', `O produto ${produto.nome} sera removido da venda, deseja fazer essa alteracao?`, [
                                        {
                                            text: 'Sim',
                                            onPress: async () => {
                                                setFieldValue('produtos', values.produtos.splice(i, 1));
                                                Alert.alert('Sucesso', 'Produto removido da venda!');
                                            },
                                        },
                                        {
                                            text: 'Não',
                                            onPress: () => Alert.alert('Aviso', 'Operação cancelada!'),
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
                              Informe a quantidade de produtos.
                            </FormControlHelperText>
                          </FormControlHelper>

                          <FormControlError>
                            <FormControlErrorIcon as={AlertCircleIcon} />
                            <FormControlErrorText>
                              {errors.produtos && typeof errors.produtos[i] === "object" ?  errors.produtos[i].quantidade : ""}
                            </FormControlErrorText>
                          </FormControlError>
                        </FormControl>
                        <Button
                          onPress={() => {
                            onUpdateProductToVenda(values.produtos, i)
                            
                          }}
                        >
                          <ButtonText>Atualizar Produto</ButtonText>
                        </Button>
                      </Box>
                    );
                  }
                })}

                <Button
                  onPress={() => {
                    onAddProductToVenda(values.produtos);
                  }}
                >
                  <ButtonText>Adicionar Produto</ButtonText>
                </Button>
                <Button
                  onPress={() => onCreateProduct()}
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
                <Heading>Valor total</Heading>
                <Text>{mask(values.valor.toString(), 'money')}</Text>
              </Box>

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
    </>
  );
};
export default FormCreateVenda;
