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
import formatDate from '../../../../../utils/formatDate';
const Create: React.FC<CadastrarEmpresaScreen> = ({ navigation, route }) => {
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
      data_nascimento: '02-03-1999',
      cpf: '98765432101',
    },
    {
      id: 3,
      nome: 'Pedro',
      data_nascimento: '02-03-1999',
      cpf: '98765432101',
    },
    {
      id: 4,
      nome: 'Maria',
      data_nascimento: '02-03-1999',
      cpf: '98765432101',
    },
    {
      id: 5,
      nome: 'Maria',
      data_nascimento: '02-03-1999',
      cpf: '98765432101',
    },
    {
      id: 6,
      nome: 'Maria',
      data_nascimento: '02-03-1999',
      cpf: '98765432101',
    },
    {
      id: 7,
      nome: 'Maria',
      data_nascimento: '02-03-1999',
      cpf: '98765432101',
    },
    {
      id: 8,
      nome: 'Maria',
      data_nascimento: '02-03-1999',
      cpf: '98765432101',
    },
    {
      id: 9,
      nome: 'Maria',
      data_nascimento: '02-03-1999',
      cpf: '98765432101',
    },
    {
      id: 10,
      nome: 'Maria',
      data_nascimento: '02-03-1999',
      cpf: '98765432101',
    },
  ]);
  return (
    <Box w="$full" h="$full">
      <ScrollView w="$full">
        <Box px="$8" py="$5">
          <Box w="$full" alignItems="center">
            <Text size="3xl">Cadastrar Empresa</Text>
          </Box>
          <Box>
            <Formik
              initialValues={{
                id: '',
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
                  if (route && route.params && route.params.pessoa) {
                    const person = route.params.pessoa;
                    setFieldValue('pessoa.id', person.id);
                    setFieldValue('pessoa.nome', person.nome);
                    setFieldValue(
                      'pessoa.data_nascimento',
                      new Date(person.data_nascimento),
                    );
                    setFieldValue('pessoa.cpf', person.cpf);
                  }
                }, [route?.params?.pessoa]);

                return (
                  <Box gap="$5">
                    {values.pessoa.id === '' && pessoas.length > 0 ? (
                      <Box gap="$5" mt="$5">
                        <Heading size="md">Selecione uma pessoa:</Heading>
                        <Box>
                          <Button
                            onPress={() =>
                              navigation?.navigate('selecionar-pessoa', {
                                screen: 'cadastrar-empresa',
                                pessoas,
                              })
                            }
                          >
                            <ButtonText>Selecionar Pessoa</ButtonText>
                          </Button>
                        </Box>
                      </Box>
                    ) : values.pessoa.id !== '' ? (
                      <Box>
                        <Card>
                          <HStack>
                            <VStack>
                              <Box>
                                <Heading>{values.pessoa.nome}</Heading>
                              </Box>
                              <Box>
                                <Text>
                                  {new Date(
                                    values.pessoa.data_nascimento,
                                  ).toLocaleDateString('PT-BR')}
                                </Text>
                              </Box>
                              <Box>
                                <Text>{values.pessoa.cpf}</Text>
                              </Box>
                            </VStack>
                          </HStack>
                        </Card>
                        <Box>
                          <Button
                            onPress={() =>
                              navigation?.navigate('selecionar-pessoa', {
                                pessoas,
                                screen: 'cadastrar-empresa',
                                pessoaSelecionada: {
                                  ...values.pessoa,
                                  data_nascimento: String(
                                    values.pessoa.data_nascimento,
                                  ),
                                },
                              })
                            }
                          >
                            <ButtonText>Alterar Pessoa</ButtonText>
                          </Button>
                        </Box>
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
                              value={values.data_nascimento.toLocaleDateString(
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
                              {errors.pessoa.cpf}
                            </FormControlErrorText>
                          </FormControlError>
                        </FormControl>
                      </>
                    )}

                    {values.ramo.id === '' ? (
                      <Box>
                        <Box>
                          <Heading>Selecione o ramo</Heading>
                        </Box>
                        <Box>
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
                        </Box>
                      </Box>
                    ) : (
                      <></>
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
                    <FormControl
                      isInvalid={false}
                      size={'md'}
                      isDisabled={false}
                      isRequired={true}
                    >
                      <FormControlLabel>
                        <FormControlLabelText>CNPJ</FormControlLabelText>
                      </FormControlLabel>
                      <Input>
                        <InputField
                          type="text"
                          value={values.cnpj}
                          onChangeText={handleChange('cnpj')}
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
                          {errors.cnpj}
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
                          value={values.endereco.cep}
                          onChangeText={handleChange('endereco.cep')}
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
                          values={values.endereco.cidade}
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
                          <>
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
                          </>
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
                          <>
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
                          </>
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
