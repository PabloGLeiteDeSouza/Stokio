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
import { Alert } from 'react-native';
import * as Yup from 'yup';

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
    rua: Yup.string().required('Rua é obrigatória'),
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
  const [pessoas, setPessoas] = React.useState<Array<Pessoa>>([
    {
      id: 1,
      nome: 'João',
      cpf: '123.123.123-12',
      data_nascimento: '05-20-2000',
    },
    {
      id: 2,
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
            id: 3,
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
                  rua: '',
                  numero: '',
                  complemento: '',
                  bairro: '',
                  cidade: '',
                  uf: '',
                },
                email: [
                  {
                    endereco: '',
                  },
                ],
                limite: '',
              }}
              onSubmit={() => {}}
            >
              {({ handleChange, setFieldValue, values, errors }) => {
                React.useEffect(() => {
                  if (route?.params?.pessoa) {
                    const pessoa = route.params.pessoa;
                    setFieldValue('pessoa.id', pessoa.id);
                    setFieldValue('pessoa.nome', pessoa.nome);
                    setFieldValue(
                      'pessoa.data_nascimento',
                      new Date(pessoa.data_nascimento),
                    );
                    setFieldValue('pessoa.cpf', pessoa.cpf);
                  }
                }, [route?.params?.pessoa]);

                return (
                  <Box gap="$5">
                    {values.pessoa.id == '' &&
                    !isNewPerson &&
                    pessoas.length > 0 ? (
                      <Box gap="$5" mt="$5">
                        <Button
                          onPress={() =>
                            navigation?.navigate('selecionar-pessoa', {
                              screen: 'cadastrar-cliente',
                              pessoas,
                            })
                          }
                        >
                          <ButtonText>Selecionar Pessoa</ButtonText>
                        </Button>
                        <Button onPress={() => setIsNewPerson(true)}>
                          <ButtonText>Cadastrar Pessoa</ButtonText>
                        </Button>
                      </Box>
                    ) : values.pessoa.id != '' && !isNewPerson ? (
                      <Box gap="$2.5" mt="$5">
                        <Heading textAlign="center" size="xl">
                          Pessoa selecionada:{' '}
                        </Heading>
                        <Card my="$5">
                          <HStack>
                            <Box gap="$2.5">
                              <Box>
                                <Heading>{values.pessoa.nome}</Heading>
                              </Box>
                              <Box>
                                <Text>{values.pessoa.cpf}</Text>
                              </Box>
                              <Box>
                                <Text>
                                  {new Date(
                                    values.pessoa.data_nascimento,
                                  ).toLocaleDateString('PT-BR')}
                                </Text>
                              </Box>
                            </Box>
                          </HStack>
                        </Card>
                        <Button
                          onPress={() => {
                            const pessoaSelecionada = {
                              id: values.pessoa.id,
                              nome: values.pessoa.nome,
                              cpf: values.pessoa.cpf,
                              data_nascimento: String(
                                values.pessoa.data_nascimento,
                              ),
                            };
                            navigation?.navigate('selecionar-pessoa', {
                              screen: 'cadastrar-cliente',
                              pessoas,
                              pessoaSelecionada,
                            });
                          }}
                        >
                          <ButtonText>Alterar Pessoa</ButtonText>
                        </Button>
                        <Button
                          onPress={() => {
                            setFieldValue('pessoa', {
                              id: '',
                              nome: '',
                              cpf: '',
                              data_nascimento: new Date(),
                            });
                            setIsNewPerson(true);
                          }}
                        >
                          <ButtonText>Cadastrar Nova Pessoa</ButtonText>
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
                              placeholder="password"
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
                              {errors.pessoa && errors.pessoa.data_nascimento
                                ? errors.pessoa.data_nascimento
                                : ''}
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
                              placeholder="123.123.123.12"
                              onChangeText={handleChange('pessoa.cpf')}
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
                              {errors.pessoa?.cpf}
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
                            <FormControlLabelText>Cep</FormControlLabelText>
                          </FormControlLabel>
                          <Input>
                            <InputField
                              onChangeText={handleChange('endereco.cep')}
                              type="text"
                              placeholder="12.123-123"
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
                            <FormControlLabelText>Rua</FormControlLabelText>
                          </FormControlLabel>
                          <Input>
                            <InputField
                              onChangeText={handleChange('endereco.rua')}
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
                          <Input>
                            <InputField
                              onChangeText={handleChange(
                                'endereco.complemento',
                              )}
                              type="text"
                              placeholder="asdsadasdas"
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
                        <FormControl
                          isInvalid={false}
                          size={'md'}
                          isDisabled={false}
                          isRequired={true}
                        >
                          <FormControlLabel>
                            <FormControlLabelText>UF</FormControlLabelText>
                          </FormControlLabel>
                          <Select isInvalid={false} isDisabled={false}>
                            <SelectTrigger size={'md'} variant={'rounded'}>
                              <SelectInput placeholder="Selecione uma UF" />
                              <SelectIcon
                                mr={'$3'}
                                ml={0}
                                as={ChevronDownIcon}
                              />
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
                                      onChangeText={handleChange(
                                        `telefones[${i}].endereco`,
                                      )}
                                      type="text"
                                      placeholder="12312321312"
                                      keyboardType="number-pad"
                                    />
                                  </Input>

                                  <FormControlHelper>
                                    <FormControlHelperText>
                                      Must be atleast 6 characters.
                                    </FormControlHelperText>
                                  </FormControlHelper>

                                  <FormControlError>
                                    <FormControlErrorIcon
                                      as={AlertCircleIcon}
                                    />
                                    <FormControlErrorText>
                                      Atleast 6 characters are required.
                                    </FormControlErrorText>
                                  </FormControlError>
                                </FormControl>
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
                          {values.email.map((tel, i) => {
                            return (
                              <Box key={`telefone-${i}`}>
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
                                      placeholder="password"
                                    />
                                  </Input>

                                  <FormControlHelper>
                                    <FormControlHelperText>
                                      Must be atleast 6 characters.
                                    </FormControlHelperText>
                                  </FormControlHelper>

                                  <FormControlError>
                                    <FormControlErrorIcon
                                      as={AlertCircleIcon}
                                    />
                                    <FormControlErrorText>
                                      Atleast 6 characters are required.
                                    </FormControlErrorText>
                                  </FormControlError>
                                </FormControl>
                              </Box>
                            );
                          })}

                          <Button
                            onPress={() => {
                              setFieldValue('email', [
                                ...values.email,
                                { endereco: '' },
                              ]);
                            }}
                            action="positive"
                          >
                            <ButtonIcon as={AddIcon} />
                          </Button>
                          <Button
                            onPress={() => {
                              if (values.email.length > 1) {
                                setFieldValue('email', [
                                  ...values.email.slice(0, -1),
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
                    )}
                    <FormControl
                      isInvalid={false}
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
