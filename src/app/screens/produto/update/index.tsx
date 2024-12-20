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
  Textarea,
  TextareaInput,
  HStack,
  VStack,
  Heading,
  AlertCircleIcon,
  Card,
  ButtonIcon,
} from '@gluestack-ui/themed';
import { Box, ScrollView, Text } from '@gluestack-ui/themed';
import { Formik } from 'formik';
import { FontAwesome6 } from '@expo/vector-icons';
import { AtualizarProdutoScreen } from '@/interfaces/produto';
import * as Yup from 'yup';
import InputDatePicker from '@/components/Custom/Inputs/DatePicker';
import LoadingScreen from '@/components/LoadingScreen';
import { mask } from '@/utils/mask';
import InputText from '@/components/Input';
import { useSQLiteContext } from 'expo-sqlite';
import { ProdutoService } from '@/classes/produto/produto.service';
import { getDateFromString, getStringFromDate } from '@/utils';
import MarcaService from '@/classes/marca/marca.service';
import TipoProdutoService from '@/classes/tipo_produto/tipo_produto.service';
import UmService from '@/classes/um/um.service';
import { Alert, GestureResponderEvent } from 'react-native';
const validationSchema = Yup.object().shape({
  codigo_de_barras: Yup.string().required('O código de barras é obrigatório'),
  nome: Yup.string().required('O nome é obrigatório'),
  descricao: Yup.string().required('A descrição é obrigatória'),
  valor: Yup.number().required('O valor é obrigatório'),
  data_de_validade: Yup.date().required('A data de válidade é obrigatória'),
  tipo_produto: Yup.object().shape({
    id: Yup.number().required('O tipo de produto é obrigatório'),
    nome: Yup.string().required('O nome é obrigatório'),
  }),
  marca: Yup.object().shape({
    id: Yup.number().required('A marca é obrigatória'),
    nome: Yup.string().required('O nome é obrigatório'),
  }),
  unidade_de_medida: Yup.object().shape({
    id: Yup.number().required('A unidade de medida é obrigatória'),
    nome: Yup.string().required('O nome é obrigatório'),
  }),
  tamanho: Yup.number().required('O tamanho é obrigatório'),
  unidade_de_armazenamento: Yup.object().shape({
    id: Yup.number().required('A unidade de armazenamento é obrigatório'),
    nome: Yup.string().required('O nome é obrigatório'),
  }),
});

