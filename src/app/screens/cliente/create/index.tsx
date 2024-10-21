import {
  AddIcon,
  Card,
  Heading,
  RemoveIcon,
  Textarea,
  TextareaInput,
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
  AlertCircleIcon,
  ChevronDownIcon,
  ButtonIcon,
} from '@gluestack-ui/themed';
import { Box, Text } from '@gluestack-ui/themed';
import { Formik } from 'formik';
import { CalendarDaysIcon } from '@gluestack-ui/themed';
import { ScrollView } from '@gluestack-ui/themed';
import { CadastrarClienteScreen } from '@/interfaces/cliente';
import { Pessoa } from '@/types/screens/cliente';
import LoadingScreen from '@/components/LoadingScreen';
import { Alert, GestureResponderEvent } from 'react-native';
import * as Yup from 'yup';
import { ClienteService } from '@/classes/cliente/cliente.service';
import { useSQLiteContext } from 'expo-sqlite';
import InputDatePicker from '@/components/Custom/Inputs/DatePicker';
import InputText from '@/components/Input';
import SelectEstados from '@/components/Custom/Selects/SelectEstados';
import formatDate from '@/utils/formatDate';
import { getMinDateFor18YearsOld } from '@/utils';

const validationSchema = Yup.object().shape({
  pessoa: Yup.object().shape({
    id: Yup.string(),
    nome: Yup.string().when('pessoa.id', (id_pessoa, schema) =>
      id_pessoa ? schema.required('Nome é obrigatório') : schema,
    ),
    data_nascimento: Yup.date().when('pessoa.id', {
      is: (id_pessoa: string) => id_pessoa !== '',
      then: (yup) => yup.required('Data de nascimento e obrigatorio'),
    }),
    cpf: Yup.string().when('pessoa.id', (id_pessoa, schema) =>
      id_pessoa ? schema.required('CPF é obrigatório') : schema,
    ),
  }),
  cep: Yup.string().required('CEP é obrigatório'),
  logradouro: Yup.string().required('Logradouro é obrigatório'),
  numero: Yup.string().required('Número é obrigatório'),
  complemento: Yup.string(),
  bairro: Yup.string().required('Bairro é obrigatório'),
  cidade: Yup.string().required('Cidade é obrigatória'),
  uf: Yup.string().required('UF é obrigatório'),
  telefones: Yup.array()
    .of(
      Yup.object().shape({
        numero: Yup.string()
          .required('Número de telefone é obrigatório')
          .min(12, 'Número de telefone deve ter no mínimo 12 caracteres'),
      }),
    )
    .min(1, 'É necessário informar ao menos um telefone'), // Adiciona uma validação para garantir ao menos um telefone

  emails: Yup.array()
    .of(
      Yup.object().shape({
        endereco: Yup.string()
          .required('Endereço de email é obrigatório')
          .email('Endereço de email inválido'),
      }),
    )
    .min(1, 'É necessário informar ao menos um email'),
  limite: Yup.string().required('Limite é obrigatório'),
});

