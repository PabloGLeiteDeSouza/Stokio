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
} from '@gluestack-ui/themed';
import { Box, ScrollView, Text } from '@gluestack-ui/themed';
import React from 'react';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { useThemeApp } from '$providers/theme';
import { CalendarDaysIcon } from '@gluestack-ui/themed';
import { ButtonIcon } from '@gluestack-ui/themed';
import { formatDateString } from 'utils';
import Estados from '$databases/Estados.json';
import { RootStackParamList } from '$types/index';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Formik } from 'formik';
import { Alert, FlatListComponent } from 'react-native';
import * as Yup from 'yup';
import { ValidateForms } from '../../constants/validations';
import { FA6Style } from '@expo/vector-icons/build/FontAwesome6';


type CadastrarEmpresasScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'cadastrar-empresas'
>;
type CadastrarEmpresasScreenRouteProp = RouteProp<
  RootStackParamList,
  'cadastrar-empresas'
>;
interface CadastrarEmpresasScreenProps {
  navigation?: CadastrarEmpresasScreenNavigationProp;
  route?: CadastrarEmpresasScreenRouteProp;
}

const validator = Yup.object().shape({
  tipo_de_empresa: Yup.string().required(),
  nome_completo: Yup.string().when('tipo_de_empresa', {
    is: (value: string) => value === "pf",
    then: (yup) => yup.required(ValidateForms.required),
  }),
  data_de_nascimento: Yup.date().when('tipo_de_empresa', {
    is: (value: string) => value === "pf",
    then: (yup) => yup.required(ValidateForms.required),
  }),
  cpf: Yup.string().when('tipo_de_empresa', {
    is: (value: string) => value === "pf",
    then: (yup) => yup.required(ValidateForms.required),
  }),
  nome_fantasia: Yup.string().when('tipo_de_empresa', {
    is: (value: string) => value === "pj",
    then: (yup) => yup.required(ValidateForms.required),
  }),
  razao_social: Yup.string().when('tipo_de_empresa', {
    is: (value: string) => value === "pj",
    then: (yup) => yup.required(ValidateForms.required),
  }),
  cnpj: Yup.string().when('tipo_de_empresa', {
    is: (value: string) => value === "pj",
    then: (yup) => yup.required(ValidateForms.required),
  }),
  cep: Yup.string().required(ValidateForms.required),
  logradouro: Yup.string().required(ValidateForms.required),
  numero: Yup.string().required(ValidateForms.required).matches(/^[0-9]+$/, ValidateForms.number_only),
  bairro: Yup.string().required(ValidateForms.required),
  cidade: Yup.string().required(ValidateForms.required),
  uf: Yup.string().required(ValidateForms.required),
  emails: Yup.array().of(Yup.string().email(ValidateForms.email)).required(ValidateForms.required),
  telefones: Yup.array().of(Yup.string().matches(/^(\+\d{1,3} )?\(\d{2}\) \d{4,5}-\d{4}$/, ValidateForms.phone_number)).required(ValidateForms.required),
})





