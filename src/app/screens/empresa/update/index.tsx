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
  Card,
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
  HStack,
  VStack,
  Heading,
  Text,
  AlertCircleIcon,
  ChevronDownIcon,
  Box,
  ScrollView,
  ButtonIcon,
  RemoveIcon,
  AddIcon,
  CalendarDaysIcon,
} from '@gluestack-ui/themed';
import { Formik } from 'formik';
import { AtualizarEmpresaScreen } from '@/interfaces/empresa';
import LoadingScreen from '@/components/LoadingScreen';
import * as Yup from 'yup';
import { useIsFocused } from '@react-navigation/native';
import formatDate from '@utils/formatDate';
import { Pessoa } from '@/types/screens/cliente';
import { EmpresaService } from '@/classes/empresa/empresa.service';
import { useSQLiteContext } from 'expo-sqlite';
import { EmpresaUpdateData } from '@/classes/empresa/types';
import InputText from '@/components/Input';
import SelectEstados from '@/components/Custom/Selects/SelectEstados';

const validationSchema = Yup.object().shape({
  pessoa: Yup.object().shape({
    id: Yup.string(),
    nome: Yup.string().when('pessoa.id', (id_pessoa, schema) =>
      id_pessoa ? schema.required('Nome é obrigatório') : schema,
    ),
    data_nascimento: Yup.date().when('pessoa.id', (id_pessoa, schema) =>
      id_pessoa ? schema.required('Data de nascimento é obrigatória') : schema,
    ),
    cpf: Yup.string().when('pessoa.id', (id_pessoa, schema) =>
      id_pessoa ? schema.required('CPF é obrigatório') : schema,
    ),
  }),
  ramo: Yup.object().shape({
    id: Yup.string(),
    nome: Yup.string().when('ramo.id', (id_ramo, schema) =>
      id_ramo ? schema.required('Nome é obrigatório') : schema,
    ),
  }),
  telefones: Yup.array().of(
    Yup.object().shape({
      numero: Yup.string().required('Número de telefone é obrigatório'),
    }),
  ),
  endereco: Yup.object().shape({
    cep: Yup.string().required('CEP é obrigatório'),
    rua: Yup.string().required('Rua é obrigatória'),
    numero: Yup.string().required('Número é obrigatório'),
    complemento: Yup.string(),
    bairro: Yup.string().required('Bairro é obrigatório'),
    cidade: Yup.string().required('Cidade é obrigatória'),
    uf: Yup.string().required('UF e obrigatorio!'),
  }),
  email: Yup.array().of(
    Yup.object().shape({
      endereco: Yup.string().required('Endereço de email é obrigatório'),
    }),
  ),
  limite: Yup.string().required('Limite é obrigatório'),
});

