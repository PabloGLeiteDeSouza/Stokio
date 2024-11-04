import {
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
  ChevronDownIcon,
} from '@gluestack-ui/themed';
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
import { CadastrarProdutoScreen } from '@/interfaces/produto';
import * as Yup from 'yup';
import InputDatePicker from '@/components/Custom/Inputs/DatePicker';
import LoadingScreen from '@/components/LoadingScreen';
import UmService from '@/classes/um/um.service';
import { useSQLiteContext } from 'expo-sqlite';
import MarcaService from '@/classes/marca/marca.service';
import TipoProdutoService from '@/classes/tipo_produto/tipo_produto.service';
import UaService from '@/classes/ua/ua.service';
import { EmpresaService } from '@/classes/empresa/empresa.service';
import InputText from '@/components/Input';
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
    valor: Yup.string().required('O valor é obrigatório'),
  }),
  tamanho: Yup.number().required('O tamanho é obrigatório'),
  unidade_de_armazenamento: Yup.object().shape({
    id: Yup.number().required('A unidade de armazenamento é obrigatório'),
    nome: Yup.string().required('O nome é obrigatório'),
  }),
});
const Create: React.FC<CadastrarProdutoScreen> = ({ navigation, route }) => {
  const [isNewMarca, setIsNewMarca] = React.useState(false);
  const [haveMarca, setHaveMarca] = React.useState(false);
  const [isNewTipoProduto, setIsNewTipoProduto] = React.useState(false);
  const [haveTipoProduto, setHaveTipoProduto] = React.useState(false);
  const [isNewUnidadeDeMedida, setIsNewUnidadeDeMedida] = React.useState(false);
  const [isHaveUnidadeDeMedida, setHaveUnidadeDeMedida] = React.useState(false);
  const [isHaveUnidadeDeArmazenamento, setHaveUnidadeDeArmazenamento] =
    React.useState(false);
  const [isHaveEmpresa, setIsHaveEmpresa] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const db = useSQLiteContext();
  React.useEffect(() => {
    async function start() {
      try {
        const ums = (await new UmService(db).getAll()).length > 0;
        if (!ums) {
          setHaveUnidadeDeMedida(true);
        } else {
          throw new Error('Nao empresas cadastradas', { cause: 'NO' });
        }
        const tipo_prod = (await new TipoProdutoService(db).getAll()).length > 0;
        if (!tipo_prod) {
          setHaveTipoProduto(true);
        } else {
          setIsNewTipoProduto(true);
        }
        const marca = (await new MarcaService(db).getAll()).length > 0;
        if (!marca) {
          setHaveMarca(true);
        } else {
          setIsNewMarca(true);
        }
        const ua = (await new UaService(db).findAll()).length > 0;
        if (!ua) {
          setHaveUnidadeDeArmazenamento(true);
        }
        const empresa = (await new EmpresaService(db).findAll()).length > 0;
        if (!empresa) {
          setIsHaveEmpresa(true);
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        throw error;
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
              Cadastre o Produto abaixo
            </Heading>
          </Box>
          <Box gap="$8" mb="$10">
            <Formik
              validationSchema={validationSchema}
              initialValues={{
                codigo_de_barras: '',
                nome: '',
                descricao: '',
                data_de_validade: new Date(),
                valor: '',
                quantidade: '0',
                tamanho: '',
                marca: {
                  id: '',
                  nome: '',
                },
                tipo_produto: {
                  id: '',
                  nome: '',
                },
                unidade_de_medida: {
                  id: '',
                  nome: '',
                  valor: '',
                },
                unidade_de_armazenamento: {
                  id: '',
                  nome: '',
                },
                empresa: {
                  id: '',
                  nome_fantaisa: '',
                  razao_social: '',
                  cnpj: '',
                  cpf: '',
                },
              }}
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
                    <Box>
                      <Heading textAlign="center">Empresa Responsável</Heading>
                    </Box>
                    {values.empresa.id != '' && (
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
                              <Text></Text>
                            </Box>
                            {values.empresa.cnpj !== '' && (
                              <Box>
                                <Text>CNPJ</Text>
                                <Text>{values.empresa.cnpj}</Text>
                              </Box>
                            )}
                            {values.empresa.cnpj === '' && (
                              <Box>
                                <Text>CPF</Text>
                                <Text>{values.empresa.cpf}</Text>
                              </Box>
                            )}
                          </Box>
                        </Card>
                      </>
                    )}
                    {isHaveEmpresa && (
                      <>
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
                              <ButtonText>Selecionar empresa</ButtonText>
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
                          navigation?.navigate('screens-empresas');
                        }}
                      >
                        <ButtonText>Cadastrar Empresa</ButtonText>
                      </Button>
                    </Box>
                    <Box>
                      <Heading textAlign="center">Marca do Produto</Heading>
                    </Box>
                    {values.marca.id !== '' && !isNewMarca && (
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
                    {haveMarca && (
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
                    )}
                    {isNewMarca && values.marca.id === '' && (
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
                      <Heading textAlign="center">Tipo do Produto</Heading>
                    </Box>
                    
                    {haveTipoProduto && (
                      <Box>
                        {values.tipo_produto.id !== '' && (
                          <>
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
                          </>
                        )}
                        <Box>
                          <Button
                            onPress={() => {
                              navigation?.navigate('selecionar-tipo-produto', {
                                screen: 'cadastrar-produto',
                                tipoProdutoSelecionado: values.tipo_produto,
                              });
                            }}
                          >
                            <ButtonText>
                              {values.tipo_produto.id !== ''
                                ? 'Atualizar Tipo do Produto'
                                : 'Selecionar Tipo do Produto'}
                            </ButtonText>
                          </Button>
                        </Box>
                      </Box>
                    )}
                    {!isNewTipoProduto && (
                      <Box gap="$5">
                        <Button onPress={() => setIsNewTipoProduto(true)}>
                          <ButtonText>Cadastrar Tipo de Produto</ButtonText>
                        </Button>
                      </Box>
                    )}
                    {isNewTipoProduto && (
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
                      <Heading textAlign="center">Unidade de Medida</Heading>
                    </Box>
                    {values.unidade_de_medida.id !== '' &&
                      isHaveUnidadeDeMedida && (
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
                                  <Text>{values.unidade_de_medida.valor}</Text>
                                </Box>
                              </VStack>
                            </HStack>
                          </Card>
                        </Box>
                      )}
                    {isHaveUnidadeDeMedida && (
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
                            {values.unidade_de_medida.id !== ''
                              ? 'Atualizar Unidade de Medida'
                              : 'Selecionar Unidade de Medida'}
                          </ButtonText>
                        </Button>
                        <Button onPress={() => setIsNewUnidadeDeMedida(true)}>
                          <ButtonText>Cadastrar Unidade de Medida</ButtonText>
                        </Button>
                      </Box>
                    )}

                    {isNewUnidadeDeMedida && (
                      <Box gap="$5">
                        <FormControl
                          isInvalid={
                            errors.unidade_de_medida?.nome ? true : false
                          }
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
                          isInvalid={
                            errors.unidade_de_medida?.valor ? true : false
                          }
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
                              onChangeText={handleChange(
                                'unidade_de_medida.valor',
                              )}
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
                      <Heading textAlign="center">
                        Unidade de Armazenamento
                      </Heading>
                    </Box>
                    {values.unidade_de_armazenamento.id !== '' && (
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

                    {isHaveUnidadeDeArmazenamento && (
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
                      </Box>
                    )}
                    {!isHaveUnidadeDeArmazenamento && (
                      <Box gap="$5">
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
                    )}

                    <InputDatePicker
                      value={values.data_de_validade}
                      title="Data de Válidade"
                      onChangeDate={(data) => setFieldValue('data_validade', data)}
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
                        {values.unidade_de_medida.value && (
                          <Box
                            h="$full"
                            justifyContent="center"
                            px="$5"
                            $light-bgColor="$blueGray700"
                            $dark-bgColor="$blueGray300"
                          >
                            <Text $light-color="$white" $dark-color="$black">
                              {values.unidade_de_medida.value}
                            </Text>
                          </Box>
                        )}
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
                        <ButtonText>Cadastrar Produto</ButtonText>
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
