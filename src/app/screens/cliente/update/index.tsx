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
  Heading,
  Text,
  Center,
  Icon,
  CircleIcon,
  CheckIcon,
  AlertCircleIcon,
  ChevronDownIcon,
  ButtonIcon,
  CalendarDaysIcon,
  AddIcon,
  TrashIcon,
  Card,
} from '@gluestack-ui/themed';

import { Box, ScrollView } from '@gluestack-ui/themed';
import { Formik } from 'formik';
import { RemoveIcon } from '@gluestack-ui/themed';
import LoadingScreen from '@/components/LoadingScreen';
import { Alert, GestureResponderEvent } from 'react-native';
import * as Yup from 'yup';
import { AtualizarClienteScreen } from '@/interfaces/cliente';
import { IClienteUpdate, IPessoaUpdate } from '@/classes/cliente/interfaces';
import { useSQLiteContext } from 'expo-sqlite';
import { ClienteService } from '@/classes/cliente/cliente.service';
import InputDatePicker from '@/components/Custom/Inputs/DatePicker';
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
  uf: Yup.string().required('UF é obrigatório'),
  email: Yup.array().of(
    Yup.object().shape({
      endereco: Yup.string().required('Endereço de email é obrigatório'),
    }),
  ),
  saldo: Yup.string().required('Saldo é obrigatório'),
});