const Update: React.FC<AtualizarEmpresaScreen> = ({ navigation, route }) => {
  if (!route || !route.params || !route.params.id) {
    navigation?.goBack();
    return null;
  }
  const { id } = route.params;
  const [isLoading, setIsLoading] = React.useState(true);
  const [pessoas, setPessoas] = React.useState<Array<Pessoa>>([
    {
      id: 1,
      nome: 'João',
      data_nascimento: '2000-04-05',
      cpf: '12345678901',
    },
    {
      id: 2,
      nome: 'Maria',
      data_nascimento: '1999-03-02',
      cpf: '98765432101',
    },
    {
      id: 3,
      nome: 'Pedro',
      data_nascimento: '1998-04-16',
      cpf: '98765432101',
    },
    {
      id: 4,
      nome: 'Maria',
      data_nascimento: '1975-07-20',
      cpf: '98765432101',
    },
    {
      id: 5,
      nome: 'Maria',
      data_nascimento: '1975-07-20',
      cpf: '98765432101',
    },
    {
      id: 6,
      nome: 'Maria',
      data_nascimento: '1975-07-20',
      cpf: '98765432101',
    },
    {
      id: 7,
      nome: 'Maria',
      data_nascimento: '1975-07-20',
      cpf: '98765432101',
    },
    {
      id: 8,
      nome: 'Maria',
      data_nascimento: '1975-07-20',
      cpf: '98765432101',
    },
    {
      id: 9,
      nome: 'Maria',
      data_nascimento: '1975-07-20',
      cpf: '98765432101',
    },
    {
      id: 10,
      nome: 'Maria',
      data_nascimento: '1975-07-20',
      cpf: '98765432101',
    },
  ]);
  const [isNewPerson, setIsNewPerson] = React.useState(false);
  const [isNewRamo, setIsNewRamo] = React.useState(false);
  const [empresa, setEmpresa] = React.useState<EmpresaUpdateData>({
    id: '',
    pessoa: {
      id: '',
      nome: '',
      data_nascimento: String(new Date()),
      cpf: '',
    },
    cnpj: '',
    nome_fantasia: '',
    razao_social: '',
    ramo: {
      id: '',
      nome: '',
    },
    telefones: [
      {
        id: '',
        numero: '',
      },
    ],
    endereco: {
      id: '',
      cep: '',
      logradouro: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade: '',
      uf: '',
    },
    emails: [
      {
        id: '',
        endereco: '',
      },
    ],
  });
  const db = useSQLiteContext();

  async function start() {
    try {
      const Emp = await new EmpresaService(db).getById(id);
      setEmpresa(Emp);
      setIsLoading(false);
    } catch (error) {
      navigation?.goBack();
      setIsLoading(false);
      throw error;
    }
  }

  React.useEffect(() => {
    start();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Box w="$full" h="$full">
      <ScrollView w="$full">
        <Box px="$8" py="$5">
          <Box w="$full" alignItems="center">
            <Text size="3xl">Atualizar Empresa:</Text>
          </Box>
          <Box>
            <Formik
              validationSchema={validationSchema}
              initialValues={empresa}
              onSubmit={() => {}}
            >
              {({ handleChange, setFieldValue, values, errors }) => {
                React.useEffect(() => {
                  console.log('modify pessoa');
                  if (route && route.params && route.params.pessoa) {
                    const { data_nascimento, ...person } = route.params.pessoa;
                    setFieldValue('pessoa', {
                      ...person,
                      data_nascimento: new Date(data_nascimento),
                    });
                  }
                }, [route?.params?.pessoa]);

                React.useEffect(() => {
                  console.log('modify ramo');
                  if (route && route.params && route.params.ramo) {
                    const rm = route.params.ramo;
                    setFieldValue('ramo', rm);
                  }
                }, [route?.params?.ramo]);

                return (
                  <Box gap="$5">
                    {values.pessoa.id === '' &&
                    !isNewPerson &&
                    pessoas.length > 0 ? (
                      <Box gap="$5" mt="$5">
                        <Heading size="md">Selecione uma pessoa:</Heading>
                        <Box gap="$5">
                          <Button
                            onPress={() => {
                              navigation?.navigate('selecionar-pessoa', {
                                screen: 'atualizar-empresa',
                                pessoas,
                              });
                            }}
                          >
                            <ButtonText>Selecionar Pessoa</ButtonText>
                          </Button>
                          <Button onPress={() => setIsNewPerson(true)}>
                            <ButtonText>Adicionar Pessoa</ButtonText>
                          </Button>
                        </Box>
                      </Box>
                    ) : values.pessoa.id !== '' && !isNewPerson ? (
                      <Box gap="$5">
                        <Card>
                          <HStack>
                            <VStack gap="$1.5">
                              <Box>
                                <Heading>Pessoa</Heading>
                              </Box>
                              <Box>
                                <Text size="xl">{values.pessoa.nome}</Text>
                              </Box>
                              <Box>
                                <Text>
                                  {formatDate(values.pessoa.data_nascimento)}
                                </Text>
                              </Box>
                              <Box>
                                <Text>{values.pessoa.cpf}</Text>
                              </Box>
                            </VStack>
                          </HStack>
                        </Card>
                        <Box gap="$5">
                          <Button
                            onPress={() => {
                              navigation?.navigate('selecionar-pessoa', {
                                pessoas,
                                screen: 'atualizar-empresa',
                                pessoaSelecionada: {
                                  ...values.pessoa,
                                  data_nascimento: String(
                                    values.pessoa.data_nascimento,
                                  ),
                                },
                              });
                            }}
                          >
                            <ButtonText>Alterar Pessoa</ButtonText>
                          </Button>
                        </Box>
                        <Button
                          onPress={() => {
                            setFieldValue('pessoa', {
                              nome: '',
                              data_nascimento: new Date(),
                              cpf: '',
                            });
                            setIsNewPerson(true);
                          }}
                        >
                          <ButtonText>Adicionar Pessoa</ButtonText>
                        </Button>
                      </Box>
                    ) : (
                      <>
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
                              placeholder="Nome Completo do Clinente"
                              onChangeText={handleChange('pessoa.nome')}
                              value={values.pessoa.nome}
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
                              {errors?.pessoa?.nome}
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
                              Data de nascimento
                            </FormControlLabelText>
                          </FormControlLabel>
                          <Input isReadOnly={true}>
                            <InputField
                              type="text"
                              value={values.pessoa.data_nascimento.toLocaleDateString(
                                'PT-BR',
                              )}
                              placeholder="05/05/2003"
                            />
                            <Button>
                              <ButtonIcon as={CalendarDaysIcon} />
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
                              {errors.pessoa?.data_nascimento}
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
                            <FormControlLabelText>CPF</FormControlLabelText>
                          </FormControlLabel>
                          <Input>
                            <InputField
                              type="text"
                              value={values.pessoa.cpf}
                              onChangeText={handleChange('pessoa.cpf')}
                              placeholder="123.123.123.12"
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
                              {errors.pessoa?.cpf}
                            </FormControlErrorText>
                          </FormControlError>
                        </FormControl>
                      </>
                    )}

                    {values.ramo.id === '' && !isNewRamo ? (
                      <Box>
                        <Box>
                          <Heading>Selecione o ramo</Heading>
                        </Box>
                        <Box gap="$5">
                          <Button
                            onPress={() =>
                              navigation?.navigate('selecionar-ramo', {
                                screen: 'atualizar-empresa',
                                ramoSelecionado: values.ramo,
                              })
                            }
                          >
                            <ButtonText>Selecionar Ramo</ButtonText>
                          </Button>
                          <Button onPress={() => setIsNewRamo(true)}>
                            <ButtonText>Adicionar Ramo</ButtonText>
                          </Button>
                        </Box>
                      </Box>
                    ) : !isNewRamo ? (
                      <Box gap="$5">
                        <Card>
                          <Box>
                            <Heading>Ramo:</Heading>
                          </Box>
                          <Box>
                            <Text>{values.ramo.nome}</Text>
                          </Box>
                        </Card>
                        <Box gap="$5">
                          <Button
                            onPress={() =>
                              navigation?.navigate('selecionar-ramo', {
                                screen: 'atualizar-empresa',
                                ramoSelecionado: values.ramo,
                              })
                            }
                          >
                            <ButtonText>Alterar Ramo</ButtonText>
                          </Button>
                          <Button onPress={() => setIsNewRamo(true)}>
                            <ButtonText>Adicionar Ramo</ButtonText>
                          </Button>
                        </Box>
                      </Box>
                    ) : (
                      <Box>
                        <FormControl
                          isInvalid={false}
                          size={'md'}
                          isDisabled={false}
                          isRequired={true}
                        >
                          <FormControlLabel>
                            <FormControlLabelText>Ramo</FormControlLabelText>
                          </FormControlLabel>
                          <Input>
                            <InputField
                              onChangeText={handleChange('ramo.nome')}
                              type="text"
                              placeholder="asdasdassadas"
                              value={values.ramo.nome}
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
                      </Box>
                    )}

                    <FormControl
                      isInvalid={false}
                      size={'md'}
                      isDisabled={false}
                      isRequired={true}
                    >
                      <FormControlLabel>
                        <FormControlLabelText>
                          Nome Fantasia
                        </FormControlLabelText>
                      </FormControlLabel>
                      <Input>
                        <InputField
                          type="text"
                          placeholder="Nome Fantasia"
                          onChangeText={handleChange('nome_fantasia')}
                          value={values.nome_fantasia}
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
                          {errors.nome_fantasia}
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
                          Razao Social
                        </FormControlLabelText>
                      </FormControlLabel>
                      <Input>
                        <InputField
                          type="text"
                          placeholder="Nome Completo do Clinente"
                          onChangeText={handleChange('razao_social')}
                          value={values.razao_social}
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
                          {errors.razao_social}
                        </FormControlErrorText>
                      </FormControlError>
                    </FormControl>
                    <InputText
                      inputType="cnpj"
                      value={values.cnpj}
                      onChangeValue={handleChange('cnpj')}
                      error={errors.cnpj}
                      isInvalid={errors.cnpj ? true : false}
                    />
                    <InputText
                      inputType="cep"
                      error={errors.endereco?.cep}
                      value={values.endereco?.cep}
                      onChangeValue={handleChange('endereco.cep')}
                      isInvalid={errors.endereco?.cep ? true : false}
                      isRequired={true}
                    />
                    <FormControl
                      isInvalid={false}
                      size={'md'}
                      isDisabled={false}
                      isRequired={true}
                    >
                      <FormControlLabel>
                        <FormControlLabelText>Rua</FormControlLabelText>
                      </FormControlLabel>
                      <Input>
                        <InputField
                          value={values.endereco.logradouro}
                          onChangeText={handleChange('endereco.logradouro')}
                          type="text"
                          placeholder="password"
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
                        <FormControlLabelText>Numero</FormControlLabelText>
                      </FormControlLabel>
                      <Input>
                        <InputField
                          value={String(values.endereco.numero)}
                          onChangeText={handleChange('endereco.numero')}
                          type="text"
                          placeholder="123"
                          keyboardType="number-pad"
                        />
                      </Input>

                      <FormControlHelper>
                        <FormControlHelperText>
                          Infome o numero da residencia.
                        </FormControlHelperText>
                      </FormControlHelper>

                      <FormControlError>
                        <FormControlErrorIcon as={AlertCircleIcon} />
                        <FormControlErrorText>
                          {errors.endereco?.numero}
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
                        <FormControlLabelText>Complemento</FormControlLabelText>
                      </FormControlLabel>
                      <Textarea>
                        <TextareaInput
                          value={values.endereco.complemento}
                          onChangeText={handleChange('endereco.complemento')}
                          type="text"
                          placeholder="Proximo a ..."
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
                    <FormControl
                      isInvalid={false}
                      size={'md'}
                      isDisabled={false}
                      isRequired={true}
                    >
                      <FormControlLabel>
                        <FormControlLabelText>Bairro</FormControlLabelText>
                      </FormControlLabel>
                      <Input>
                        <InputField
                          value={values.endereco.bairro}
                          onChangeText={handleChange('endereco.bairro')}
                          type="text"
                          placeholder="password"
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
                        <FormControlLabelText>Cidade</FormControlLabelText>
                      </FormControlLabel>
                      <Input>
                        <InputField
                          value={values.endereco.cidade}
                          onChangeText={handleChange('endereco.cidade')}
                          type="text"
                          placeholder="password"
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
                    <SelectEstados
                      error={errors.endereco?.uf}
                      value={values.endereco.uf}
                      onChangeValue={handleChange('endereco.uf')}
                      isInvalid={errors.endereco?.uf ? true : false}
                      isRequired={true}
                    />
                    <Box gap="$2.5">
                      {values.telefones.map((telefone, i) => {
                        return (
                          <Box key={`telefone-${i}`}>
                            <InputText
                              inputType="telefone"
                              error={
                                typeof errors.telefones !== 'undefined' &&
                                typeof errors.telefones[i] === 'object' &&
                                typeof errors.telefones[i] !== 'string'
                                  ? errors.telefones[i].numero
                                  : ''
                              }
                              value={values.telefones[i].numero}
                              onChangeValue={handleChange(
                                `telefones[${i}].numero`,
                              )}
                            />
                            <FormControl
                              isInvalid={false}
                              size={'md'}
                              isDisabled={false}
                              isRequired={true}
                            >
                              <FormControlLabel>
                                <FormControlLabelText>
                                  Telefone
                                </FormControlLabelText>
                              </FormControlLabel>
                              <Input>
                                <InputField
                                  value={telefone.numero}
                                  onChangeText={handleChange(
                                    `telefones[${i}].numero`,
                                  )}
                                  type="text"
                                  keyboardType="number-pad"
                                  placeholder="password"
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
                          </Box>
                        );
                      })}

                      <Button action="positive">
                        <ButtonIcon as={AddIcon} />
                      </Button>
                      <Button action="negative">
                        <ButtonIcon as={RemoveIcon} />
                      </Button>
                    </Box>

                    <Box gap="$2.5">
                      {values.emails.map((e, i) => {
                        return (
                          <Box key={`email-${i}`}>
                            <FormControl
                              isInvalid={false}
                              size={'md'}
                              isDisabled={false}
                              isRequired={true}
                            >
                              <FormControlLabel>
                                <FormControlLabelText>
                                  Email
                                </FormControlLabelText>
                              </FormControlLabel>
                              <Input>
                                <InputField
                                  value={e.endereco}
                                  type="text"
                                  onChangeText={handleChange(
                                    `emails[${i}].endereco`,
                                  )}
                                  placeholder="teste@teste.com"
                                  keyboardType="email-address"
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
                          </Box>
                        );
                      })}

                      <Button action="positive">
                        <ButtonIcon as={AddIcon} />
                      </Button>
                      <Button action="negative">
                        <ButtonIcon as={RemoveIcon} />
                      </Button>
                    </Box>

                    <Box>
                      <Button>
                        <ButtonText>Atualizar</ButtonText>
                      </Button>
                    </Box>
                  </Box>
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