const Create: React.FC<CadastrarEmpresasScreenProps> = ({
  navigation,
  route,
}) => {
  const [date, setDate] = React.useState<Date>(new Date());
  const [tipoEmpresa, setTipoEmpresa] = React.useState<'pj' | 'pf'>('pj');
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
  })
  

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
            emails: [],
            telefones: [],
          }}
          onSubmit={(values) => {}}
        >
          {({ values, errors, handleChange, setFieldValue }) => {
            const busca_cep = async (cep: String) => {
              try{
                
                const data = await fetch(`viacep.com.br/ws/${cep}/json`);
                if(!data.ok){
                  throw new Error('Erro ao realizar a validacao tente novamente')
                }
              } catch(error) {
                Alert.alert('Erro', (error as Error).message);
              }
              
            }
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
                  onValueChange={(value) =>
                    setTipoEmpresa(value as 'pf' | 'pj')
                  }
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
                        isPressed={tipoEmpresa === 'pj'}
                      />
                      <SelectItem
                        label="Empresa Pessoa Física (Autonomo)"
                        value="pf"
                        isPressed={tipoEmpresa === 'pf'}
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
              {tipoEmpresa === 'pj' ? (
                <>
                  <FormControl
                    isInvalid={errors.nome_fantasia ? true : false}
                    size={'md'}
                    isDisabled={isAllDisabled.nome_fantasia}
                    isRequired={true}
                  >
                    <FormControlLabel>
                      <FormControlLabelText>Nome Fantasia</FormControlLabelText>
                    </FormControlLabel>
                    <Input>
                      <InputField onChangeText={handleChange('nome_fantasia')} type="text" placeholder="Nome fantasia" />
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
                    isInvalid={false}
                    size={'md'}
                    isDisabled={isAllDisabled.razao_social}
                    isRequired={true}
                  >
                    <FormControlLabel>
                      <FormControlLabelText>Razão Social</FormControlLabelText>
                    </FormControlLabel>
                    <Input>
                      <InputField onChangeText={handleChange('razao_social')} type="text" placeholder="Razão social" />
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
                    isInvalid={false}
                    size={'md'}
                    isDisabled={isAllDisabled.cnpj}
                    isRequired={true}
                  >
                    <FormControlLabel>
                      <FormControlLabelText>Cnpj</FormControlLabelText>
                    </FormControlLabel>
                    <Input>
                      <InputField
                        onChangeText={handleChange('cnpj')}
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
                      <FormControlLabelText>Nome Completo</FormControlLabelText>
                    </FormControlLabel>
                    <Input>
                      <InputField
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
                    isInvalid={errors.data_de_nascimento ? true : false}
                    size={'md'}
                    isDisabled={isAllDisabled.cpf}
                    isRequired={true}
                  >
                    <FormControlLabel>
                      <FormControlLabelText>CPF</FormControlLabelText>
                    </FormControlLabel>
                    <Input>
                      <InputField type="text" placeholder="CPF" />
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
                    isInvalid={false}
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
                        value={formatDateString(date)}
                        placeholder="data"
                      />
                      <Button
                        onPress={() => {
                          DateTimePickerAndroid.open({
                            value: new Date(),
                            mode: 'date',
                            onChange: (event, date) => {
                              if (date) {
                                setDate(date);
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
                        {String(errors.data_de_nascimento)}
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
                    type="text" 
                    placeholder="ex: 12.123-321" 
                    onChangeText={handleChange('cep')}
                    onBlur={() => { busca_cep(values.cep); }}
                    />
                </Input>

                <FormControlHelper>
                  <FormControlHelperText>
                    Informe o cep de sua empresa.
                  </FormControlHelperText>
                </FormControlHelper>

                <FormControlError>
                  <FormControlErrorIcon as={AlertCircleIcon} />
                  <FormControlErrorText>
                    {errors.cep}
                  </FormControlErrorText>
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
                  <FormControlErrorText>
                    {errors.numero}
                  </FormControlErrorText>
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
                <Textarea size="lg">
                  <TextareaInput 
                    onChangeText={handleChange('complemento')}
                    placeholder="Informe o complemento do seu endereco aqui." 
                  />
                </Textarea>

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
                  <InputField onChangeText={handleChange('bairro')} type="text" placeholder="ex: Tucanos" />
                </Input>

                <FormControlHelper>
                  <FormControlHelperText>
                    Informe o nome do bairro do endereço.
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
                isDisabled={isAllDisabled.cidade}
                isRequired={true}
              >
                <FormControlLabel>
                  <FormControlLabelText>Cidade</FormControlLabelText>
                </FormControlLabel>
                <Input>
                  <InputField onChangeText={handleChange('cidadde')} type="text" placeholder="ex: Araras" />
                </Input>

                <FormControlHelper>
                  <FormControlHelperText>
                    {errors.cidade}
                  </FormControlHelperText>
                </FormControlHelper>

                <FormControlError>
                  <FormControlErrorIcon as={AlertCircleIcon} />
                  <FormControlErrorText>
                    {errors.cidade}
                  </FormControlErrorText>
                </FormControlError>
              </FormControl>
              <FormControl
                isInvalid={errors.uf ? true :  false}
                size={'md'}
                isDisabled={isAllDisabled.uf}
                isRequired={true}
              >
                <FormControlLabel>
                  <FormControlLabelText>Estados</FormControlLabelText>
                </FormControlLabel>
                <Select
                  isInvalid={false}
                  isDisabled={false}
                  onValueChange={(value) => setFieldValue('estado', value)}
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
                  <FormControlErrorText>
                    {errors.uf}
                  </FormControlErrorText>
                </FormControlError>
              </FormControl>
              {}
              <Box>
                <Button
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
          )
            }}
        </Formik>
      </Box>
    </ScrollView>
  );
};
export default Create;
