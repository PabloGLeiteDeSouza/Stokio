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
  Center,
  Icon,
  CircleIcon,
  CheckIcon,
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
import { Alert, GestureResponderEvent } from 'react-native';
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
    Yup.string().email(ValidateForms.email).required(ValidateForms.required),
  ),
  telefones: Yup.array()
    .of(
      Yup.string()
        .matches(
          /^(\+\d{1,3} )?\(\d{2}\) \d{4,5}-\d{4}$/,
          ValidateForms.phone_number,
        )
        .required(ValidateForms.required),
    )
    .required(ValidateForms.required),
});

type AtualizarEmpresasScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'editar-empresas'
>;
type AtualizarEmpresasScreenRouteProp = RouteProp<
  RootStackParamList,
  'editar-empresas'
>;
interface AtualzarEmpresasScreenProps {
  navigation?: AtualizarEmpresasScreenNavigationProp;
  route?: AtualizarEmpresasScreenRouteProp;
}

const Update: React.FC<AtualzarEmpresasScreenProps> = ({
  navigation,
  route,
}) => {
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

  const empresas_obj = route.params.empresa;
  const [isLoading, setIsLoading] = React.useState(true);
  const db = useSQLiteContext();
  const { theme } = useThemeApp();
  const [nomeEstado, setNomeEstado] = React.useState('');
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

  const [endereco, setEndereco] = React.useState({});
  const [emails, setEmails] = React.useState([]);
  const [telefones, setTelefones] = React.useState([]);

  const loadingPage = async () => {
    const endereco_obj = await new Endereco(db).findById(empresas_obj.id_endereco);
    const emails_objs: UpdateEmailDto[] = await new Email(db).findFirstByIdEmpresa(empresas_obj.id);
    const telefones_objs: UpdateTelefoneDto[] = await new Telefone(db).findByIdEmpresa(empresas_obj.id);
    setEndereco(endereco_obj);
    setEmails([...emails_objs])
    setTelefones([...telefones_objs])
  }

  React.useEffect(() => {
    loadingPage();
  }, [])

  if (isLoading) {
    return <LoadingScreen/>
  }

  return (
    <ScrollView>
      <Box mx="$10" my="$5" gap="$5">
        <Text size="xl" textAlign="center">
          Informe os dados da empresa:
        </Text>
        <Formik
          validationSchema={validator}
          initialValues={{
            tipo_empresa: 'pj' as 'pj' | 'pf',
            nome_completo: '',
            cpf: '',
            data_de_nascimento: new Date(),
            nome_fantasia: '',
            razao_social: '',
            cnpj: '',
            cep: '',
            logradouro: '',
            numero: '',
            complemento: '',
            bairro: '',
            cidade: '',
            uf: '',
            emails: [''],
            telefones: [''],
          }}
          onSubmit={async (values) => {
            try {
              if (values.tipo_empresa === 'pf') {
                const data_pf = {
                  nome_completo: values.nome_completo,
                  cpf: values.cpf,
                  data_de_nascimento: values.data_de_nascimento,
                };
                const data_end = {
                  cep: values.cep,
                  logradouro: values.logradouro,
                  numero: Number(values.numero),
                  complemento: values.complemento,
                  bairro: values.bairro,
                  cidade: values.cidade,
                  UF: values.uf,
                };
                const { emails, telefones } = values;
                const result_end = await new Endereco(db).create(data_end);
                console.log('endereço', 'pass');
                const result_pf = await new Empresa(db).create({
                  id_endereco: result_end.id,
                  ...data_pf,
                });
                emails.map(async (value: string) => {
                  try {
                    await new Email(db).create({
                      email: value,
                      id_empresa: result_pf.id,
                    });
                  } catch (error) {
                    throw error;
                  }
                });
                telefones.map(async (value: string) => {
                  try {
                    await new Telefone(db).create({
                      telefone: value,
                      id_empresa: result_pf.id,
                    });
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
                  UF: values.uf,
                };
                if (!verificarAtributosObjeto(data_end)) {
                  throw new Error('Ainda Existem atributos vazios!');
                }
                const { emails, telefones } = values;
                if (!verificarArray(emails) || !verificarArray(telefones)) {
                  throw new Error('Ainda Existem atributos vazios!');
                }
                const result_end = await new Endereco(db).create(data_end);
                const result_pj = await new Empresa(db).create({
                  id_endereco: result_end.id,
                  ...data_pj,
                });
                emails.map(async (value: string) => {
                  try {
                    await new Email(db).create({
                      email: value,
                      id_empresa: result_pj.id,
                    });
                  } catch (error) {
                    throw error;
                  }
                });
                telefones.map(async (value: string) => {
                  try {
                    await new Telefone(db).create({
                      telefone: value,
                      id_empresa: result_pj.id,
                    });
                  } catch (error) {
                    throw error;
                  }
                });
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
                setFieldValue('logradouro', data.logradouro);
                setFieldValue('complemento', data.complemento);
                setFieldValue('bairro', data.bairro);
                setFieldValue('cidade', data.localidade);
                setFieldValue('uf', data.uf);
                const nome = Estados.find((est) => est.sigla == data.uf)?.nome;
                setNomeEstado(nome ? nome : data.uf);
                console.log(data);
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
                    defaultValue="Empresa Pessoa Juridica"
                    onValueChange={handleChange('tipo_empresa')}
                    isInvalid={false}
                    isDisabled={false}
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
                          value={formatDateString(values.data_de_nascimento)}
                          placeholder="data"
                        />
                        <Button
                          onPress={() => {
                            DateTimePickerAndroid.open({
                              value: new Date(),
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
                      value={values.numero}
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
                        value={value}
                        placeholder="ex: +55 99 99999-9999"
                        onChangeText={(text) => {
                          const valor = values.telefones;
                          valor[i] = mask(text, '+55 (99) 99999-9999');
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
                        {errors.telefones && errors.telefones[i]
                          ? errors.telefones[i]
                          : null}
                      </FormControlErrorText>
                    </FormControlError>
                  </FormControl>
                ))}
                <Button
                  action="positive"
                  onPress={() =>
                    setFieldValue('telefones', [...values.telefones, ''])
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
                        value={value}
                        placeholder="ex: teste@teste.com"
                        onChangeText={(text) => {
                          const valor = values.emails;
                          valor[i] = text;
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
                        {errors.emails && errors.emails[i]
                          ? errors.emails[i]
                          : null}
                      </FormControlErrorText>
                    </FormControlError>
                  </FormControl>
                ))}
                <Button
                  action="positive"
                  onPress={() =>
                    setFieldValue('emails', [...values.emails, ''])
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
                    onPress={
                      handleSubmit as unknown as (
                        event: GestureResponderEvent,
                      ) => void
                    }
                    $active-bgColor={
                      theme === 'dark' ? '$purple700' : '$purple500'
                    }
                    $dark-backgroundColor="$purple500"
                    $light-backgroundColor="$purple700"
                  >
                    <ButtonText>Enviar</ButtonText>
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
