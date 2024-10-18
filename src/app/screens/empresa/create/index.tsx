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
import SelectEstados from '@/components/Custom/Selects/SelectEstados';
import { GestureResponderEvent } from 'react-native';
import InputDatePicker from '@/components/Custom/Inputs/DatePicker';
import { getMinDateFor18YearsOld } from '@/utils';

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
    logradouro: Yup.string().required('Logradouro é obrigatório'),
    numero: Yup.string().required('Número é obrigatório'),
    complemento: Yup.string(),
    bairro: Yup.string().required('Bairro é obrigatório'),
    cidade: Yup.string().required('Cidade é obrigatória'),
    uf: Yup.string().required('UF e obrigatorio!'),
  }),
  emails: Yup.array().of(
    Yup.object().shape({
      endereco: Yup.string().required('Endereço de email é obrigatório'),
    }),
  ),
});

const Create: React.FC<CadastrarEmpresaScreen> = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [pessoas, setPessoas] = React.useState<Array<Pessoa>>([]);
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
          <Box gap="$5">
            <Formik
              validationSchema={validationSchema}
              initialValues={{
                pessoa: {
                  id: '',
                  nome: '',
                  data_nascimento: getMinDateFor18YearsOld(),
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
                  logradouro: '',
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
                emails: [
                  {
                    endereco: '',
                  },
                ],
              }}
              onSubmit={async (values) => {
                try {
                  const res = new EmpresaService(db).create()
                } catch (error) {
                  
                }
              }}
            >
              {({
                handleChange,
                handleSubmit,
                setFieldValue,
                values,
                errors,
              }) => {
                if (route?.params?.pessoa) {
                  React.useEffect(() => {
                    console.log('modify pessoa');
                    if (route && route.params && route.params.pessoa) {
                      const { data_nascimento, ...person } =
                        route.params.pessoa;
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
                  <Box gap="$8">
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
                          isInvalid={errors.pessoa?.nome ? true : false}
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
                              informe o nome da pessoa responsável.
                            </FormControlHelperText>
                          </FormControlHelper>

                          <FormControlError>
                            <FormControlErrorIcon as={AlertCircleIcon} />
                            <FormControlErrorText>
                              {errors?.pessoa?.nome}
                            </FormControlErrorText>
                          </FormControlError>
                        </FormControl>

                        <InputDatePicker
                          title="Data de nascimento"
                          maximumDate={getMinDateFor18YearsOld()}
                          value={values.pessoa.data_nascimento}
                          onChangeDate={handleChange('pessoa.data_nascimento')}
                          error={errors.pessoa?.data_nascimento}
                        />
                        <InputText
                          isInvalid={errors.pessoa?.cpf ? true : false}
                          error={errors.pessoa?.cpf}
                          value={values.pessoa.cpf}
                          onChangeValue={handleChange('pessoa.cpf')}
                          inputType="cpf"
                        />
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
                          isInvalid={errors.ramo?.nome ? true : false}
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
                              Informe o nome do ramo.
                            </FormControlHelperText>
                          </FormControlHelper>

                          <FormControlError>
                            <FormControlErrorIcon as={AlertCircleIcon} />
                            <FormControlErrorText>
                              {errors.ramo?.nome}
                            </FormControlErrorText>
                          </FormControlError>
                        </FormControl>
                      </Box>
                    )}

                    <FormControl
                      isInvalid={errors.nome_fantasia ? true : false}
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
                          {
                            'Informe o nome fantasia ou nome da pessoa (se caso for pessoa física).'
                          }
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
                      isInvalid={errors.razao_social ? true : false}
                      size={'md'}
                      isDisabled={false}
                      isRequired={true}
                    >
                      <FormControlLabel>
                        <FormControlLabelText>
                          Razão Social
                        </FormControlLabelText>
                      </FormControlLabel>
                      <Input>
                        <InputField
                          type="text"
                          placeholder="Nome Completo ou Razão social da empresa"
                          onChangeText={handleChange('razao_social')}
                        />
                      </Input>

                      <FormControlHelper>
                        <FormControlHelperText>
                          Informe uma razão social de acorod com o que foi
                          descrito.
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
                      isRequired={false}
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
                      isInvalid={errors.endereco?.logradouro ? true : false}
                      size={'md'}
                      isDisabled={false}
                      isRequired={true}
                    >
                      <FormControlLabel>
                        <FormControlLabelText>Logradouro</FormControlLabelText>
                      </FormControlLabel>
                      <Input>
                        <InputField
                          value={values.endereco.logradouro}
                          onChangeText={handleChange('endereco.logradouro')}
                          type="text"
                          placeholder="Logradouro"
                        />
                      </Input>

                      <FormControlHelper>
                        <FormControlHelperText>
                          Informe o logradouro.
                        </FormControlHelperText>
                      </FormControlHelper>

                      <FormControlError>
                        <FormControlErrorIcon as={AlertCircleIcon} />
                        <FormControlErrorText>
                          {errors.endereco?.logradouro}
                        </FormControlErrorText>
                      </FormControlError>
                    </FormControl>

                    <FormControl
                      isInvalid={errors.endereco?.numero ? true : false}
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
                          placeholder="123"
                          keyboardType="number-pad"
                        />
                      </Input>

                      <FormControlHelper>
                        <FormControlHelperText>
                          Informe o número do endereço.
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
                      isInvalid={errors.endereco?.complemento ? true : false}
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
                          placeholder="Próxmimo á...."
                        />
                      </Textarea>

                      <FormControlHelper>
                        <FormControlHelperText>
                          Informe o complemento do endereço.
                        </FormControlHelperText>
                      </FormControlHelper>

                      <FormControlError>
                        <FormControlErrorIcon as={AlertCircleIcon} />
                        <FormControlErrorText>
                          {errors.endereco?.complemento}
                        </FormControlErrorText>
                      </FormControlError>
                    </FormControl>
                    <FormControl
                      isInvalid={errors.endereco?.bairro ? true : false}
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
                          placeholder="Bairro"
                        />
                      </Input>

                      <FormControlHelper>
                        <FormControlHelperText>
                          Informe o bairro.
                        </FormControlHelperText>
                      </FormControlHelper>

                      <FormControlError>
                        <FormControlErrorIcon as={AlertCircleIcon} />
                        <FormControlErrorText>
                          {errors.endereco?.bairro}
                        </FormControlErrorText>
                      </FormControlError>
                    </FormControl>
                    <FormControl
                      isInvalid={errors.endereco?.cidade ? true : false}
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
                          placeholder="sua cidade"
                        />
                      </Input>

                      <FormControlHelper>
                        <FormControlHelperText>
                          Informe o nome da sua cidade.
                        </FormControlHelperText>
                      </FormControlHelper>

                      <FormControlError>
                        <FormControlErrorIcon as={AlertCircleIcon} />
                        <FormControlErrorText>
                          {errors.endereco?.cidade}
                        </FormControlErrorText>
                      </FormControlError>
                    </FormControl>
                    <SelectEstados
                      error={errors.endereco?.uf}
                      value={values.endereco.uf}
                      isInvalid={errors.endereco?.uf ? true : false}
                      onChangeValue={handleChange('endereco.uf')}
                    />
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
                                  {errors &&
                                  errors.emails &&
                                  errors.emails[i] &&
                                  typeof errors.emails[i] === 'object'
                                    ? errors.emails[i].endereco
                                    : ''}
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
                      <Button
                        onPress={
                          handleSubmit as unknown as (
                            event: GestureResponderEvent,
                          ) => void
                        }
                      >
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
