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
import { TrashIcon } from '@gluestack-ui/themed';
import { CadastrarClienteScreen } from '@/interfaces/cliente';
import { Pessoa } from '@/types/screens/cliente';
import LoadingScreen from '@/components/LoadingScreen';
import { Alert } from 'react-native';
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
              initialValues={{
                id_pessoa: '',
                nome: '',
                data_nascimento: new Date(),
                cpf: '',
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
                    setFieldValue('id_pessoa', pessoa.id);
                    setFieldValue('nome', pessoa.nome);
                    setFieldValue(
                      'data_nascimento',
                      new Date(pessoa.data_nascimento),
                    );
                    setFieldValue('cpf', pessoa.cpf);
                  }
                }, [route?.params?.pessoa]);

                return (
                  <Box gap="$5">
                    {values.id_pessoa == '' && pessoas.length > 0 ? (
                      <Box>
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
                      </Box>
                    ) : values.id_pessoa ? (
                      <Card my="$5">
                        <HStack>
                          <Box gap="$2.5">
                            <Box>
                              <Heading>{values.nome}</Heading>
                            </Box>
                            <Box>
                              <Text>{values.cpf}</Text>
                            </Box>
                            <Box>
                              <Text>
                                {new Date(
                                  values.data_nascimento,
                                ).toLocaleDateString('PT-BR')}
                              </Text>
                            </Box>
                          </Box>
                        </HStack>
                      </Card>
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
                              onChangeText={handleChange('nome')}
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
                              {errors.nome}
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
                              value={values.data_nascimento.toLocaleDateString(
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
                              {errors.data_nascimento}
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
                              value={values.cpf}
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
                              {errors.cpf}
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
                            <InputField type="text" placeholder="password" />
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
                            <InputField type="text" placeholder="password" />
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
                            <InputField type="text" placeholder="password" />
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
                            <InputField type="text" placeholder="password" />
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
                            <InputField type="text" placeholder="password" />
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
                            <InputField type="text" placeholder="password" />
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
                              <InputField type="text" placeholder="password" />
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
                          <Button action="positive">
                            <ButtonIcon as={AddIcon} />
                          </Button>
                          <Button action="negative">
                            <ButtonIcon as={RemoveIcon} />
                          </Button>
                          <Button action="negative">
                            <ButtonIcon as={TrashIcon} />
                          </Button>
                        </Box>

                        <Box gap="$2.5">
                          <FormControl
                            isInvalid={false}
                            size={'md'}
                            isDisabled={false}
                            isRequired={true}
                          >
                            <FormControlLabel>
                              <FormControlLabelText>Email</FormControlLabelText>
                            </FormControlLabel>
                            <Input>
                              <InputField type="text" placeholder="password" />
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
                          <Button action="positive">
                            <ButtonIcon as={AddIcon} />
                          </Button>
                          <Button action="negative">
                            <ButtonIcon as={RemoveIcon} />
                          </Button>
                          <Button action="negative">
                            <ButtonIcon as={TrashIcon} />
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
                        <InputField type="text" placeholder="password" />
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
