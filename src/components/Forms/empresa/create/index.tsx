import { getMinDateFor18YearsOld, getStringFromDate } from '@/utils';
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
  Card,
} from '@gluestack-ui/themed';
import { Formik } from 'formik';

import React from 'react';
import { validationSchema } from './validation';
import { EmpresaService } from '@/classes/empresa/empresa.service';
import { IFormCreateEmpresa } from './interfaces';
import { Alert, GestureResponderEvent } from 'react-native';
import InputDatePicker from '@/components/Custom/Inputs/DatePicker';
import InputText from '@/components/Input';
import formatDate from '@/utils/formatDate';
import SelectEstados from '@/components/Custom/Selects/SelectEstados';
import { ButtonIcon } from '@gluestack-ui/themed';
import { AddIcon } from '@gluestack-ui/themed';
import { RemoveIcon } from '@gluestack-ui/themed';
import buscaCep from '@/utils/buscaCep/buscaCep';
const FormCreateEmpresa: React.FC<IFormCreateEmpresa> = ({ db, onSubmited, onChangePessoa, onChangeRamo, pessoas, pessoa, haveRamos, ramo,  }) => {
  const [isNewPerson, setIsNewPerson] = React.useState(pessoas.length < 1);
  const [isNewRamo, setIsNewRamo] = React.useState(!haveRamos);
  const [isReadOnlyAll, setIsReadOnlyAll] = React.useState(false);
  const [isReadOnlyAddress, setIsReadOnlyAddress] = React.useState(false);
  
    return (
    <>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          pessoa: {
            id: Number(null),
            nome: '',
            data_nascimento: getMinDateFor18YearsOld(),
            cpf: '',
          },
          cnpj: '',
          nome_fantasia: '',
          razao_social: '',
          ramo: {
            id: Number(null),
            nome: '',
          },
          cep: '',
          logradouro: '',
          numero: '',
          complemento: '',
          bairro: '',
          cidade: '',
          uf: '',
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
            await new EmpresaService(db).create(values);
            Alert.alert('Sucesso', 'Empresa cadastrada com sucesso!');
            onSubmited()
          } catch (error) {
            Alert.alert('Erro', (error as Error).message);
            throw error;
          }
        }}
      >
        {({ handleChange, handleSubmit, setFieldValue, values, errors }) => {
          React.useEffect(() => {
            if (pessoa) {
              const { data_nascimento, ...person } = pessoa;
              setFieldValue('pessoa', {
                ...person,
                data_nascimento: new Date(data_nascimento),
              });
            }
          }, [pessoa]);
          React.useEffect(() => { 
            if (ramo) {
              const rm = ramo;
              setFieldValue('ramo', rm);
            }
          }, [ramo]);
          return (
            <Box gap="$8">
              {values.pessoa.id === 0 && !isNewPerson && (
                <Box gap="$5" mt="$5">
                  <Heading size="md">Selecione uma pessoa:</Heading>
                  <Box gap="$5">
                    <Button
                      onPress={() => {
                        onChangePessoa(pessoas, { ...values.pessoa, data_nascimento: getStringFromDate(values.pessoa.data_nascimento) })
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
              {values.pessoa.id !== 0 && !isNewPerson && (
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
                      onPress={() => onChangePessoa(pessoas, {
                        id: values.pessoa.id,
                        nome: values.pessoa.nome,
                        cpf: values.pessoa.cpf,
                        data_nascimento: getStringFromDate(values.pessoa.data_nascimento)
                      })}
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
                    isReadOnly={isReadOnlyAll}
                    isDisabled={false}
                    isRequired={true}
                  >
                    <FormControlLabel>
                      <FormControlLabelText>Nome</FormControlLabelText>
                    </FormControlLabel>
                    <Input>
                      <InputField
                        type="text"
                        placeholder="Nome Completo da Pessoa"
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
                    isReadOnly={isReadOnlyAll}
                    title="Data de nascimento"
                    maximumDate={getMinDateFor18YearsOld()}
                    value={values.pessoa.data_nascimento}
                    onChangeDate={(data) =>
                      setFieldValue('pessoa.data_nascimento', data)
                    }
                    error={errors.pessoa?.data_nascimento}
                  />
                  <InputText
                    isReadOnly={isReadOnlyAll}
                    isInvalid={errors.pessoa?.cpf ? true : false}
                    error={errors.pessoa?.cpf}
                    value={values.pessoa.cpf}
                    onChangeValue={handleChange('pessoa.cpf')}
                    inputType="cpf"
                  />
                </>
              )}

              {values.ramo.id === 0 && !isNewRamo ? (
                <Box>
                  <Box>
                    <Heading>Selecione o ramo</Heading>
                  </Box>
                  <Box gap="$5">
                    <Button
                      onPress={() => onChangeRamo(values.ramo)}
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
                      onPress={() => onChangeRamo(values.ramo)}
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
                    isReadOnly={isReadOnlyAll}
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
                isReadOnly={isReadOnlyAll}
                isInvalid={errors.nome_fantasia ? true : false}
                size={'md'}
                isDisabled={false}
                isRequired={true}
              >
                <FormControlLabel>
                  <FormControlLabelText>Nome Fantasia</FormControlLabelText>
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
                isReadOnly={isReadOnlyAll}
                isInvalid={errors.razao_social ? true : false}
                size={'md'}
                isDisabled={false}
                isRequired={true}
              >
                <FormControlLabel>
                  <FormControlLabelText>Razão Social</FormControlLabelText>
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
                    Informe uma razão social de acorod com o que foi descrito.
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
                isReadOnly={isReadOnlyAll}
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
                isReadOnly={isReadOnlyAll ? isReadOnlyAll : isReadOnlyAddress}
                size="md"
                isInvalid={errors.cep ? true : false}
                inputType="cep"
                value={values.cep}
                error={errors.cep}
                onChangeValue={handleChange('cep')}
                onBlur={async () => {
                  try {
                    setIsReadOnlyAddress(true);
                    const data = await buscaCep(values.cep);
                    setFieldValue('logradouro', data.logradouro);
                    setFieldValue('bairro', data.bairro);
                    setFieldValue('cidade', data.localidade);
                    setFieldValue('complemento', data.complemento);
                    setFieldValue('uf', data.uf);
                  } catch (error) {
                    setIsReadOnlyAddress(false);
                  }
                }}
              />

              <FormControl
                isReadOnly={isReadOnlyAll ? isReadOnlyAll : isReadOnlyAddress}
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
                    {errors.logradouro}
                  </FormControlErrorText>
                </FormControlError>
              </FormControl>

              <FormControl
                isReadOnly={isReadOnlyAll}
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
                    value={values.numero}
                    onChangeText={handleChange('numero')}
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
                  <FormControlErrorText>{errors.numero}</FormControlErrorText>
                </FormControlError>
              </FormControl>
              <FormControl
                isReadOnly={isReadOnlyAll}
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
                    value={values.complemento}
                    onChangeText={handleChange('complemento')}
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
                    {errors.complemento}
                  </FormControlErrorText>
                </FormControlError>
              </FormControl>
              <FormControl
                isReadOnly={isReadOnlyAll ? isReadOnlyAll : isReadOnlyAddress}
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
                  <FormControlErrorText>{errors.bairro}</FormControlErrorText>
                </FormControlError>
              </FormControl>
              <FormControl
                isReadOnly={isReadOnlyAll ? isReadOnlyAll : isReadOnlyAddress}
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
                  <FormControlErrorText>{errors.cidade}</FormControlErrorText>
                </FormControlError>
              </FormControl>
              <SelectEstados
                isReadOnly={isReadOnlyAll ? isReadOnlyAll : isReadOnlyAddress}
                error={errors.uf}
                value={values.uf}
                isInvalid={errors.uf ? true : false}
                onChangeValue={handleChange('uf')}
              />
              <Box gap="$2.5">
                {values.telefones.map((telefone, i) => {
                  return (
                    <Box key={`telefone-${i}`}>
                      <InputText
                        isReadOnly={isReadOnlyAll}
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
                        onChangeValue={handleChange(`telefones[${i}].numero`)}
                      />
                    </Box>
                  );
                })}

                <Button action="positive" onPress={() => {
                  setFieldValue("telefones",[...values.telefones, { numero: '' }]);
                }}>
                  <ButtonIcon as={AddIcon}/>
                </Button>
                <Button 
                  action="negative" 
                  onPress={() => {
                    if (values.telefones.length > 1) {
                      setFieldValue("telefones",[...values.telefones.slice(-1)]);
                    } else {
                      Alert.alert('Aviso', 'Não há mais telefones a serem removidos')
                    }
                  }}
                >
                  <ButtonIcon as={RemoveIcon} />
                </Button>
              </Box>

              <Box gap="$2.5">
                {values.emails.map((e, i) => {
                  return (
                    <Box key={`email-${i}`}>
                      <FormControl
                        isReadOnly={isReadOnlyAll}
                        isInvalid={
                        errors.emails &&
                          typeof errors?.emails[i] === 'object'
                            ? errors.emails[i].endereco
                              ? true
                              : false
                            : false
                        }
                        size={'md'}
                        isDisabled={false}
                        isRequired={true}
                      >
                        <FormControlLabel>
                          <FormControlLabelText>Email</FormControlLabelText>
                        </FormControlLabel>
                        <Input>
                          <InputField
                            value={e.endereco}
                            type="text"
                            onChangeText={handleChange(`emails[${i}].endereco`)}
                            placeholder="teste@teste.com"
                            keyboardType="email-address"
                          />
                        </Input>

                        <FormControlHelper>
                          <FormControlHelperText>
                            Informe o email válido.
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

                <Button 
                  action="positive"
                  onPress={() => {
                    setFieldValue("emails",[...values.emails, { endereco: '' }]);
                  }}
                >
                  <ButtonIcon as={AddIcon} />
                </Button>
                <Button
                  action="negative"
                  onPress={() => {
                    if (values.emails.length > 1) {
                      setFieldValue("emails",[...values.emails.slice(-1)]);
                    } else {
                      Alert.alert('Aviso', 'Não há mais emails a serem removidos')
                    }
                  }}
                >
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
    </>
  );
};
export default FormCreateEmpresa;
