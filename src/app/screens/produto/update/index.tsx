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
import { getDateFromString } from '@/utils';
const validationSchema = Yup.object().shape({
  codigo_de_barras: Yup.string().required('O código de barras é obrigatório'),
  nome: Yup.string().required('O nome é obrigatório'),
  descricao: Yup.string().required('A descrição é obrigatória'),
  preco: Yup.number().required('O preço é obrigatório'),
  data_de_validade: Yup.date().required('A data de válidade é obrigatória'),
  tipo_produto: Yup.object().shape({
    id: Yup.number().required('O tipo de produto é obrigatório'),
    nome: Yup.string().required('O nome é obrigatório'),
  }),
  marca: Yup.object().shape({
    id: Yup.number().required('A marca é obrigatória'),
    nome: Yup.string().required('O nome é obrigatório'),
  }),
  quantidade: Yup.number().required('A quantidade é obrigatória'),
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
    codigo_de_barras: '12321332543534',
    nome: 'asdsadsadsa',
    descricao: 'asdasdsadasdsadsadasdsa' as string | null,
    data_de_validade: new Date(),
    valor: 200.00,
    quantidade: 20,
    tamanho: 50,
    marca: {
      id: 1,
      nome: 'KASKDAS',
    },
    tipo_produto: {
      id: 1,
      nome: 'asdasdsadsa',
    },
    unidade_de_medida: {
      id: 1,
      nome: 'mililitros',
      valor: 'ml',
    },
    unidade_de_armazenamento: {
      id: 1,
      nome: 'caixa-01',
    },
    empresa: {
      id: 1,
      nome_fantaisa: 'asdasdsadas',
      razao_social: 'asdasdasdsadsa',
      cnpj: '12312323000112',
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
              onSubmit={() => {}}
            >
              {({ values, errors, handleChange, setFieldValue }) => {
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
                              <Text>{values.empresa.nome_fantaisa}</Text>
                            </Box>
                            <Box>
                              <Text>Razao Social</Text>
                              <Text>{values.empresa.razao_social}</Text>
                            </Box>
                            {values.empresa.cnpj !== '' && (
                              <Box>
                                <Text>CNPJ</Text>
                                <Text>{mask(values.empresa.cnpj, 'cnpj')}</Text>
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
                          isInvalid={false}
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
                              Atleast 6 characters are required.
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
                                <Heading>Maarca Selecionada:</Heading>
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
                          {values.marca.id !== ''
                            ? 'Atualizar Marca'
                            : 'Selecionar Marca'}
                        </ButtonText>
                      </Button>
                      {!isNewMarca && (
                        <>
                          <Button onPress={() => setIsNewMarca(true)}>
                            <ButtonText>Cadastrar Marca</ButtonText>
                          </Button>
                        </>
                      )}
                    </Box>
                    <Box>
                      <Heading textAlign="center">Tipo do Produto</Heading>
                    </Box>
                    {values.tipo_produto.id !== '' && !isNewTipoProduto && (
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
                          {values.marca.id !== ''
                            ? 'Atualizar Tipo do Produto'
                            : 'Selecionar Tipo do Produto'}
                        </ButtonText>
                      </Button>
                      {!isNewMarca && (
                        <>
                          <Button onPress={() => setIsNewTipoProduto(true)}>
                            <ButtonText>Cadastrar Tipo de Produto</ButtonText>
                          </Button>
                        </>
                      )}
                    </Box>

                    <Box>
                      <Heading textAlign="center">Unidade de Medida</Heading>
                    </Box>
                    {values.unidade_de_medida.id !== '' &&
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
                          isInvalid={false}
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
                              value={values.unidade_de_medida.value}
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
                              Atleast 6 characters are required.
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
                          {values.marca.id !== ''
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
                    {values.unidade_de_medida.id !== '' && (
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
                          {values.marca.id !== ''
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
                      onChangeDate={handleChange('data_de_validade')}
                    />
                    <FormControl
                      isInvalid={false}
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
                    title='Valor'
                    inputType="money"
                    value={values.valor.toString()}
                    onChangeValue={handleChange('valor')}
                    error={errors.valor}
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
                          placeholder="500"
                          onChangeText={handleChange('quantidade')}
                          keyboardType="number-pad"
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