const Update: React.FC<AtualizarClienteScreen> = ({ navigation, route }) => {
  if (!route || !route.params || !route.params.id) {
    navigation?.goBack();
    return null;
  }
  const id = route.params.id;
  const db = useSQLiteContext();
  const [isLoading, setIsLoading] = React.useState(true);
  const [cliente, setCliente] = React.useState<IClienteUpdate>({
    id: Number(null),
    pessoa: {
      id: Number(null),
      nome: '',
      data_nascimento: new Date(),
      cpf: '',
    },
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
    telefones: [
      {
        id: Number(null),
        numero: '',
      },
    ],
    saldo: '',
  });

  React.useEffect(() => {
    async function startScreen() {
      try {
        const cli = await new ClienteService(db).findClienteById(String(id));
        setCliente(cli);
        setIsLoading(false);
      } catch (error) {
        Alert.alert('Erro', (error as Error).message);
        setIsLoading(false);
        throw error;
      }
    }
    startScreen();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Box w="$full" h="$full">
      <ScrollView w="$full">
        <Box px="$8" py="$5">
          <Box w="$full" alignItems="center">
            <Text size="3xl">Cadastrar Cliente</Text>
          </Box>
          <Box>
            <Formik
              validationSchema={validationSchema}
              initialValues={cliente}
              onSubmit={async (values) => {
                try {
                  await new ClienteService(db).update(values);
                  Alert.alert('Sucesso', 'Cliente Atualizado com sucesso!');
                  navigation?.navigate('visualizar-clientes');
                } catch (error) {
                  Alert.alert('Error', (error as Error).message);
                  throw error;
                }
              }}
            >
              {({
                handleChange,
                setFieldValue,
                handleSubmit,
                values,
                errors,
              }) => {
                return (
                  <Box gap="$5">
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
                          {errors.pessoa?.nome}
                        </FormControlErrorText>
                      </FormControlError>
                    </FormControl>
                    <InputDatePicker
                      value={new Date(values.pessoa.data_nascimento)}
                      onChangeDate={(date) => {
                        setFieldValue('pessoa.data_nascimento', date);
                      }}
                      title="Data de Nascimento"
                      isInvalid={errors.pessoa?.data_nascimento ? true : false}
                      isRequired={true}
                      error={errors.pessoa?.data_nascimento}
                    />
                    <InputText
                      inputType="cpf"
                      value={values.pessoa.cpf}
                      onChangeValue={handleChange('pessoa.cpf')}
                      error={errors.pessoa?.cpf}
                      isInvalid={errors.pessoa?.cpf ? true : false}
                      isRequired={true}
                    />
                    <InputText
                      inputType="cep"
                      error={errors.cep}
                      onChangeValue={handleChange('cep')}
                      value={values.cep}
                      isRequired={true}
                      isDisabled={false}
                      isInvalid={errors.cep ? true : false}
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
                          onChangeText={handleChange('logradouro')}
                          type="text"
                          placeholder="adadasdasdas"
                          value={values.logradouro}
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
                      isInvalid={errors.numero ? true : false}
                      size={'md'}
                      isDisabled={false}
                      isRequired={true}
                    >
                      <FormControlLabel>
                        <FormControlLabelText>Numero</FormControlLabelText>
                      </FormControlLabel>
                      <Input>
                        <InputField
                          onChangeText={handleChange('numero')}
                          type="text"
                          placeholder="dasdasdasdasdasd"
                          keyboardType="number-pad"
                          value={values.numero.toString()}
                        />
                      </Input>

                      <FormControlHelper>
                        <FormControlHelperText>
                          Informe o numero do endereco.
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
                          onChangeText={handleChange('complemento')}
                          type="text"
                          placeholder="asdsadasdas"
                          value={String(values.complemento)}
                        />
                      </Textarea>

                      <FormControlHelper>
                        <FormControlHelperText>
                          Informe o complemento.
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
                          onChangeText={handleChange('bairro')}
                          type="text"
                          placeholder="asdasdasdas"
                          value={values.bairro}
                        />
                      </Input>

                      <FormControlHelper>
                        <FormControlHelperText>
                          Informe o nome do bairro.
                        </FormControlHelperText>
                      </FormControlHelper>

                      <FormControlError>
                        <FormControlErrorIcon as={AlertCircleIcon} />
                        <FormControlErrorText>
                          {errors.bairro}
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
                          onChangeText={handleChange('cidade')}
                          type="text"
                          placeholder="adasdasdasdas"
                          value={values.cidade}
                        />
                      </Input>

                      <FormControlHelper>
                        <FormControlHelperText>
                          Informe a cidade
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
                      isInvalid={errors.uf ? true : false}
                      error={errors.uf}
                      onChangeValue={handleChange('uf')}
                      value={values.uf}
                    />
                    <Box gap="$2.5">
                      {values.telefones.map((telefone, i) => {
                        return (
                          <Box key={`telefone-${i}`}>
                            <InputText
                              inputType="telefone"
                              value={telefone.numero}
                              onChangeValue={handleChange(
                                `telefones[${i}].numero`,
                              )}
                              isRequired={true}
                              isInvalid={
                                typeof errors.telefones !== 'undefined' &&
                                typeof errors.telefones[i] === 'object'
                                  ? true
                                  : false
                              }
                              error={
                                typeof errors.telefones !== 'undefined' &&
                                typeof errors.telefones[i] === 'object'
                                  ? errors.telefones[i].numero
                                  : ''
                              }
                            />
                          </Box>
                        );
                      })}
                      <Button
                        onPress={() => {
                          setFieldValue('telefones', [
                            ...values.telefones,
                            { numero: '' },
                          ]);
                        }}
                        action="positive"
                      >
                        <ButtonIcon as={AddIcon} />
                      </Button>
                      <Button
                        onPress={() => {
                          if (values.telefones.length > 1) {
                            setFieldValue('telefones', [
                              ...values.telefones.slice(0, -1),
                            ]);
                          } else {
                            Alert.alert(
                              'Aviso',
                              'Nao existem mais telefones a serem removidos',
                            );
                          }
                        }}
                        action="negative"
                      >
                        <ButtonIcon as={RemoveIcon} />
                      </Button>
                    </Box>

                    <Box gap="$2.5">
                      {values.emails.map((mail, i) => {
                        return (
                          <Box key={`email-${mail.id}`}>
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
                                  type="text"
                                  placeholder="teste@teste.com"
                                  value={mail.endereco}
                                  onChangeText={handleChange(
                                    `emails[${i}].endereco`,
                                  )}
                                  keyboardType="email-address"
                                />
                              </Input>

                              <FormControlHelper>
                                <FormControlHelperText>
                                  Informe o email do cliente.
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

                      <Button
                        onPress={() => {
                          setFieldValue('email', [
                            ...values.emails,
                            { endereco: '' },
                          ]);
                        }}
                        action="positive"
                      >
                        <ButtonIcon as={AddIcon} />
                      </Button>
                      <Button
                        onPress={() => {
                          if (values.emails.length > 1) {
                            setFieldValue('emails', [
                              ...values.emails.slice(0, -1),
                            ]);
                          } else {
                            Alert.alert(
                              'Aviso',
                              'Nao ha mais emails a serem removidos',
                            );
                          }
                        }}
                        action="negative"
                      >
                        <ButtonIcon as={RemoveIcon} />
                      </Button>
                    </Box>
                    <InputText
                      inputType='money'
                      value={values.saldo}
                      onChangeValue={handleChange('saldo')}
                      error={errors.saldo}
                      isInvalid={errors.saldo ? true : false}
                      isRequired={true}
                      size="md"
                      title='Saldo do cliente'
                    />

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
