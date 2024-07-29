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
  AlertCircleIcon,
  ChevronDownIcon,
  AddIcon,
  RemoveIcon,
} from '@gluestack-ui/themed';
import { Box, ScrollView, Text } from '@gluestack-ui/themed';
import React from 'react';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { useThemeApp } from '$providers/theme';
import { CalendarDaysIcon } from '@gluestack-ui/themed';
import { ButtonIcon } from '@gluestack-ui/themed';
import {
  formatDateString,
  verificarAtributosObjeto,
  verificarArray,
} from 'utils';
import Estados from '$databases/Estados.json';
import { RootStackParamList } from '$types/index';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Formik } from 'formik';
import { Alert } from 'react-native';
import * as Yup from 'yup';
import { ValidateForms } from '../../constants/validations';
import { mask } from 'react-native-mask-text';
import { Endereco } from '$classes/endereco';
import { Empresa } from '$classes/empresa';
import { View } from '@gluestack-ui/themed';
import { Email } from '$classes/email';
import { Telefone } from '$classes/telefone';
import { useSQLiteContext } from 'expo-sqlite';
import LoadingScreen from '$components/LoadingScreen';
import { UpdateEmailDto } from '$classes/email/dto/update-email.dto';
import { UpdateTelefoneDto } from '$classes/telefone/dto/update-telefone.dto';
import { UpdateEnderecoDto } from '$classes/endereco/dto/update-endereco.dto';
import MessagesSuccess from 'messages-success';
type EditarEmpresasScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'editar-empresas'
>;
type EditarEmpresasScreenRouteProp = RouteProp<
  RootStackParamList,
  'editar-empresas'
