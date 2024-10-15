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
  endereco: Yup.object().shape({
    cep: Yup.string().required('CEP é obrigatório'),
    logradouto: Yup.string().required('Logradouto é obrigatório'),
    numero: Yup.string().required('Número é obrigatório'),
    complemento: Yup.string().required('Complemento é obrigatório'),
    bairro: Yup.string().required('Bairro é obrigatório'),
    cidade: Yup.string().required('Cidade é obrigatória'),
    uf: Yup.string().required('UF é obrigatório'),
  }),
  email: Yup.array().of(
    Yup.object().shape({
      endereco: Yup.string().required('Endereço de email é obrigatório'),
    }),
  ),
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
                  data_nascimento: new Date(),
                },
                telefones: [
                  {
                    numero: '',
                  },
                ],
                endereco: {
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
                    endereco: '',
                  },
                ],
                limite: '',
              }}
              onSubmit={async (values) => {
                try {
                  const { pessoa, ...valores } = values;
                  console.log('foi');
                  await new ClienteService(db).create({
                    pessoa: {
                      ...pessoa,
                      data_nascimento: String(pessoa.data_nascimento),
                    },
                    ...valores,
                  });
                  navigation?.navigate('screens-clientes');
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
                    return '';
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
                    return '';
                  }
                };
                return (
                  <Box gap="$5">
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
                        onChangeDate={handleChange('pessoa.data_nascimento')}
                        value={values.pessoa.data_nascimento}
                      />
                      <InputText
                        isRequired={true}
                        inputType="cpf"
                        value={values.pessoa.cpf}
                        onChangeValue={handleChange('pessoa.cpf')}
                        error={errors.pessoa?.cpf}
                      />
                      <InputText
                        isRequired={true}
                        inputType="cep"
                        onChangeValue={handleChange('endereco.cep')}
                        value={values.endereco.cep}
                        error={errors.endereco?.cep}
                      />
                      <FormControl
                        isInvalid={values.endereco.logradouro ? true : false}
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
                            onChangeText={handleChange('endereco.logradouro')}
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
                           {errors.endereco?.logradouro}
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
                            onChangeText={handleChange('endereco.numero')}
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
                          <FormControlLabelText>
                            Complemento
                          </FormControlLabelText>
                        </FormControlLabel>
                        <Textarea>
                          <TextareaInput
                            onChangeText={handleChange('endereco.complemento')}
                            type="text"
                            placeholder="asdsadasdas"
                            value={values.endereco.complemento}
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
                            onChangeText={handleChange('endereco.bairro')}
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
                            onChangeText={handleChange('endereco.cidade')}
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
                            Atleast 6 characters are required.
                          </FormControlErrorText>
                        </FormControlError>
                      </FormControl>
                      <SelectEstados
                        onChangeValue={handleChange('endereco.uf')}
                        value={values.endereco.uf}
                        error={errors.endereco?.uf}
                      />
                      <Box gap="$2.5">
                        {values.telefones.map((telefone, i) => {
                          return (
                            <Box key={`telefone-${i}`}>
                              <InputText
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
                                isInvalid={
                                  ErrorsReturnEmails(i) !== '' &&
                                  typeof ErrorsReturnEmails(i) !== 'undefined'
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
                              setFieldValue('email', [
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
                      <Button onPress={async () => {
                          console.log(
                            await db.getAllAsync(`SELECT * FROM sqlite_master WHERE type = 'table' AND name = 'endereco'`),
                          );
                      }}>
                        <ButtonText>teste de envio</ButtonText>
                      </Button>
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