const Update: React.FC<AtualizarProdutoScreen> = ({ navigation, route }) => {
  if (!route || !route.params || !route.params.id) {
    navigation?.goBack();
    return null;
  }
  const id_produto = route.params.id;
  const [isNewMarca, setIsNewMarca] = React.useState(false);
  const [isNewTipoProduto, setIsNewTipoProduto] = React.useState(false);
  const [isNewUnidadeDeMedida, setIsNewUnidadeDeMedida] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const db = useSQLiteContext();
  const [produto, setProduto] = React.useState({
    id: 0,
    codigo_de_barras: '12321332543534',
    nome: 'asdsadsadsa',
    descricao: 'asdasdsadasdsadsadasdsa' as string | null,
    data_de_validade: new Date(),
    valor: 200.00,
    tamanho: 50,
    marca: {
      id: 0,
      nome: 'KASKDAS',
    },
    tipo_produto: {
      id: 0,
      nome: 'asdasdsadsa',
    },
    unidade_de_medida: {
      id: 0,
      nome: 'mililitros',
      valor: 'ml',
    },
    unidade_de_armazenamento: {
      id: 0,
      nome: 'caixa-01',
    },
    empresa: {
      id: 1,
      nome_fantasia: 'asdasdsadas',
      razao_social: 'asdasdasdsadsa',
      cnpj: '12312323000112' as string | null,
      cpf: '12312312312',
    },
  });
  React.useEffect(() => {
    async function start() {
      try {
        const prod = await new ProdutoService(db).getProdutoById(id_produto);
        setProduto({...prod, data_de_validade: getDateFromString(prod.data_de_validade)});
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    }
    start();
  }, []);
  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <Box mx="$2">
      <ScrollView>
        <Box mt="$5" mx="$8">
          <Box mb="$8">
            <Heading textAlign="center" size="xl">
              Atualizar o Produto abaixo
            </Heading>
          </Box>
          <Box gap="$8" mb="$10">
            <Formik
              validationSchema={validationSchema}
              initialValues={produto}
              onSubmit={async (values) => {
                try {
                  const { empresa, marca, tipo_produto, unidade_de_armazenamento, unidade_de_medida, ...prod } = values;
                  if (marca.id === 0) {
                    marca.id = await new MarcaService(db).create(marca);
                  }  else {
                    await new ProdutoService(db).updateMarca(marca.id, marca);
                  }
                  if (tipo_produto.id === 0) {
                    tipo_produto.id = await new TipoProdutoService(db).create(tipo_produto);
                  }  else {
                    await new ProdutoService(db).updateTipoProduto(tipo_produto.id, tipo_produto);
                  }
                  if (unidade_de_medida.id === 0) {
                    unidade_de_medida.id = await new UmService(db).create(unidade_de_medida);
                  }  else {
                    await new ProdutoService(db).updateUnidadeDeMedida(unidade_de_medida.id, unidade_de_medida);
                  }
                  await new ProdutoService(db).updateProduto(prod.id, {...prod, data_de_validade: getStringFromDate(prod.data_de_validade), id_empresa: empresa.id, id_marca: marca.id, id_tipo_produto: tipo_produto.id, id_um: unidade_de_medida.id, id_ua: unidade_de_armazenamento.id });
                  Alert.alert('Sucesso', 'Produto atualizaddo com sucesso!');
                  navigation?.navigate('visualizar-produtos');
                } catch (err) {
                  Alert.alert('Erro', (err as Error).message);
                }
              }}
            >
              {({ values, errors, handleChange, handleSubmit, setFieldValue }) => {
                React.useEffect(() => {
                  if (route && route.params?.code) {
                    setFieldValue('codigo_de_barras', route.params.code);
                  }
                }, [route?.params?.code]);
                React.useEffect(() => {
                  if (route && route.params?.empresa) {
                    const emp = route.params.empresa;
                    setFieldValue('empresa', emp);
                  }
                }, [route?.params?.empresa]);
                React.useEffect(() => {
                  if (route && route.params?.marca) {
                    const marca = route.params.marca;
                    setFieldValue('marca.id', marca.id);
                    setFieldValue('marca.nome', marca.nome);
                  }
                }, [route?.params?.marca]);
                React.useEffect(() => {
                  if (route && route.params?.tipo_produto) {
                    const tipo = route.params.tipo_produto;
                    setFieldValue('tipo_produto', tipo);
                  }
                }, [route?.params?.tipo_produto]);

                React.useEffect(() => {
                  if (route && route.params?.um) {
                    const unidade = route.params.um;
                    setFieldValue('unidade_de_medida', unidade);
                  }
                }, [route?.params?.um]);

                React.useEffect(() => {
                  if (route && route.params?.ua) {
                    const unidade = route.params.ua;
                    setFieldValue('unidade_de_armazenamento', unidade);
                  }
                }, [route?.params?.ua]);

                return (
                  <>
                    {values.empresa.id != 0 && (
                      <>
                        <Card>
                          <Box gap="$5">
                            <Heading size="lg">Dados da Empresa</Heading>
                            <Box>
                              <Text>Nome da Fantasia</Text>
                              <Text>{values.empresa.nome_fantasia}</Text>
                            </Box>
                            <Box>
                              <Text>Razao Social</Text>
                              <Text>{values.empresa.razao_social}</Text>
                            </Box>
                            {values.empresa.cnpj !== '' && (
                              <Box>
                                <Text>CNPJ</Text>
                                <Text>{mask(String(values.empresa.cnpj), 'cnpj')}</Text>
                              </Box>
                            )}
                            {values.empresa.cnpj === '' && (
                              <Box>
                                <Text>CPF</Text>
                                <Text>{mask(values.empresa.cpf, 'cpf')}</Text>
                              </Box>
                            )}
                          </Box>
                        </Card>
                      </>
                    )}
                    <FormControl
                      isInvalid={false}
                      size={'md'}
                      isDisabled={false}
                      isRequired={true}
                    >
                      <Box>
                        <Button
                          onPress={() =>
                            navigation?.navigate('selecionar-empresa', {
                              screen: 'cadastrar-produto',
                            })
                          }
                        >
                          <ButtonText>{values.empresa.id != 0 ? "Atualizar Empresa" : "Selecionar Empresa"}</ButtonText>
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
                    <Box>
                      <Button
                        onPress={() => {
                          navigation?.navigate('screens-empresas');
                        }}
                      >
                        <ButtonText>Cadastrar Empresa</ButtonText>
                      </Button>
                    </Box>
                    {isNewMarca && (
                      <>
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
                              placeholder="Marca"
                              onChangeText={handleChange('marca.nome')}
                            />
                          </Input>

                          <FormControlHelper>
                            <FormControlHelperText>
                              Informe o nome da marca a ser cadastrada.
                            </FormControlHelperText>
                          </FormControlHelper>

                          <FormControlError>
                            <FormControlErrorIcon as={AlertCircleIcon} />
                            <FormControlErrorText>
                              {errors.marca?.nome}
                            </FormControlErrorText>
                          </FormControlError>
                        </FormControl>
                      </>
                    )}
                    <Box>
                      <Heading textAlign="center">Marca do Produto</Heading>
                    </Box>
                    {!isNewMarca && (
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
                    <Box gap="$5">
                      <Button
                        onPress={() => {
                          navigation?.navigate('selecionar-marca', {
                            screen: 'cadastrar-produto',
                            marcaSelecionada: values.marca,
                          });
                        }}
                      >
                        <ButtonText>
                          {values.marca.id !== 0
                            ? 'Atualizar Marca'
                            : 'Selecionar Marca'}
                        </ButtonText>
                      </Button>
                      {!isNewMarca && (
                        <>
                          <Button onPress={() => setIsNewMarca(true)}>
                            <ButtonText>atualizar dados da marca Marca</ButtonText>
                          </Button>
                        </>
                      )}
                    </Box>
                    <Box>
                      <Heading textAlign="center">Tipo do Produto</Heading>
                    </Box>
                    {values.tipo_produto.id !== 0 && !isNewTipoProduto && (
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
                    <Box gap="$5">
                      <Button
                        onPress={() => {
                          navigation?.navigate('selecionar-tipo-produto', {
                            screen: 'cadastrar-produto',
                            tipoProdutoSelecionado: values.tipo_produto,
                          });
                        }}
                      >
                        <ButtonText>
                          {values.marca.id !== 0
                            ? 'Atualizar Tipo do Produto'
                            : 'Selecionar Tipo do Produto'}
                        </ButtonText>
                      </Button>
                      {!isNewMarca && (
                        <>
                          <Button onPress={() => setIsNewTipoProduto(true)}>
                            <ButtonText>Atualizar dados do Tipo de Produto</ButtonText>
                          </Button>
                        </>
                      )}
                    </Box>

                    <Box>
                      <Heading textAlign="center">Unidade de Medida</Heading>
                    </Box>
                    {values.unidade_de_medida.id !== 0 &&
                      !isNewUnidadeDeMedida && (
                        <Box>
                          <Card>
                            <HStack>
                              <VStack gap="$5">
                                <Box>
                                  <Heading>
                                    Unidade de medida Selecionada:
                                  </Heading>
                                </Box>
                                <Box>
                                  <Text>{values.unidade_de_medida.nome}</Text>
                                </Box>
                              </VStack>
                            </HStack>
                          </Card>
                        </Box>
                      )}
                    {isNewUnidadeDeMedida && (
                      <Box gap="$5">
                        <FormControl
                          isInvalid={false}
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
                              onChangeText={handleChange(
                                'unidade_de_medida.nome',
                              )}
                              placeholder="password"
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
                              {errors.unidade_de_medida?.valor}
                            </FormControlErrorText>
                          </FormControlError>
                        </FormControl>
                      </Box>
                    )}

                    <Box gap="$5">
                      <Button
                        onPress={() => {
                          navigation?.navigate('selecionar-um', {
                            screen: 'cadastrar-produto',
                            umSelecionado: values.unidade_de_medida,
                          });
                        }}
                      >
                        <ButtonText>
                          {values.marca.id !== 0
                            ? 'Atualizar Unidade de Medida'
                            : 'Selecionar Unidade de Medida'}
                        </ButtonText>
                      </Button>
                      <Button onPress={() => setIsNewUnidadeDeMedida(true)}>
                        <ButtonText>Cadastrar Unidade de Medida</ButtonText>
                      </Button>
                    </Box>

                    <Box>
                      <Heading textAlign="center">
                        Unidade de Armazenamento
                      </Heading>
                    </Box>
                    {values.unidade_de_medida.id !== 0 && (
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
                                <Text>
                                  {values.unidade_de_armazenamento.nome}
                                </Text>
                              </Box>
                            </VStack>
                          </HStack>
                        </Card>
                      </Box>
                    )}

                    <Box gap="$5">
                      <Button
                        onPress={() => {
                          navigation?.navigate('selecionar-ua', {
                            screen: 'cadastrar-produto',
                            uaSelecionada: values.unidade_de_armazenamento,
                          });
                        }}
                      >
                        <ButtonText>
                          {values.marca.id !== 0
                            ? 'Atualizar Unidade de Armazenamento'
                            : 'Selecionar Unidade de Armazenamento'}
                        </ButtonText>
                      </Button>
                      <Button
                        onPress={() => {
                          navigation?.navigate('screens-uas');
                        }}
                      >
                        <ButtonText>
                          Cadastrar Unidade de Armazenamento
                        </ButtonText>
                      </Button>
                    </Box>

                    <InputDatePicker
                      value={values.data_de_validade}
                      title="Data de Válidade"
                      onChangeDate={(date) => setFieldValue('data_de_validade', date)}
                    />

                    <FormControl
                      isInvalid={errors.codigo_de_barras ? true : false}
                      size={'md'}
                      isDisabled={false}
                      isRequired={true}
                    >
                      <FormControlLabel>
                        <FormControlLabelText>
                          Código de barras
                        </FormControlLabelText>
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
                          onPress={() =>
                            navigation?.navigate('code-scanner', {
                              screen: 'cadastrar-produto',
                            })
                          }
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
                          Informe um codigo de barras.
                        </FormControlHelperText>
                      </FormControlHelper>

                      <FormControlError>
                        <FormControlErrorIcon as={AlertCircleIcon} />
                        <FormControlErrorText>
                          {errors.codigo_de_barras}
                        </FormControlErrorText>
                      </FormControlError>
                    </FormControl>
                    <FormControl
                      isInvalid={errors.nome ? true : false}
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
                          Informe o nome do produto
                        </FormControlHelperText>
                      </FormControlHelper>

                      <FormControlError>
                        <FormControlErrorIcon as={AlertCircleIcon} />
                        <FormControlErrorText>
                          {errors.nome}
                        </FormControlErrorText>
                      </FormControlError>
                    </FormControl>
                    <FormControl
                      isInvalid={errors.descricao ? true : false}
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
                          value={String(values.descricao)}
                          placeholder="Descrição"
                          onChangeText={handleChange('descricao')}
                        />
                      </Textarea>

                      <FormControlHelper>
                        <FormControlHelperText>
                          Informe a descricao do produto.
                        </FormControlHelperText>
                      </FormControlHelper>

                      <FormControlError>
                        <FormControlErrorIcon as={AlertCircleIcon} />
                        <FormControlErrorText>
                          {errors.descricao}
                        </FormControlErrorText>
                      </FormControlError>
                    </FormControl>
                   <InputText
                    title='Valor'
                    inputType="money"
                    value={values.valor.toString()}
                    onChangeValue={handleChange('valor')}
                    error={errors.valor}
                   />
                    <FormControl
                      isInvalid={errors.tamanho ? true : false}
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
                      </Input>

                      <FormControlHelper>
                        <FormControlHelperText>
                          Informe o tamanho.
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
                        <ButtonText>Atualizar Produto</ButtonText>
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
