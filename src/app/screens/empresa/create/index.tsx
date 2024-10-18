import { AddIcon, Card, Heading, RemoveIcon } from '@gluestack-ui/themed';
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
  ButtonIcon,
} from '@gluestack-ui/themed';
import { Box, Text } from '@gluestack-ui/themed';
import { Formik } from 'formik';
import { CalendarDaysIcon } from '@gluestack-ui/themed';
import { ScrollView } from '@gluestack-ui/themed';
import { Pessoa } from '@/types/screens/cliente';
import { CadastrarEmpresaScreen } from '@/interfaces/empresa';
import formatDate from '@/utils/formatDate';
import LoadingScreen from '@/components/LoadingScreen';
import * as Yup from 'yup';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { EmpresaService } from '@/classes/empresa/empresa.service';
import { useSQLiteContext } from 'expo-sqlite';
import { RamoService } from '@/classes/ramo/ramo.service';
import InputText from '@/components/Input';

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
  cnpj: Yup.string(),
  nome_fantasia: Yup.string().required('Nome fantasia e obrigatorio'),
  razao_social: Yup.string().required('Razao social e obrigatoria'),
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
});

const Create: React.FC<CadastrarEmpresaScreen> = ({ navigation, route }) => {
  const isFocused = useIsFocused();
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
  const db = useSQLiteContext();

  async function start() {
    try {
      const pss = await new EmpresaService(db).getAllPessoas();
      const rm = await new RamoService(db).haveRamos();
      if (pss.length < 1) {
        setIsNewPerson(true);
      } else {
        setPessoas([...pss]);
      }
      setIsNewRamo(!rm);
      setIsLoading(false);
    } catch (error) {
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
            <Text size="3xl">Cadastrar Empresa</Text>
          </Box>
          <Box>
            <Formik
              validationSchema={validationSchema}
              initialValues={{
                pessoa: {
                  id: '',
                  nome: '',
                  data_nascimento: new Date(),
                  cpf: '',
                },
                cnpj: '',
                nome_fantasia: '',
                razao_social: '',
                ramo: {
                  id: '',
                  nome: '',
                },
                endereco: {
                  cep: '',
                  rua: '',
                  numero: '',
                  complemento: '',
                  bairro: '',
                  cidade: '',
                  uf: '',
                },
                telefones: [
                  {
                    numero: '',
                  },
                ],
                email: [
                  {
                    endereco: '',
                  },
                ],
              }}
              onSubmit={() => {}}
            >
              {({ handleChange, setFieldValue, values, errors }) => {
                if (route?.params?.pessoa) {
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
                }
                if (route?.params?.ramo) {
                  React.useEffect(() => {
                    console.log('modify ramo');
                    if (route && route.params && route.params.ramo) {
                      const rm = route.params.ramo;
                      setFieldValue('ramo', rm);
                    }
                  }, [route?.params?.ramo]);
                }

                return (
                  <Box gap="$5">
                    {values.pessoa.id === '' && !isNewPerson && (
                      <Box gap="$5" mt="$5">
                        <Heading size="md">Selecione uma pessoa:</Heading>
                        <Box gap="$5">
                          <Button
                            onPress={() => {
                              navigation?.navigate('selecionar-pessoa', {
                                screen: 'cadastrar-empresa',
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
                    )}
                    {values.pessoa.id !== '' && !isNewPerson && (
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
                                screen: 'cadastrar-empresa',
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
                    )}

                    {isNewPerson && (
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
                                screen: 'cadastrar-empresa',
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
                                screen: 'cadastrar-empresa',
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
                      title="CNPJ"
                      inputType="cnpj"
                      value={values.cnpj}
                      error={errors.cnpj}
                      onChangeValue={handleChange('cnpj')}
                      size="md"
                      isInvalid={errors.cnpj ? true : false}
                      isRequired={true}
                    />
                    <InputText
                      size="md"
                      isInvalid={errors.endereco?.cep ? true : false}
                      inputType="cep"
                      value={values.endereco.cep}
                      error={errors.endereco?.cep}
                      onChangeValue={handleChange('endereco.cep')}
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
                          value={values.endereco.rua}
                          onChangeText={handleChange('endereco.rua')}
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
                          value={values.endereco.numero}
                          onChangeText={handleChange('endereco.numero')}
                          type="text"
                          placeholder="password"
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
                        <FormControlLabelText>Complemento</FormControlLabelText>
                      </FormControlLabel>
                      <Input>
                        <InputField
                          value={values.endereco.complemento}
                          onChangeText={handleChange('endereco.complemento')}
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
                    <FormControl
                      isInvalid={false}
                      size={'md'}
                      isDisabled={false}
                      isRequired={true}
                    >
                      <FormControlLabel>
                        <FormControlLabelText>UF</FormControlLabelText>
                      </FormControlLabel>
                      <Select
                        onValueChange={handleChange('endereco.uf')}
                        isInvalid={false}
                        isDisabled={false}
                      >
                        <SelectTrigger size={'md'} variant={'rounded'}>
                          <SelectInput placeholder="Selecione uma UF" />
                          <SelectIcon mr={'$3'} ml={0} as={ChevronDownIcon} />
                        </SelectTrigger>
                        <SelectPortal>
                          <SelectBackdrop />
                          <SelectContent>
                            <SelectDragIndicatorWrapper>
                              <SelectDragIndicator />
                            </SelectDragIndicatorWrapper>
                            <SelectItem
                              label="UX Research"
                              value="UX Research"
                            />
                            <SelectItem
                              label="Web Development"
                              value="Web Development"
                            />
                            <SelectItem
                              label="Cross Platform Development Process"
                              value="Cross Platform Development Process"
                            />
                            <SelectItem
                              label="UI Designing"
                              value="UI Designing"
                              isDisabled={true}
                            />
                            <SelectItem
                              label="Backend Development"
                              value="Backend Development"
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
                    <Box gap="$2.5">
                      {values.telefones.map((telefone, i) => {
                        return (
                          <Box key={`telefone-${i}`}>
                            <InputText
                              isInvalid={
                                errors.telefones &&
                                typeof errors?.telefones[i] === 'object'
                                  ? errors.telefones[i].numero
                                    ? true
                                    : false
                                  : false
                              }
                              inputType="telefone"
                              error={
                                errors.telefones &&
                                typeof errors?.telefones[i] === 'object'
                                  ? errors.telefones[i].numero
                                  : ''
                              }
                              value={values.telefones[i].numero}
                              size="md"
                              onChangeValue={handleChange(
                                `telefones[${i}].numero`,
                              )}
                            />
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
                      {values.email.map((e, i) => {
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
                                    `email[${i}].endereco`,
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
                        <ButtonText>Cadastrar</ButtonText>
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
export default Create;
