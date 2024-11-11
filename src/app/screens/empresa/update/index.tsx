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
import { EmpresaUpdate } from '@/classes/empresa/types';
import InputText from '@/components/Input';
import SelectEstados from '@/components/Custom/Selects/SelectEstados';
import InputDatePicker from '@/components/Custom/Inputs/DatePicker';
import { Alert, GestureResponderEvent } from 'react-native';

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
  cep: Yup.string().required('CEP é obrigatório'),
  logradouro: Yup.string().required('Logradouro é obrigatório'),
  numero: Yup.string().required('Número é obrigatório'),
  complemento: Yup.string(),
  bairro: Yup.string().required('Bairro é obrigatório'),
  cidade: Yup.string().required('Cidade é obrigatória'),
  uf: Yup.string().required('UF e obrigatorio!'),
  email: Yup.array().of(
    Yup.object().shape({
      endereco: Yup.string().required('Endereço de email é obrigatório'),
    }),
  ),
});

const Update: React.FC<AtualizarEmpresaScreen> = ({ navigation, route }) => {
  if (!route || !route.params || !route.params.id) {
    navigation?.goBack();
    return null;
  }
  const { id } = route.params;
  const [isLoading, setIsLoading] = React.useState(true);
  const [empresa, setEmpresa] = React.useState<EmpresaUpdate>({
    id: Number(null),
    pessoa: {
      id: Number(null),
      nome: '',
      data_nascimento: new Date(),
      cpf: '',
    },
    cnpj: '',
    nome_fantasia: '',
    razao_social: '',
    ramo: {
      id: Number(null),
      nome: '',
    },
    telefones: [
      {
        id: Number(null),
        numero: '',
      },
    ],
    cep: '',
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    uf: '',
    emails: [
      {
        id: Number(null),
        endereco: '',
      },
    ],
  });
  const db = useSQLiteContext();

  async function start() {
    try {
      const Emp = await new EmpresaService(db).getById(id);
      setEmpresa({
        ...Emp,
        complemento: Emp.complemento ? Emp.complemento : '',
      });
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
              onSubmit={async (values) => {
                try {
                  await new EmpresaService(db).update(values);
                  Alert.alert('Sucesso', 'Empresa Atualizada com Sucesso!', [
                    {
                      text: 'ok',
                      onPress: () =>
                        navigation?.navigate('visualizar-empresas'),
                    },
                  ]);
                } catch (error) {
                  Alert.alert('Erro', (error as Error).message);
                  throw error;
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
                React.useEffect(() => {
                  console.log('modify ramo');
                  if (route && route.params && route.params.ramo) {
                    const rm = route.params.ramo;
                    setFieldValue('ramo', rm);
                  }
                }, [route?.params?.ramo]);

                return (
                  <Box gap="$5">
                    <Text>
                      Dados da Pessoa responsável pela Empresa ou da empresa
                      sendo Pessoa Física
                    </Text>
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

                    <InputDatePicker
                      title="Data de Nascimento"
                      onChangeDate={(data) =>
                        setFieldValue('pessoa.data_nascimento', data)
                      }
                      value={values.pessoa.data_nascimento}
                      size="md"
                      error={errors.pessoa?.data_nascimento}
                      isInvalid={errors.pessoa?.data_nascimento ? true : false}
                      isRequired={true}
                    />
                    <InputText
                      inputType="cpf"
                      isInvalid={errors.pessoa?.cpf ? true : false}
                      value={values.pessoa.cpf}
                      onChangeValue={handleChange('pessoa.cpf')}
                      error={errors.pessoa?.cpf}
                      isRequired={true}
                    />

                    {values.ramo.id !== 0 && (
                      <Box>
                        <Card>
                          <HStack>
                            <VStack gap="$5">
                              <Heading>Ramo:</Heading>
                              <Text>{values.ramo.nome}</Text>
                            </VStack>
                          </HStack>
                        </Card>
                      </Box>
                    )}
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
                    </Box>

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
                          Atualize o nome fantasia da empresa.
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
                          placeholder="Razão social da empresa ou nome completo"
                          onChangeText={handleChange('razao_social')}
                          value={values.razao_social}
                        />
                      </Input>

                      <FormControlHelper>
                        <FormControlHelperText>
                          Atualize a Razão social da empresa.
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
                      error={errors.cep}
                      value={values.cep}
                      onChangeValue={handleChange('cep')}
                      isInvalid={errors.cep ? true : false}
                      isRequired={true}
                    />
                    <FormControl
                      isInvalid={errors.logradouro ? true : false}
                      size={'md'}
                      isDisabled={false}
                      isRequired={true}
                    >
                      <FormControlLabel>
                        <FormControlLabelText>Logradouro</FormControlLabelText>
                      </FormControlLabel>
                      <Input>
                        <InputField
                          value={values.logradouro}
                          onChangeText={handleChange('logradouro')}
                          type="text"
                          placeholder="josé canóvas de andreu"
                        />
                      </Input>

                      <FormControlHelper>
                        <FormControlHelperText>
                          Atualize o logradouro do endereço.
                        </FormControlHelperText>
                      </FormControlHelper>

                      <FormControlError>
                        <FormControlErrorIcon as={AlertCircleIcon} />
                        <FormControlErrorText>
                          {errors.logradouro}
                        </FormControlErrorText>
                      </FormControlError>
                    </FormControl>
                    <FormControl
                      isInvalid={errors.numero ? true : false}
                      size={'md'}
                      isDisabled={false}
                      isRequired={true}
                    >
                      <FormControlLabel>
                        <FormControlLabelText>Número</FormControlLabelText>
                      </FormControlLabel>
                      <Input>
                        <InputField
                          value={String(values.numero)}
                          onChangeText={handleChange('numero')}
                          type="text"
                          placeholder="123"
                          keyboardType="number-pad"
                        />
                      </Input>

                      <FormControlHelper>
                        <FormControlHelperText>
                          Atualize o numero do endereço.
                        </FormControlHelperText>
                      </FormControlHelper>

                      <FormControlError>
                        <FormControlErrorIcon as={AlertCircleIcon} />
                        <FormControlErrorText>
                          {errors.numero}
                        </FormControlErrorText>
                      </FormControlError>
                    </FormControl>
                    <FormControl
                      isInvalid={errors.complemento ? true : false}
                      size={'md'}
                      isDisabled={false}
                      isRequired={true}
                    >
                      <FormControlLabel>
                        <FormControlLabelText>Complemento</FormControlLabelText>
                      </FormControlLabel>
                      <Textarea>
                        <TextareaInput
                          value={values.complemento}
                          onChangeText={handleChange('complemento')}
                          type="text"
                          placeholder="Proximo a ..."
                        />
                      </Textarea>

                      <FormControlHelper>
                        <FormControlHelperText>
                          Informe o complemento caso haja.
                        </FormControlHelperText>
                      </FormControlHelper>

                      <FormControlError>
                        <FormControlErrorIcon as={AlertCircleIcon} />
                        <FormControlErrorText>
                          {errors.complemento}
                        </FormControlErrorText>
                      </FormControlError>
                    </FormControl>
                    <FormControl
                      isInvalid={errors.bairro ? true : false}
                      size={'md'}
                      isDisabled={false}
                      isRequired={true}
                    >
                      <FormControlLabel>
                        <FormControlLabelText>Bairro</FormControlLabelText>
                      </FormControlLabel>
                      <Input>
                        <InputField
                          value={values.bairro}
                          onChangeText={handleChange('bairro')}
                          type="text"
                          placeholder="password"
                        />
                      </Input>

                      <FormControlHelper>
                        <FormControlHelperText>
                          Informe o bairro do endereco.
                        </FormControlHelperText>
                      </FormControlHelper>

                      <FormControlError>
                        <FormControlErrorIcon as={AlertCircleIcon} />
                        <FormControlErrorText>
                          {values.bairro}
                        </FormControlErrorText>
                      </FormControlError>
                    </FormControl>
                    <FormControl
                      isInvalid={errors.cidade ? true : false}
                      size={'md'}
                      isDisabled={false}
                      isRequired={true}
                    >
                      <FormControlLabel>
                        <FormControlLabelText>Cidade</FormControlLabelText>
                      </FormControlLabel>
                      <Input>
                        <InputField
                          value={values.cidade}
                          onChangeText={handleChange('cidade')}
                          type="text"
                          placeholder="Uberlândia"
                        />
                      </Input>

                      <FormControlHelper>
                        <FormControlHelperText>
                          Informe o nome da cidade.
                        </FormControlHelperText>
                      </FormControlHelper>

                      <FormControlError>
                        <FormControlErrorIcon as={AlertCircleIcon} />
                        <FormControlErrorText>
                          {errors.cidade}
                        </FormControlErrorText>
                      </FormControlError>
                    </FormControl>
                    <SelectEstados
                      error={errors.uf}
                      value={values.uf}
                      onChangeValue={handleChange('uf')}
                      isInvalid={errors.uf ? true : false}
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
                              isInvalid={
                                typeof errors.telefones !== 'undefined' &&
                                typeof errors.telefones[i] === 'object' &&
                                errors.telefones[i].numero
                                  ? true
                                  : false
                              }
                              isRequired={true}
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
                              isInvalid={
                                typeof errors.emails !== 'undefined' &&
                                typeof errors.emails[i] === 'object' &&
                                errors.emails[i].endereco
                                  ? true
                                  : false
                              }
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
                                  Atualize o e-mail.
                                </FormControlHelperText>
                              </FormControlHelper>

                              <FormControlError>
                                <FormControlErrorIcon as={AlertCircleIcon} />
                                <FormControlErrorText>
                                  {typeof errors.emails !== 'undefined' &&
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
