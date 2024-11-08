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
  Box,
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
  Card,
} from '@gluestack-ui/themed';

import { Formik } from 'formik';
import { validationSchema } from './validation';
import { getMinDateFor18YearsOld, getStringFromDate } from '@/utils';
import { IFormCreateCliente } from './interfaces';
import { Alert, GestureResponderEvent } from 'react-native';
import { ClienteService } from '@/classes/cliente/cliente.service';
import InputText from '@/components/Input';
import InputDatePicker from '@/components/Custom/Inputs/DatePicker';
import { RemoveIcon } from '@gluestack-ui/themed';
import SelectEstados from '@/components/Custom/Selects/SelectEstados';

const FormCreateClient: React.FC<IFormCreateCliente> = ({ pessoa, onCreated, db, pessoas }) => {
    const [isDisabledAll, setIsDisabledAll] = React.useState(false);
    const [isDisabledAddress, setIsDisabledAddress] = React.useState(false);
    const [isNewPerson, setIsNewPerson] = React.useState(pessoas.length < 1);
  return (
    <>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          pessoa: {
            id: Number(null),
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
          saldo: '',
        }}
        onSubmit={async (values) => {
          try {
            values;
            await new ClienteService(db).create(values);
            Alert.alert('Sucesso', 'Cliente cadastrardo com sucesso!');
            onCreated();
          } catch (error) {
            Alert.alert('erro', (error as Error).message);
            throw error;
          }
        }}
      >
        {({ handleChange, setFieldValue, handleSubmit, values, errors }) => {
          React.useEffect(() => {
            if (pessoa) {
              const pss = {
                ...pessoa,
                data_nascimento: getDateFromString(
                  pessoa.data_nascimento,
                ),
              };
              setFieldValue('pessoa', pss);
            }
          }, [pessoa]);
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
            <Box gap="$5" mt="$5">
              {isNewPerson && (
                <>
                  <FormControl
                    isInvalid={errors.pessoa?.nome ? true : false}
                    size={'md'}
                    isDisabled={isDisabledAll}
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
                        Nome completo do cliente.
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
                    isDisabled={isDisabledAll}
                    title="Data de Nascimento"
                    error={errors.pessoa?.data_nascimento}
                    onChangeDate={(date) =>
                      setFieldValue('pessoa.data_nascimento', date)
                    }
                    value={values.pessoa.data_nascimento}
                    maximumDate={getMinDateFor18YearsOld()}
                  />
                  <InputText
                    isDisabled={isDisabledAll}
                    isRequired={true}
                    isInvalid={errors.pessoa?.cpf ? true : false}
                    inputType="cpf"
                    value={values.pessoa.cpf}
                    onChangeValue={handleChange('pessoa.cpf')}
                    error={errors.pessoa?.cpf}
                  />
                </>
              )}
              {!isNewPerson && (
                <Box gap="$5">
                  {values.pessoa.id !== 0 && (
                    <Box>
                      <Card>
                        <HStack>
                          <VStack>
                            <Heading>Pessoa</Heading>
                            <Box>
                              <Heading>Nome</Heading>
                              <Text>{values.pessoa.nome}</Text>
                            </Box>
                            <Box>
                              <Heading>Data de Nascimento</Heading>
                              <Text>
                                {new Intl.DateTimeFormat('pt-BR', {
                                  day: '2-digit',
                                  month: '2-digit',
                                  year: 'numeric',
                                }).format(
                                  new Date(values.pessoa.data_nascimento),
                                )}
                              </Text>
                            </Box>
                            <Box>
                              <Heading>CPF</Heading>
                              <Text>{values.pessoa.cpf}</Text>
                            </Box>
                          </VStack>
                        </HStack>
                      </Card>
                    </Box>
                  )}
                  <Box>
                    <Button
                      onPress={() =>
                        navigation?.navigate('selecionar-pessoa', {
                          pessoas: pessoas.map((pes) => {
                            return {
                              ...pes,
                              data_nascimento: getStringFromDate(
                                pes.data_nascimento,
                              ),
                            };
                          }),
                          screen: 'cadastrar-cliente',
                          pessoaSelecionada: {
                            ...values.pessoa,
                            data_nascimento: getStringFromDate(
                              values.pessoa.data_nascimento,
                            ),
                          },
                        })
                      }
                    >
                      <ButtonText>
                        {values.pessoa.id === 0
                          ? 'Selecionar Pessoa'
                          : 'Atualizar Pessoa'}
                      </ButtonText>
                    </Button>
                    <Button
                      onPress={() => {
                        setFieldValue('pessoa', {
                          id: Number(null),
                          nome: '',
                          data_nascimento: getMinDateFor18YearsOld(),
                          cpf: '',
                        });
                        setIsNewPerson(true);
                      }}
                    >
                      <ButtonText>Cadastrar Pessoa</ButtonText>
                    </Button>
                  </Box>
                </Box>
              )}
              <>
                <InputText
                  isDisabled={isDisabledAll ? isDisabledAll : isDisabledAddress}
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
                  isDisabled={isDisabledAll ? isDisabledAll : isDisabledAddress}
                  isRequired={true}
                >
                  <FormControlLabel>
                    <FormControlLabelText>Logradouro</FormControlLabelText>
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
                      Informe o logradouro do cliente.
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
                  isDisabled={isDisabledAll ? isDisabledAll : isDisabledAddress}
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
                    <FormControlErrorText>{errors.numero}</FormControlErrorText>
                  </FormControlError>
                </FormControl>
                <FormControl
                  isInvalid={errors.complemento ? true : false}
                  size={'md'}
                  isDisabled={false}
                  isRequired={false}
                >
                  <FormControlLabel>
                    <FormControlLabelText>Complemento</FormControlLabelText>
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
                    <FormControlErrorText>{errors.bairro}</FormControlErrorText>
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
                    <FormControlErrorText>{errors.cidade}</FormControlErrorText>
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
                          onChangeValue={handleChange(`telefones[${i}].numero`)}
                        />
                      </Box>
                    );
                  })}
                  <Button
                    onPress={() => {
                      setFieldValue('telefones', [
                        ...values.telefones,
                        {
                          numero: '',
                        },
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
                            <FormControlLabelText>Email</FormControlLabelText>
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
                        {
                          endereco: '',
                        },
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
              <InputText
                inputType="money"
                value={values.saldo}
                onChangeValue={handleChange('saldo')}
                error={errors.saldo}
                isInvalid={errors.saldo ? true : false}
                isRequired={true}
                size="md"
                title="Saldo do cliente"
              />

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
    </>
  );
};

export default FormCreateClient