>;
interface EditarEmpresasScreenProps {
  navigation?: EditarEmpresasScreenNavigationProp;
  route?: EditarEmpresasScreenRouteProp;
}
const validator = Yup.object().shape({
  tipo_empresa: Yup.string().required(),
  nome_completo: Yup.string().when('tipo_empresa', {
    is: 'pf',
    then: (yup) => yup.required(ValidateForms.required),
  }),
  data_de_nascimento: Yup.string().when('tipo_empresa', {
    is: 'pf',
    then: (yup) => yup.required(ValidateForms.required),
  }),
  cpf: Yup.string().when('tipo_empresa', {
    is: 'pf',
    then: (yup) => yup.required(ValidateForms.required),
  }),
  nome_fantasia: Yup.string().when('tipo_empresa', {
    is: 'pj',
    then: (yup) => yup.required(ValidateForms.required),
  }),
  razao_social: Yup.string().when('tipo_empresa', {
    is: 'pj',
    then: (yup) => yup.required(ValidateForms.required),
  }),
  cnpj: Yup.string().when('tipo_empresa', {
    is: 'pj',
    then: (yup) => yup.required(ValidateForms.required),
  }),
  cep: Yup.string().required(ValidateForms.required),
  logradouro: Yup.string().required(ValidateForms.required),
  numero: Yup.string()
    .required(ValidateForms.required)
    .matches(/^[0-9]+$/, ValidateForms.number_only),
  bairro: Yup.string().required(ValidateForms.required),
  cidade: Yup.string().required(ValidateForms.required),
  uf: Yup.string().required(ValidateForms.required),
  emails: Yup.array().of(
    Yup.object().shape({
      email: Yup.string()
        .email(ValidateForms.email)
        .required(ValidateForms.required),
    }),
  ),
  telefones: Yup.array().of(
    Yup.object().shape({
      telefone: Yup.string()
        .matches(
          /^(\+\d{1,3} )?\(\d{2}\) \d{4,5}-\d{4}$/,
          ValidateForms.phone_number,
        )
        .required(ValidateForms.required),
    }),
  ),
});
const Update: React.FC<EditarEmpresasScreenProps> = ({ navigation, route }) => {
  if (!route) {
    navigation?.navigate('listar-empresas');
    return null;
  } else if (!route.params) {
    navigation?.navigate('listar-empresas');
    return null;
  } else if (!route.params.empresa) {
    navigation?.navigate('listar-empresas');
    return null;
  }

  const empresas = route.params.empresa;

  const [isLoading, setIsLoading] = React.useState(true);

  const [OEndereco, setOEndereco] = React.useState<UpdateEnderecoDto | object>(
    {},
  );
  const [ArrayTelefones, setArrayTelefones] = React.useState<
    Array<UpdateTelefoneDto> | Array<never>
  >([]);
  const [ArrayEmails, setArrayEmails] = React.useState<
    Array<UpdateEmailDto> | Array<never>
  >([]);
  const [nomeEstado, setNomeEstado] = React.useState('');
  const db = useSQLiteContext();

  const StartApp = async () => {
    const endereco = await new Endereco(db).findById(empresas.id_endereco);
    const telefones = await new Telefone(db).findByIdEmpresa(empresas.id);
    const emails = await new Email(db).findAllByIdEmpresa(empresas.id);
    setOEndereco(endereco);
    setArrayTelefones(telefones);
    setArrayEmails(emails);
    setIsLoading(false);
    setNomeEstado(String(Estados.find((uf) => uf.sigla === endereco.uf)?.nome));
  };

  const { theme } = useThemeApp();

  const [isAllDisabled, setIsAllDisabled] = React.useState({
    tipo_empresa: false,
    nome_completo: false,
    cpf: false,
    data_de_nascimento: false,
    nome_fantasia: false,
    razao_social: false,
    cnpj: false,
    cep: false,
    logradouro: false,
    numero: false,
    complemento: false,
    bairro: false,
    cidade: false,
    uf: false,
    emails: [false],
    telefones: [false],
  });

  React.useEffect(() => {
    StartApp();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <ScrollView>
      <Box mx="$10" my="$5" gap="$5">
        <Text size="xl" textAlign="center">
          Atualize os dados da empresa: {}
        </Text>
        <Formik
          validationSchema={validator}
          initialValues={{
            tipo_empresa: empresas.cnpj ? 'pj' : ('pf' as 'pj' | 'pf'),
            id: empresas.id,
            nome_completo: empresas.nome_completo ? empresas.nome_completo : '',
            cpf: empresas.cpf ? empresas.cpf : '',
            data_de_nascimento: empresas.data_de_nascimento
              ? empresas.data_de_nascimento
              : '',
            nome_fantasia: empresas.nome_fantasia ? empresas.nome_fantasia : '',
            razao_social: empresas.razao_social ? empresas.razao_social : '',
            cnpj: empresas.cnpj ? empresas.cnpj : '',
            id_endereco: empresas.id_endereco,
            cep: (OEndereco as UpdateEnderecoDto).cep,
            logradouro: (OEndereco as UpdateEnderecoDto).logradouro,
            numero: (OEndereco as UpdateEnderecoDto).numero,
            complemento: (OEndereco as UpdateEnderecoDto).complemento,
            bairro: (OEndereco as UpdateEnderecoDto).bairro,
            cidade: (OEndereco as UpdateEnderecoDto).cidade,
            uf: (OEndereco as UpdateEnderecoDto).uf,
            emails: ArrayEmails as Array<UpdateEmailDto>,
            telefones: ArrayTelefones as Array<UpdateTelefoneDto>,
          }}
          onSubmit={async (values) => {
            try {
              if (values.tipo_empresa === 'pf') {
                const data_pf = {
                  id: values.id,
                  nome_completo: values.nome_completo,
                  cpf: values.cpf,
                  data_de_nascimento: values.data_de_nascimento,
                  id_endereco: values.id_endereco as number,
                };
                const data_end = {
                  id: values.id_endereco as number,
                  cep: values.cep,
                  logradouro: values.logradouro,
                  numero: Number(values.numero),
                  complemento: values.complemento,
                  bairro: values.bairro,
                  cidade: values.cidade,
                  uf: values.uf,
                };
                const { emails, telefones } = values;
                await new Endereco(db).update(data_end.id, data_end);
                await new Empresa(db).update(data_pf.id, data_pf);
                emails.map(async (value) => {
                  try {
                    if (value.id === 0) {
                      await new Email(db).create({
                        email: value.email,
                        id_empresa: values.id,
                      });
                    } else {
                      await new Email(db).update(value.id as number, value);
                    }
                  } catch (error) {
                    throw error;
                  }
                });
                telefones.map(async (value) => {
                  try {
                    if (value.id === 0) {
                      await new Telefone(db).create({
                        telefone: value.telefone,
                        id_empresa: values.id,
                      });
                    } else {
                      await new Telefone(db).update(value.id as number, value);
                    }
                  } catch (error) {
                    throw error;
                  }
                });
                navigation?.navigate('listar-empresas');
              } else {
                const data_pj = {
                  nome_fantasia: values.nome_fantasia,
                  razao_social: values.razao_social,
                  cnpj: values.cnpj,
                };
                if (!verificarAtributosObjeto(data_pj)) {
                  throw new Error('Ainda Existem atributos vazios!');
                }
                const data_end = {
                  cep: values.cep,
                  logradouro: values.logradouro,
                  numero: Number(values.numero),
                  complemento: values.complemento,
                  bairro: values.bairro,
                  cidade: values.cidade,
                  uf: values.uf,
                };
                if (!verificarAtributosObjeto(data_end)) {
                  throw new Error('Ainda Existem atributos vazios!');
                }
                const { emails, telefones } = values;
                if (!verificarArray(emails) || !verificarArray(telefones)) {
                  throw new Error('Ainda Existem atributos vazios!');
                }
                const result_end = await new Endereco(db).create(data_end);
                await new Empresa(db).create({
                  id_endereco: result_end.id,
                  ...data_pj,
                });
                emails.map(async (value) => {
                  try {
                    await new Email(db).update(value.id as number, value);
                  } catch (error) {
                    throw error;
                  }
                });
                telefones.map(async (value) => {
                  try {
                    await new Telefone(db).update(value.id as number, value);
                  } catch (error) {
                    throw error;
                  }
                });
                Alert.alert('Sucesso!', MessagesSuccess);
                navigation?.navigate('listar-empresas');
              }
            } catch (error) {
              Alert.alert('erro', (error as Error).message);
            }
          }}
        >
          {({ values, errors, handleChange, setFieldValue, handleSubmit }) => {
            const busca_cep = async (cep: string) => {
              setIsAllDisabled({
                ...isAllDisabled,
                logradouro: true,
                complemento: true,
                bairro: true,
                uf: true,
                cidade: true,
              });
              try {
                const result = await fetch(
                  `https://viacep.com.br/ws/${cep.replace(
                    /[^a-zA-Z0-9 ]/g,
                    '',
                  )}/json`,
                );
                if (!result.ok) {
                  throw new Error(
                    'Erro ao realizar a validacao tente novamente',
                  );
                }
                const data = await result.json();
                if (!data.logradouro) {
                  throw new Error(
                    'Erro ao realizar a validacao tente novamente',
                  );
                }
                setFieldValue('logradouro', data.logradouro);
                setFieldValue('complemento', data.complemento);
                setFieldValue('bairro', data.bairro);
                setFieldValue('cidade', data.localidade);
                setFieldValue('uf', data.uf);
                const nome = Estados.find((est) => est.sigla == data.uf)?.nome;
                setNomeEstado(nome ? nome : data.uf);
                setIsAllDisabled({
                  ...isAllDisabled,
                  logradouro: true,
                  complemento: false,
                  bairro: true,
                  uf: true,
                  cidade: true,
                });
              } catch (error) {
                if (error) {
                  setIsAllDisabled({
                    ...isAllDisabled,
                    logradouro: false,
                    complemento: false,
                    bairro: false,
                    uf: false,
                    cidade: false,
                  });
                  Alert.alert('Erro', (error as Error).message);
                }
              }
            };

            return (
              <>
                <FormControl
                  isInvalid={false}
                  size={'md'}
                  isDisabled={false}
                  isRequired={true}
                >
                  <FormControlLabel>
                    <FormControlLabelText>Tipo de empresa</FormControlLabelText>
                  </FormControlLabel>
                  <Select
                    onValueChange={handleChange('tipo_empresa')}
                    isInvalid={false}
                    isDisabled={false}
                    selectedValue={
                      values.tipo_empresa === 'pj'
                        ? 'Empresa Pessoa Juridica'
                        : 'Empresa Pessoa Física (Autonomo)'
                    }
                  >
                    <SelectTrigger size={'md'} variant={'outline'}>
                      <SelectInput placeholder="Select um tipo de empresa" />
                      <SelectIcon mr={'$3'} ml={0} as={ChevronDownIcon} />
                    </SelectTrigger>
                    <SelectPortal>
                      <SelectBackdrop />
                      <SelectContent>
                        <SelectDragIndicatorWrapper>
                          <SelectDragIndicator />
                        </SelectDragIndicatorWrapper>
                        <SelectItem
                          label="Empresa Pessoa Juridica"
                          value="pj"
                          isPressed={values.tipo_empresa === 'pj'}
                        />
                        <SelectItem
                          label="Empresa Pessoa Física (Autonomo)"
                          value="pf"
                          isPressed={values.tipo_empresa === 'pf'}
                        />
                      </SelectContent>
                    </SelectPortal>
                  </Select>
                  <FormControlHelper>
                    <FormControlHelperText>
                      Selecione o tipo da empresa.
                    </FormControlHelperText>
                  </FormControlHelper>

                  <FormControlError>
                    <FormControlErrorIcon as={AlertCircleIcon} />
                    <FormControlErrorText>
                      è necessário inserir o tipo da empresa para prosseguir.
                    </FormControlErrorText>
                  </FormControlError>
                </FormControl>
                {values.tipo_empresa === 'pj' ? (
                  <>
                    <FormControl
                      isInvalid={errors.nome_fantasia ? true : false}
                      size={'md'}
                      isDisabled={isAllDisabled.nome_fantasia}
                      isRequired={true}
                    >
                      <FormControlLabel>
                        <FormControlLabelText>
                          Nome Fantasia
                        </FormControlLabelText>
                      </FormControlLabel>
                      <Input>
                        <InputField
                          value={values.nome_fantasia}
                          onChangeText={handleChange('nome_fantasia')}
                          type="text"
                          placeholder="Nome fantasia"
                        />
                      </Input>

                      <FormControlHelper>
                        <FormControlHelperText>
                          Informe o nome fantasia de sua empresa.
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
                      isInvalid={errors.nome_fantasia ? true : false}
                      size={'md'}
                      isDisabled={isAllDisabled.razao_social}
                      isRequired={true}
                    >
                      <FormControlLabel>
                        <FormControlLabelText>
                          Razão Social
                        </FormControlLabelText>
                      </FormControlLabel>
                      <Input>
                        <InputField
                          value={values.razao_social}
                          onChangeText={handleChange('razao_social')}
                          type="text"
                          placeholder="Razão social"
                        />
                      </Input>

                      <FormControlHelper>
                        <FormControlHelperText>
                          Informe a sua razão social aqui.
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
                      isInvalid={errors.cnpj ? true : false}
                      size={'md'}
                      isDisabled={isAllDisabled.cnpj}
                      isRequired={true}
                    >
                      <FormControlLabel>
                        <FormControlLabelText>Cnpj</FormControlLabelText>
                      </FormControlLabel>
                      <Input>
                        <InputField
                          value={values.cnpj}
                          onChangeText={(text) =>
                            setFieldValue(
                              'cnpj',
                              mask(text, '99.999.999/9999-99'),
                            )
                          }
                          keyboardType="number-pad"
                          type="text"
                          placeholder="Cnpj"
                        />
                      </Input>

                      <FormControlHelper>
                        <FormControlHelperText>
                          Insira o número do cnpj da empresa.
                        </FormControlHelperText>
                      </FormControlHelper>

                      <FormControlError>
                        <FormControlErrorIcon as={AlertCircleIcon} />
                        <FormControlErrorText>
                          {errors.cnpj}
                        </FormControlErrorText>
                      </FormControlError>
                    </FormControl>
                  </>
                ) : (
                  <>
                    <FormControl
                      isInvalid={errors.nome_completo ? true : false}
                      size={'md'}
                      isDisabled={isAllDisabled.nome_completo}
                      isRequired={true}
                    >
                      <FormControlLabel>
                        <FormControlLabelText>
                          Nome Completo
                        </FormControlLabelText>
                      </FormControlLabel>
                      <Input>
                        <InputField
                          value={values.nome_completo}
                          onChangeText={handleChange('nome_completo')}
                          type="text"
                          placeholder="ex: João Carlos dos Santos Souza"
                        />
                      </Input>

                      <FormControlHelper>
                        <FormControlHelperText>
                          Informe o nome completo do autonomo.
                        </FormControlHelperText>
                      </FormControlHelper>

                      <FormControlError>
                        <FormControlErrorIcon as={AlertCircleIcon} />
                        <FormControlErrorText>
                          {errors.nome_completo}
                        </FormControlErrorText>
                      </FormControlError>
                    </FormControl>
                    <FormControl
                      isInvalid={errors.cpf ? true : false}
                      size={'md'}
                      isDisabled={isAllDisabled.cpf}
                      isRequired={true}
                    >
                      <FormControlLabel>
                        <FormControlLabelText>CPF</FormControlLabelText>
                      </FormControlLabel>
                      <Input>
                        <InputField
                          keyboardType="number-pad"
                          value={values.cpf}
                          onChangeText={(text) =>
                            setFieldValue('cpf', mask(text, '999.999.999-99'))
                          }
                          type="text"
                          placeholder="CPF"
                        />
                      </Input>

                      <FormControlHelper>
                        <FormControlHelperText>
                          Informe o CPF do vendedor autonomo.
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
                      isInvalid={errors.data_de_nascimento ? true : false}
                      size={'md'}
                      isDisabled={isAllDisabled.data_de_nascimento}
                      isRequired={true}
                    >
                      <FormControlLabel>
                        <FormControlLabelText>
                          Data de nascimento
                        </FormControlLabelText>
                      </FormControlLabel>
                      <Input>
                        <InputField
                          editable={false}
                          readOnly={true}
                          type="text"
                          value={formatDateString(
                            new Date(String(values.data_de_nascimento)),
                          )}
                          placeholder="data"
                        />
                        <Button
                          onPress={() => {
                            DateTimePickerAndroid.open({
                              value: new Date(
                                String(values.data_de_nascimento),
                              ),
                              mode: 'date',
                              onChange: (event, date) => {
                                if (date) {
                                  setFieldValue('data_de_nascimento', date);
                                }
                              },
                            });
                          }}
                        >
                          <ButtonIcon as={CalendarDaysIcon} />
                        </Button>
                      </Input>

                      <FormControlHelper>
                        <FormControlHelperText>
                          Deve ser informada a data de nascimento.
                        </FormControlHelperText>
                      </FormControlHelper>

                      <FormControlError>
                        <FormControlErrorIcon as={AlertCircleIcon} />
                        <FormControlErrorText>
                          {errors.data_de_nascimento as string}
                        </FormControlErrorText>
                      </FormControlError>
                    </FormControl>
                  </>
                )}
                <FormControl
                  isInvalid={errors.cep ? true : false}
                  size={'md'}
                  isDisabled={isAllDisabled.cep}
                  isRequired={true}
                >
                  <FormControlLabel>
                    <FormControlLabelText>Cep</FormControlLabelText>
                  </FormControlLabel>
                  <Input>
                    <InputField
                      value={mask(values.cep, '99.999-999')}
                      keyboardType="number-pad"
                      type="text"
                      placeholder="ex: 12.123-321"
                      onChangeText={handleChange('cep')}
                      onBlur={() => {
                        busca_cep(values.cep);
                      }}
                    />
                  </Input>

                  <FormControlHelper>
                    <FormControlHelperText>
                      Informe o cep de sua empresa.
                    </FormControlHelperText>
                  </FormControlHelper>

                  <FormControlError>
                    <FormControlErrorIcon as={AlertCircleIcon} />
                    <FormControlErrorText>{errors.cep}</FormControlErrorText>
                  </FormControlError>
                </FormControl>
                <FormControl
                  isInvalid={errors.logradouro ? true : false}
                  size={'md'}
                  isDisabled={isAllDisabled.logradouro}
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
                      placeholder="ex: Rua José Canóvas"
                    />
                  </Input>

                  <FormControlHelper>
                    <FormControlHelperText>
                      Informe o logradouro de sua empresa.
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
                  isDisabled={isAllDisabled.numero}
                  isRequired={true}
                >
                  <FormControlLabel>
                    <FormControlLabelText>Número</FormControlLabelText>
                  </FormControlLabel>
                  <Input>
                    <InputField
                      keyboardType="number-pad"
                      value={String(values.numero)}
                      onChangeText={handleChange('numero')}
                      type="text"
                      placeholder="ex: 123"
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
                  size={'md'}
                  isDisabled={isAllDisabled.complemento}
                  isRequired={false}
                >
                  <FormControlLabel>
                    <FormControlLabelText>Complemento</FormControlLabelText>
                  </FormControlLabel>
                  <View as={Textarea}>
                    <TextareaInput
                      value={values.complemento}
                      onChangeText={handleChange('complemento')}
                      placeholder="Informe o complemento do seu endereco aqui."
                    />
                  </View>
                  <FormControlHelper>
                    <FormControlHelperText>
                      Informe o complemento do endereço.
                    </FormControlHelperText>
                  </FormControlHelper>
                </FormControl>

                <FormControl
                  isInvalid={errors.bairro ? true : false}
                  size={'md'}
                  isDisabled={isAllDisabled.bairro}
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
                      placeholder="ex: Tucanos"
                    />
                  </Input>

                  <FormControlHelper>
                    <FormControlHelperText>
                      Informe o nome do bairro do endereço.
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
                  isDisabled={isAllDisabled.cidade}
                  isRequired={true}
                >
                  <FormControlLabel>
                    <FormControlLabelText>Cidade</FormControlLabelText>
                  </FormControlLabel>
                  <Input>
                    <InputField
                      value={values.cidade}
                      onChangeText={handleChange('cidadde')}
                      type="text"
                      placeholder="ex: Araras"
                    />
                  </Input>

                  <FormControlHelper>
                    <FormControlHelperText>
                      {errors.cidade}
                    </FormControlHelperText>
                  </FormControlHelper>

                  <FormControlError>
                    <FormControlErrorIcon as={AlertCircleIcon} />
                    <FormControlErrorText>{errors.cidade}</FormControlErrorText>
                  </FormControlError>
                </FormControl>
                <FormControl
                  isInvalid={errors.uf ? true : false}
                  size={'md'}
                  isDisabled={isAllDisabled.uf}
                  isRequired={true}
                >
                  <FormControlLabel>
                    <FormControlLabelText>Estados</FormControlLabelText>
                  </FormControlLabel>
                  <Select
                    isInvalid={errors.uf ? true : false}
                    isDisabled={isAllDisabled.uf}
                    onValueChange={(value) => {
                      const nome = Estados.find(
                        (est) => est.sigla == value,
                      )?.nome;
                      setFieldValue('uf', value);
                      setNomeEstado(nome ? nome : value);
                    }}
                    selectedValue={nomeEstado}
                  >
                    <SelectTrigger size={'lg'} variant={'outline'}>
                      <SelectInput placeholder="Select option" />
                      <SelectIcon mr={'$3'} ml={0} as={ChevronDownIcon} />
                    </SelectTrigger>
                    <SelectPortal>
                      <SelectBackdrop />
                      <SelectContent>
                        <SelectDragIndicatorWrapper>
                          <SelectDragIndicator />
                        </SelectDragIndicatorWrapper>
                        <ScrollView w="$full">
                          {Estados.map((estado) => (
                            <SelectItem
                              key={estado.id}
                              value={estado.sigla}
                              label={estado.nome}
                              isPressed={values.uf === estado.sigla}
                            />
                          ))}
                        </ScrollView>
                      </SelectContent>
                    </SelectPortal>
                  </Select>
                  <FormControlHelper>
                    <FormControlHelperText>
                      Selecione o estado correspondente.
                    </FormControlHelperText>
                  </FormControlHelper>

                  <FormControlError>
                    <FormControlErrorIcon as={AlertCircleIcon} />
                    <FormControlErrorText>{errors.uf}</FormControlErrorText>
                  </FormControlError>
                </FormControl>
                {values.telefones.map((value, i) => (
                  <FormControl
                    key={i}
                    isInvalid={
                      errors.telefones && errors.telefones[i] ? true : false
                    }
                    size={'md'}
                    isDisabled={false}
                    isRequired={true}
                  >
                    <FormControlLabel>
                      <FormControlLabelText>
                        Telefone {i + 1}
                      </FormControlLabelText>
                    </FormControlLabel>
                    <Input>
                      <InputField
                        type="text"
                        keyboardType="numeric"
                        value={value.telefone}
                        placeholder="ex: +55 99 99999-9999"
                        onChangeText={(text) => {
                          const valor = values.telefones;
                          valor[i] = {
                            ...value,
                            telefone: mask(text, '+55 (99) 99999-9999'),
                          };
                          setFieldValue('telefones', valor);
                        }}
                      />
                    </Input>

                    <FormControlHelper>
                      <FormControlHelperText>
                        Informe um telefone.
                      </FormControlHelperText>
                    </FormControlHelper>

                    <FormControlError>
                      <FormControlErrorIcon as={AlertCircleIcon} />
                      <FormControlErrorText>
                        {errors.telefones &&
                        errors.telefones[i] &&
                        typeof errors.telefones[i] != 'string' &&
                        'telefone' in errors.telefones[i]
                          ? errors.telefones[i].telefone
                          : null}
                      </FormControlErrorText>
                    </FormControlError>
                  </FormControl>
                ))}
                <Button
                  action="positive"
                  onPress={() =>
                    setFieldValue('telefones', [
                      ...values.telefones,
                      {
                        telefone: '',
                        id_empresa: 0,
                        id: 0,
                      } as UpdateTelefoneDto,
                    ])
                  }
                >
                  <ButtonIcon as={AddIcon} />
                </Button>
                <Button
                  action="negative"
                  onPress={() => {
                    if (values.telefones.length > 1) {
                      setFieldValue('telefones', [
                        ...values.telefones.slice(0, -1),
                      ]);
                    } else {
                      Alert.alert('Erro', 'Não há o que ser removido!');
                    }
                  }}
                >
                  <ButtonIcon as={RemoveIcon} />
                </Button>

                {values.emails.map((value, i) => (
                  <FormControl
                    key={i}
                    isInvalid={errors.emails && errors.emails[i] ? true : false}
                    size={'md'}
                    isDisabled={false}
                    isRequired={true}
                  >
                    <FormControlLabel>
                      <FormControlLabelText>
                        E-mail {i + 1}
                      </FormControlLabelText>
                    </FormControlLabel>
                    <Input>
                      <InputField
                        type="text"
                        value={value.email}
                        placeholder="ex: teste@teste.com"
                        onChangeText={(text) => {
                          const valor = values.emails;
                          valor[i] = { ...value, email: text };
                          setFieldValue('emails', valor);
                        }}
                      />
                    </Input>

                    <FormControlHelper>
                      <FormControlHelperText>
                        Informe Um E-mail.
                      </FormControlHelperText>
                    </FormControlHelper>

                    <FormControlError>
                      <FormControlErrorIcon as={AlertCircleIcon} />
                      <FormControlErrorText>
                        {errors.emails &&
                        errors.emails[i] &&
                        typeof errors.emails[i] != 'string' &&
                        'email' in errors.emails[i]
                          ? errors.emails[i].email
                          : null}
                      </FormControlErrorText>
                    </FormControlError>
                  </FormControl>
                ))}
                <Button
                  action="positive"
                  onPress={() =>
                    setFieldValue('emails', [
                      ...values.emails,
                      { email: '', id_empresa: 0, id: 0 } as UpdateEmailDto,
                    ])
                  }
                >
                  <ButtonIcon as={AddIcon} />
                </Button>
                <Button
                  action="negative"
                  onPress={() => {
                    if (values.emails.length > 1) {
                      setFieldValue('emails', [...values.emails.slice(0, -1)]);
                    } else {
                      Alert.alert('Erro', 'Não há o que ser removido!');
                    }
                  }}
                >
                  <ButtonIcon as={RemoveIcon} />
                </Button>
                <Box>
                  <Button
                    onPress={() => {
                      handleSubmit();
                    }}
                    $active-bgColor={
                      theme === 'dark' ? '$purple700' : '$purple500'
                    }
                    $dark-backgroundColor="$purple500"
                    $light-backgroundColor="$purple700"
                  >
                    <ButtonText>Atualizar</ButtonText>
                  </Button>
                </Box>
              </>
            );
          }}
        </Formik>
      </Box>
    </ScrollView>
  );
};
export default Update;
