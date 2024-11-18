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
  Box,
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
  Heading,
  Text,
  Center,
  Icon,
  CircleIcon,
  CheckIcon,
  AlertCircleIcon,
  ChevronDownIcon,
  ButtonIcon,
} from '@gluestack-ui/themed';

import { Formik } from 'formik';
import React from 'react';
import { validationSchema } from './validation';
import { Card } from '@gluestack-ui/themed';
import { IFormCreateProduto } from './interfaces';
import InputDatePicker from '@/components/Custom/Inputs/DatePicker';
import { FontAwesome6 } from '@expo/vector-icons';
import InputText from '@/components/Input';
import { mask } from '@/utils/mask';
import { ProdutoService } from '@/classes/produto/produto.service';
import { Alert, GestureResponderEvent } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import MarcaService from '@/classes/marca/marca.service';
import TipoProdutoService from '@/classes/tipo_produto/tipo_produto.service';
import { getStringFromDate } from '@/utils';
import { string } from 'yup';
import UmService from '@/classes/um/um.service';

const FormCreateProduto: React.FC<IFormCreateProduto> = ({ onCreatedProduto, db, onRedirectProductExists, onCodeScanner, code, haveEmpresas, haveMarcas, haveTiposProdutos, 
  haveUas, haveUms, onCreateEmpresa, onCreateUa, onSelectEmpresa, onSelectMarca, onSelectTipoProduto, onSelectUa, onSelectUm, empresa, ua, tipo_produto, um, marca }) => {
  const [newTipoProduto, setNewTipoProduto] = React.useState(!haveTiposProdutos);
  const [newUm, setNewUm] = React.useState(!haveUms);
  const [newMarca, setNewMarca] = React.useState(!haveMarcas);

  return (
    <>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          codigo_de_barras: '',
          nome: '',
          descricao: '',
          data_de_validade: new Date(),
          valor: '',
          quantidade: '',
          tamanho: '',
          marca: {
            id: Number(null),
            nome: '',
          },
          tipo_produto: {
            id: Number(null),
            nome: '',
          },
          unidade_de_medida: {
            id: Number(null),
            nome: '',
            valor: '',
          },
          unidade_de_armazenamento: {
            id: Number(null),
            nome: '',
            tipo: '',
          },
          empresa: {
            id: Number(null),
            nome_fantasia: '',
            razao_social: '',
            cnpj: '',
            cpf: '',
          },
        }}
        onSubmit={async (values) => {
          try {
            const {marca, tipo_produto, unidade_de_medida, unidade_de_armazenamento, empresa, descricao, nome, quantidade, tamanho, valor, codigo_de_barras, data_de_validade} = values;
            if (marca.id === 0) {
              marca.id = await new MarcaService(db).create(values.marca);
            }
            if (tipo_produto.id === 0) {
              tipo_produto.id = await new TipoProdutoService(db).create(values.tipo_produto);
            }
            if (unidade_de_medida.id === 0) {
              unidade_de_medida.id = await new UmService(db).create(values.unidade_de_medida);
            }
            await new ProdutoService(db).createProduto({idMarca: marca.id, id_tipo_produto: tipo_produto.id, codigo_de_barras, data_de_validade: getStringFromDate(data_de_validade), id_ua: unidade_de_armazenamento.id, id_um: unidade_de_medida.id, nome: nome, quantidade: Number(quantidade), tamanho: Number(tamanho), valor: Number(valor), descricao });
            Alert.alert('Sucesso', 'Produto cadastrado com sucesso!');
            onCreatedProduto();
          } catch (error) {
            Alert.alert('Erro', (error as Error).message);
          }
        }}
      >
        {({ values, errors, handleSubmit, handleChange, setFieldValue }) => {
          React.useEffect(() => {
            async function start(code: string) {
              try {
                const res = await new ProdutoService(db).getProdutoByCodigoDeBarras(code);
                if (res) {
                  Alert.alert('Aviso', 'O produto ja existe')
                  onRedirectProductExists();
                }
                setFieldValue('codigo_de_barras', code);
              } catch (err) {
                Alert.alert('Erro', (err as Error).message);
              }
            }
            console.log(code)
            if (code) {
              start(code)
            }
          }, [code]);
          React.useEffect(() => {
            if (empresa) {
              setFieldValue('empresa', empresa);
            }
          }, [empresa]);
          React.useEffect(() => {
            if (marca) {
              setFieldValue('marca.id', marca.id);
              setFieldValue('marca.nome', marca.nome);
            }
          }, [marca]);
          React.useEffect(() => {
            if (tipo_produto) {
              setFieldValue('tipo_produto', tipo_produto);
            }
          }, [tipo_produto]);
          React.useEffect(() => {
            if (um) {
              setFieldValue('unidade_de_medida', um);
            }
          }, [um]);
          React.useEffect(() => {
            if (ua) {
              setFieldValue('unidade_de_armazenamento', ua);
            }
          }, [ua]);


          return (
            <>
              <Box>
                <Heading size="xl" textAlign="center">Empresa Responsável</Heading>
              </Box>
              {values.empresa.id != 0 && (
                <>
                  <Card>
                    <Box gap="$5">
                      <Heading size="xl">Dados da Empresa</Heading>
                      <Box>
                        <Heading>Nome da Fantasia</Heading>
                        <Text>{values.empresa.nome_fantasia}</Text>
                      </Box>
                      <Box>
                        <Heading>Razao Social</Heading>
                        <Text>{values.empresa.razao_social}</Text>
                      </Box>
                      {values.empresa.cpf !== '' && (
                        <Box>
                          <Heading>CPF</Heading>
                          <Text>{mask(values.empresa.cpf, 'cpf')}</Text>
                        </Box>
                      )}
                      {values.empresa.cnpj !== '' && (
                        <Box>
                          <Heading>CNPJ</Heading>
                          <Text>{mask(values.empresa.cnpj, 'cnpj')}</Text>
                        </Box>
                      )}
                    </Box>
                  </Card>
                </>
              )}
              {haveEmpresas && (
                <>
                  <FormControl
                    isInvalid={false}
                    size={'md'}
                    isDisabled={false}
                    isRequired={true}
                  >
                    <Box>
                      <Button
                        onPress={() => {
                            onSelectEmpresa(values.empresa);
                        }}
                      >
                        <ButtonText>{values.empresa.id != 0 ? "Atualizar empresa" : "Selecionar empresa"}</ButtonText>
                      </Button>
                    </Box>
                    <FormControlHelper>
                      <FormControlHelperText>
                        Você deve selecionar a empresa.
                      </FormControlHelperText>
                    </FormControlHelper>

                    <FormControlError>
                      <FormControlErrorIcon as={AlertCircleIcon} />
                      <FormControlErrorText>
                        {errors.empresa?.id}
                      </FormControlErrorText>
                    </FormControlError>
                  </FormControl>
                </>
              )}

              <Box>
                <Button
                  onPress={() => {
                    onCreateEmpresa()
                  }}
                >
                  <ButtonText>Cadastrar Empresa</ButtonText>
                </Button>
              </Box>

              <Box>
                <Heading size="xl" textAlign="center">Marca do Produto</Heading>
              </Box>

              {values.marca.id !== 0 && (
                <Box>
                  <Card>
                    <HStack>
                      <VStack gap="$5">
                        <Box>
                          <Heading>Marca Selecionada:</Heading>
                        </Box>
                        <Box>
                          <Text>{values.marca.nome}</Text>
                        </Box>
                      </VStack>
                    </HStack>
                  </Card>
                </Box>
              )}

              {haveMarcas && (
                <>
                  <Button
                    onPress={() => {
                      setNewMarca(false);
                      onSelectMarca(values.marca);
                    }}
                  >
                    <ButtonText>
                      {values.marca.id !== 0
                        ? 'Atualizar Marca'
                        : 'Selecionar Marca'}
                    </ButtonText>
                  </Button>
                  
                </>
              )}

              {!newMarca && (
                <Box>
                  <Button onPress={() => {
                    setFieldValue('marca', {
                      id: 0,
                      nome: '',
                    });
                    setNewMarca(true)
                  }}>
                    <ButtonText>Cadastrar Marca</ButtonText>
                  </Button>
                </Box>
              )}

              {newMarca && (
                <FormControl
                  isInvalid={errors.marca?.nome ? true : false}
                  size={'md'}
                  isDisabled={false}
                  isRequired={true}
                >
                  <FormControlLabel>
                    <FormControlLabelText>Marca</FormControlLabelText>
                  </FormControlLabel>
                  <Input>
                    <InputField
                      type="text"
                      value={values.marca.nome}
                      placeholder="marca"
                      onChangeText={handleChange('marca.nome')}
                    />
                  </Input>

                  <FormControlHelper>
                    <FormControlHelperText>
                      Informe o nome da marca.
                    </FormControlHelperText>
                  </FormControlHelper>

                  <FormControlError>
                    <FormControlErrorIcon as={AlertCircleIcon} />
                    <FormControlErrorText>
                      {errors.marca?.nome}
                    </FormControlErrorText>
                  </FormControlError>
                </FormControl>
              )}
                
              <Box>
                <Heading size="xl" textAlign="center">Tipo do Produto</Heading>
              </Box>

              {values.tipo_produto.id !== 0 && (
                <Box>
                  <Card>
                    <HStack>
                      <VStack gap="$5">
                        <Box>
                          <Heading>Tipo do Produto Selecionado:</Heading>
                        </Box>
                        <Box>
                          <Text>{values.tipo_produto.nome}</Text>
                        </Box>
                      </VStack>
                    </HStack>
                  </Card>
                </Box>
              )}

              {haveTiposProdutos && (
                <Box>
                  <Button
                    onPress={() => {
                      setNewTipoProduto(false);
                      onSelectTipoProduto(values.tipo_produto);
                    }}
                  >
                    <ButtonText>
                      {values.tipo_produto.id !== 0
                        ? 'Atualizar Tipo do Produto'
                        : 'Selecionar Tipo do Produto'}
                    </ButtonText>
                  </Button>
                </Box>
              )}

              {!newTipoProduto && (
                <Box gap="$5">
                  <Button onPress={() => {
                    setFieldValue('tipo_produto', {
                      id: Number(null),
                      nome: '',
                    });
                    setNewTipoProduto(true)
                  }}>
                    <ButtonText>Cadastrar Tipo de Produto</ButtonText>
                  </Button>
                </Box>
              )}
              {newTipoProduto && (
                <Box>
                  <FormControl
                    isInvalid={errors.tipo_produto?.nome ? true : false}
                    size={'md'}
                    isDisabled={false}
                    isRequired={true}
                  >
                    <FormControlLabel>
                      <FormControlLabelText>
                        Tipo de Produto
                      </FormControlLabelText>
                    </FormControlLabel>
                    <Input>
                      <InputField
                        type="text"
                        value={values.tipo_produto.nome}
                        placeholder="Desodorante Roll'on"
                        onChangeText={handleChange('tipo_produto.nome')}
                      />
                    </Input>

                    <FormControlHelper>
                      <FormControlHelperText>
                        Informe o nome do tipo de produto.
                      </FormControlHelperText>
                    </FormControlHelper>

                    <FormControlError>
                      <FormControlErrorIcon as={AlertCircleIcon} />
                      <FormControlErrorText>
                        {errors.tipo_produto?.nome}
                      </FormControlErrorText>
                    </FormControlError>
                  </FormControl>
                </Box>
              )}
              <Box>
                <Heading size="xl" textAlign="center">Unidade de Medida</Heading>
              </Box>
              {values.unidade_de_medida.id !== 0 && ( 
                <Box>
                  <Card>
                    <HStack>
                      <VStack gap="$5">
                        <Box>
                          <Heading>Unidade de medida Selecionada:</Heading>
                        </Box>
                        <Box>
                          <Text>{values.unidade_de_medida.nome}</Text>
                          <Text>{values.unidade_de_medida.valor}</Text>
                        </Box>
                      </VStack>
                    </HStack>
                  </Card>
                </Box>
              )}
              {haveUms && (
                <Box gap="$5">
                  <Button
                    onPress={() => {
                      setNewUm(false);
                      onSelectUm(values.unidade_de_medida)
                    }}
                  >
                    <ButtonText>
                      {values.unidade_de_medida.id !== 0
                        ? 'Atualizar Unidade de Medida'
                        : 'Selecionar Unidade de Medida'}
                    </ButtonText>
                  </Button>
                </Box>
                
              )}
              {!newUm && (
                <Box>
                  <Button onPress={() => {
                    setFieldValue('unidade_de_medida', {
                      id: 0,
                      nome: '',
                      valor: '',
                    })
                    setNewUm(true);
                  }}>
                    <ButtonText>Cadastrar Unidade de Medida</ButtonText>
                  </Button>
                </Box>
              )}
              {newUm && (
                <Box gap="$5">
                  <FormControl
                    isInvalid={errors.unidade_de_medida?.nome ? true : false}
                    size={'md'}
                    isDisabled={false}
                    isRequired={true}
                  >
                    <FormControlLabel>
                      <FormControlLabelText>
                        Nome Unidade De Medida
                      </FormControlLabelText>
                    </FormControlLabel>
                    <Input>
                      <InputField
                        type="text"
                        value={values.unidade_de_medida.nome}
                        onChangeText={handleChange('unidade_de_medida.nome')}
                        placeholder="Nome"
                      />
                    </Input>

                    <FormControlHelper>
                      <FormControlHelperText>
                        Infome a o nome da unidade de medida.
                      </FormControlHelperText>
                    </FormControlHelper>

                    <FormControlError>
                      <FormControlErrorIcon as={AlertCircleIcon} />
                      <FormControlErrorText>
                        {errors.unidade_de_medida?.nome}
                      </FormControlErrorText>
                    </FormControlError>
                  </FormControl>
                  <FormControl
                    isInvalid={errors.unidade_de_medida?.valor ? true : false}
                    size={'md'}
                    isDisabled={false}
                    isRequired={true}
                  >
                    <FormControlLabel>
                      <FormControlLabelText>
                        Valor da unidade de medida
                      </FormControlLabelText>
                    </FormControlLabel>
                    <Input>
                      <InputField
                        type="text"
                        value={values.unidade_de_medida.valor}
                        placeholder="cm"
                        onChangeText={handleChange('unidade_de_medida.valor')}
                      />
                    </Input>

                    <FormControlHelper>
                      <FormControlHelperText>
                        Informe o Valor da unidade de medida exemplo
                        cm/centrimetros.
                      </FormControlHelperText>
                    </FormControlHelper>

                    <FormControlError>
                      <FormControlErrorIcon as={AlertCircleIcon} />
                      <FormControlErrorText>
                        Atleast 6 characters are required.
                      </FormControlErrorText>
                    </FormControlError>
                  </FormControl>
                </Box>
              )}

              <Box>
                <Heading size="xl" textAlign="center">Unidade de Armazenamento</Heading>
              </Box>
              {values.unidade_de_armazenamento.id !== 0 && (
                <Box>
                  <Card>
                    <HStack>
                      <VStack gap="$5">
                        <Box>
                          <Heading>
                            Unidade de Armazenamento Selecionado:
                          </Heading>
                        </Box>
                        <Box>
                          <Text>{values.unidade_de_armazenamento.nome}</Text>
                        </Box>
                      </VStack>
                    </HStack>
                  </Card>
                </Box>
              )}
              {haveUas && (
                <>
                  <Box gap="$5">
                    <Button
                      onPress={() => {
                        onSelectUa(values.unidade_de_armazenamento);
                      }}
                    >
                      <ButtonText>
                        {values.unidade_de_armazenamento.id !== 0
                          ? 'Atualizar Unidade de Armazenamento'
                          : 'Selecionar Unidade de Armazenamento'}
                      </ButtonText>
                    </Button>
                  </Box>
                </>
              )}
              <Box gap="$5">
                <Button
                  onPress={() => {
                    onCreateUa();
                  }}
                >
                  <ButtonText>Cadastrar Unidade de Armazenamento</ButtonText>
                </Button>
              </Box>

              <InputDatePicker
                minimumDate={new Date()}
                value={values.data_de_validade}
                title="Data de Válidade"
                onChangeDate={(data) => setFieldValue('data_de_validade', data)}
              />
              <FormControl
                isInvalid={false}
                size={'md'}
                isDisabled={false}
                isRequired={true}
              >
                <FormControlLabel>
                  <FormControlLabelText>Código de barras</FormControlLabelText>
                </FormControlLabel>
                <Input>
                  <InputField
                    type="text"
                    value={values.codigo_de_barras}
                    placeholder="2132142343232"
                    keyboardType="number-pad"
                    onChangeText={handleChange('codigo_de_barras')}
                  />
                  <Button
                    onPress={() => onCodeScanner()}
                  >
                    <ButtonIcon
                      as={(props: object) => (
                        <FontAwesome6 name="barcode" {...props} />
                      )}
                    />
                  </Button>
                </Input>

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
              <FormControl
                isInvalid={false}
                size={'md'}
                isDisabled={false}
                isRequired={true}
              >
                <FormControlLabel>
                  <FormControlLabelText>Nome</FormControlLabelText>
                </FormControlLabel>
                <Input>
                  <InputField
                    type="text"
                    onChangeText={handleChange('nome')}
                    placeholder="Nome do produto"
                    value={values.nome}
                  />
                </Input>

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
              <FormControl
                isInvalid={false}
                size={'md'}
                isDisabled={false}
                isRequired={true}
              >
                <FormControlLabel>
                  <FormControlLabelText>Descrição</FormControlLabelText>
                </FormControlLabel>
                <Textarea>
                  <TextareaInput
                    type="text"
                    value={values.descricao}
                    placeholder="Descrição"
                    onChangeText={handleChange('descricao')}
                  />
                </Textarea>

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
              <InputText
                title="Valor"
                inputType="money"
                error={errors.valor}
                value={values.valor}
                onChangeValue={handleChange('valor')}
                isInvalid={errors.valor ? true : false}
                size="md"
              />
              <FormControl
                isInvalid={false}
                size={'md'}
                isDisabled={false}
                isRequired={true}
              >
                <FormControlLabel>
                  <FormControlLabelText>Quantidade</FormControlLabelText>
                </FormControlLabel>
                <Input>
                  <InputField
                    type="text"
                    value={values.quantidade.toString()}
                    placeholder="100"
                    onChangeText={handleChange('quantidade')}
                    keyboardType="number-pad"
                  />
                </Input>

                <FormControlHelper>
                  <FormControlHelperText>
                    Infrome uma quantidade.
                  </FormControlHelperText>
                </FormControlHelper>

                <FormControlError>
                  <FormControlErrorIcon as={AlertCircleIcon} />
                  <FormControlErrorText>
                    {errors.quantidade}
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
                  <FormControlLabelText>Tamanho</FormControlLabelText>
                </FormControlLabel>
                <Input>
                  <InputField
                    type="text"
                    value={values.tamanho.toString()}
                    placeholder="100"
                    onChangeText={handleChange('tamanho')}
                    keyboardType="number-pad"
                  />
                  {values.unidade_de_medida.valor && (
                    <Box
                      h="$full"
                      justifyContent="center"
                      px="$5"
                      $light-bgColor="$blueGray700"
                      $dark-bgColor="$blueGray300"
                    >
                      <Text $light-color="$white" $dark-color="$black">
                        {values.unidade_de_medida.valor}
                      </Text>
                    </Box>
                  )}
                </Input>

                <FormControlHelper>
                  <FormControlHelperText>
                    Infrome o tamanho do produto.
                  </FormControlHelperText>
                </FormControlHelper>

                <FormControlError>
                  <FormControlErrorIcon as={AlertCircleIcon} />
                  <FormControlErrorText>
                    {errors.tamanho}
                  </FormControlErrorText>
                </FormControlError>
              </FormControl>
              <Box>
                <Button onPress={handleSubmit as unknown as (event: GestureResponderEvent) => void}>
                  <ButtonText>Cadastrar Produto</ButtonText>
                </Button>
              </Box>
            </>
          );
        }}
      </Formik>
    </>
  );
};

export default FormCreateProduto;