const Create: React.FC<CadastrarClienteScreen> = ({ navigation, route }) => {
  const db = useSQLiteContext();
  const [pessoas, setPessoas] = React.useState<Array<Pessoa>>([
    {
      id: '1',
      nome: 'João',
      cpf: '123.123.123-12',
      data_nascimento: '05-20-2000',
    },
    {
      id: '2',
      nome: 'Lucas',
      cpf: '234.234.234-23',
      data_nascimento: '06-15-1999',
    },
  ]);
  const [isNewPerson, setIsNewPerson] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function startScreen() {
      try {
        setPessoas([
          ...pessoas,
          {
            id: '3',
            nome: 'Pedro',
            cpf: '3243243279234',
            data_nascimento: '10-25-1999',
          },
        ]);
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
              initialValues={{
                pessoa: {
                  id: '',
                  nome: '',
                  cpf: '',
                  data_nascimento: getMinDateFor18YearsOld(),
                },
                telefones: [
                  {
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
                    endereco: '',
                  },
                ],
                limite: '',
              }}
              onSubmit={async (values) => {
                try {
                  values;
                  await new ClienteService(db).create(values);
                  Alert.alert('Sucesso', 'Cliente cadastrardo com sucesso!');
                  navigation?.goBack();
                } catch (error) {
                  Alert.alert('erro', (error as Error).message);
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
                const ErrorsReturn = (i: number) => {
                  if (
                    errors.telefones &&
                    errors.telefones[i] &&
                    typeof errors.telefones[i] === 'object'
                  ) {
                    return errors.telefones[i].numero;
                  } else {
                    return undefined;
                  }
                };

                const ErrorsReturnEmails = (i: number) => {
                  if (
                    errors.emails &&
                    errors.emails[i] &&
                    typeof errors.emails[i] === 'object'
                  ) {
                    return errors.emails[i].endereco;
                  } else {
                    return undefined;
                  }
                };
                return (
                  <Box gap="$5">
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
                        title="Data de Nascimento"
                        error={errors.pessoa?.data_nascimento}
                        onChangeDate={(date) =>
                          setFieldValue('pessoa.data_nascimento', date)
                        }
                        value={values.pessoa.data_nascimento}
                        maximumDate={getMinDateFor18YearsOld()}
                      />
                      <InputText
                        isRequired={true}
                        isInvalid={errors.pessoa?.cpf ? true : false}
                        inputType="cpf"
                        value={values.pessoa.cpf}
                        onChangeValue={handleChange('pessoa.cpf')}
                        error={errors.pessoa?.cpf}
                      />
                      <InputText
                        isRequired={true}
                        isInvalid={errors.cep ? true : false}
                        inputType="cep"
                        onChangeValue={handleChange('cep')}
                        value={values.cep}
                        error={errors.cep}
                      />
                      <FormControl
                        isInvalid={errors.logradouro ? true : false}
                        size={'md'}
                        isDisabled={false}
                        isRequired={true}
                      >
                        <FormControlLabel>
                          <FormControlLabelText>
                            Logradouro
                          </FormControlLabelText>
                        </FormControlLabel>
                        <Input>
                          <InputField
                            onChangeText={handleChange('logradouro')}
                            type="text"
                            placeholder="adadasdasdas"
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
                          <FormControlLabelText>Numero</FormControlLabelText>
                        </FormControlLabel>
                        <Input>
                          <InputField
                            onChangeText={handleChange('numero')}
                            type="text"
                            placeholder="dasdasdasdasdasd"
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
                            {errors.numero}
                          </FormControlErrorText>
                        </FormControlError>
                      </FormControl>
                      <FormControl
                        isInvalid={errors.complemento ? true : false}
                        size={'md'}
                        isDisabled={false}
                        isRequired={false}
                      >
                        <FormControlLabel>
                          <FormControlLabelText>
                            Complemento
                          </FormControlLabelText>
                        </FormControlLabel>
                        <Textarea>
                          <TextareaInput
                            onChangeText={handleChange('complemento')}
                            type="text"
                            placeholder="asdsadasdas"
                            value={values.complemento}
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
                            {errors.cidade}
                          </FormControlErrorText>
                        </FormControlError>
                      </FormControl>
                      <SelectEstados
                        isRequired={true}
                        isDisabled={false}
                        isInvalid={errors.uf ? true : false}
                        onChangeValue={handleChange('uf')}
                        value={values.uf}
                        error={errors.uf}
                      />
                      <Box gap="$2.5">
                        {values.telefones.map((telefone, i) => {
                          return (
                            <Box key={`telefone-${i}`}>
                              <InputText
                                isInvalid={ErrorsReturn(i) ? true : false}
                                error={ErrorsReturn(i)}
                                inputType="telefone"
                                value={telefone.numero}
                                onChangeValue={handleChange(
                                  `telefones[${i}].numero`,
                                )}
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
                            <Box key={`email-${i}`}>
                              <FormControl
                                isInvalid={ErrorsReturnEmails(i) ? true : false}
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
                                    onChangeText={handleChange(
                                      `emails[${i}].endereco`,
                                    )}
                                    keyboardType="email-address"
                                  />
                                </Input>

                                <FormControlHelper>
                                  <FormControlHelperText>
                                    Informe um email válido.
                                  </FormControlHelperText>
                                </FormControlHelper>

                                <FormControlError>
                                  <FormControlErrorIcon as={AlertCircleIcon} />
                                  <FormControlErrorText>
                                    {ErrorsReturnEmails(i)}
                                  </FormControlErrorText>
                                </FormControlError>
                              </FormControl>
                            </Box>
                          );
                        })}

                        <Button
                          onPress={() => {
                            setFieldValue('emails', [
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
                    </>

                    <FormControl
                      isInvalid={errors.limite ? true : false}
                      size={'md'}
                      isDisabled={false}
                      isRequired={true}
                    >
                      <FormControlLabel>
                        <FormControlLabelText>Limite</FormControlLabelText>
                      </FormControlLabel>
                      <Input>
                        <InputField
                          onChangeText={handleChange('limite')}
                          type="text"
                          placeholder="1000"
                          value={values.limite}
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
                          {errors.limite}
                        </FormControlErrorText>
                      </FormControlError>
                    </FormControl>

                    <Box gap="$5">
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
