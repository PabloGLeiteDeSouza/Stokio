import React from 'react';
import Estados from '$databases/Estados.json';
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
  CalendarDaysIcon,
  View,
} from '@gluestack-ui/themed';
import {
  AddIcon,
  Box,
  Button,
  ButtonIcon,
  RemoveIcon,
  ScrollView,
  Text,
} from '@gluestack-ui/themed';
import { AtualizarClientesScreenProps } from '../interfaces';
import { Formik } from 'formik';
import { ClientesObject } from '../types';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { formatDateString } from 'utils';
import { mask } from 'react-native-mask-text';
import { Alert, GestureResponderEvent } from 'react-native';
import getTelefoneError from '../../../utils/GetErros/telefone';
import getEmailError from '../../../utils/GetErros/email';
import { useThemeApp } from '$providers/theme';
import LoadingScreen from '$components/LoadingScreen';
import { Pessoa } from '$classes/pessoa';
import { Cliente } from '$classes/cliente';
import { useSQLiteContext } from 'expo-sqlite';
import { Endereco } from '$classes/endereco';
import { Email } from '$classes/email';
import { Telefone } from '$classes/telefone';
const Update: React.FC<AtualizarClientesScreenProps> = ({
  navigation,
  route,
}) => {
  if (!route || !route.params || !route.params.cliente) {
    return navigation?.navigate('listar-clientes');
  }
  const [isLoading, setIsLoading] = React.useState(true);
  const db = useSQLiteContext();
  const { theme } = useThemeApp();
  const cliente = route?.params?.cliente as ClientesObject;
  const onSubmit = async (values: ClientesObject) => {
    try {
      await new Cliente(db).update({
        id: values.id,
        id_pessoa: values.id_pessoa,
        limite: values.limite,
        status: values.status,
      });
      await new Pessoa(db).update({
        id: values.id_pessoa,
        cpf: values.cpf,
        data_de_nascimento: new Date(values.data_de_nascimento),
        nome: values.nome,
      });
      await new Endereco(db).update({
        id: values.endereco.id,
        cep: values.endereco.cep,
        cidade: values.endereco.cidade,
        complemento: values.endereco.complemento,
        bairro: values.endereco.bairro,
        uf: values.endereco.uf,
        logradouro: values.endereco.logradouro,
        numero: values.endereco.numero,
        id_pessoa: values.endereco.id_pessoa,
      });
      await Promise.all(
        values.emails.map(async (email) => {
          await new Email(db).update(email);
        }),
      );
      await Promise.all(
        values.telefones.map(async (telefone) => {
          await new Telefone(db).update(telefone);
        }),
      );
      Alert.alert('Sucesso', 'Cliente atualizado com sucesso!');
      navigation?.navigate('listar-clientes');
    } catch (error) {
      Alert.alert('erro', (error as Error).message);
      throw error;
    }
  };
  const [isAllDisabled, setIsAllDisabled] = React.useState({
    cep: false,
    logradouro: false,
    numero: false,
    complemento: false,
    bairro: false,
    cidade: false,
    uf: false,
  });
  const [nomeEstado, setNomeEstado] = React.useState('');
  const StartApp = async () => {
    setNomeEstado(
      String(Estados.find((uf) => uf.sigla === cliente.endereco.uf)?.nome),
    );
    setIsLoading(false);
  };
  React.useEffect(() => {
    StartApp();
  }, []);
  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <ScrollView>
      <Box>
        <Box>
          <Text></Text>
        </Box>
        <Box my="$5">
          <Formik initialValues={cliente} onSubmit={onSubmit}>
            {({
              values,
              errors,
              setFieldValue,
              handleChange,
              handleSubmit,
            }) => {
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
                    `https://viacep.com.br/ws/${cep.replace(/[^a-zA-Z0-9 ]/g, '')}/json`,
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
                  const nome = Estados.find(
                    (est) => est.sigla == data.uf,
                  )?.nome;
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
                <Box mx="$10" mt="$5" gap="$5">
                  {/* Nome Completo */}
                  <FormControl
                    isInvalid={errors.nome ? true : false}
                    size={'md'}
                    isDisabled={false}
                    isRequired={true}
                  >
                    <FormControlLabel>
                      <FormControlLabelText>Nome Completo</FormControlLabelText>
                    </FormControlLabel>
                    <Input>
                      <InputField
                        type="text"
                        value={values.nome}
                        placeholder="Nome Completo do Cliente"
                        onChangeText={handleChange('nome')}
                      />
                    </Input>

                    <FormControlHelper>
                      <FormControlHelperText>
                        Informe o nome completo do cliente.
                      </FormControlHelperText>
                    </FormControlHelper>

                    <FormControlError>
                      <FormControlErrorIcon as={AlertCircleIcon} />
                      <FormControlErrorText>{errors.nome}</FormControlErrorText>
                    </FormControlError>
                  </FormControl>

                  {/* Data de nascimento */}
                  <FormControl
                    isInvalid={errors.data_de_nascimento ? true : false}
                    size={'md'}
                    isDisabled={false}
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
                          new Date(values.data_de_nascimento),
                        )}
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

                  {/* CPF */}
                  <FormControl
                    isInvalid={errors.cpf ? true : false}
                    size={'md'}
                    isDisabled={false}
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
                      <FormControlErrorText>{errors.cpf}</FormControlErrorText>
                    </FormControlError>
                  </FormControl>

                  {/* Cep */}
                  <FormControl
                    isInvalid={errors.endereco?.cep ? true : false}
                    size={'md'}
                    isDisabled={isAllDisabled.cep}
                    isRequired={true}
                  >
                    <FormControlLabel>
                      <FormControlLabelText>Cep</FormControlLabelText>
                    </FormControlLabel>
                    <Input>
                      <InputField
                        value={mask(values.endereco.cep, '99.999-999')}
                        keyboardType="number-pad"
                        type="text"
                        placeholder="ex: 12.123-321"
                        onChangeText={(text) => {
                          const end = values.endereco;
                          end.cep = text;
                          setFieldValue('endereco', end);
                        }}
                        onBlur={() => {
                          busca_cep(values.endereco.cep);
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
                      <FormControlErrorText>
                        {errors.endereco?.cep}
                      </FormControlErrorText>
                    </FormControlError>
                  </FormControl>

                  {/* Logradouro */}
                  <FormControl
                    isInvalid={errors.endereco?.logradouro ? true : false}
                    size={'md'}
                    isDisabled={isAllDisabled.logradouro}
                    isRequired={true}
                  >
                    <FormControlLabel>
                      <FormControlLabelText>Logradouro</FormControlLabelText>
                    </FormControlLabel>
                    <Input>
                      <InputField
                        value={values.endereco?.logradouro}
                        onChangeText={(text) => {
                          const end = values.endereco;
                          end.logradouro = text;
                          setFieldValue('endereco', end);
                        }}
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
                        {errors.endereco?.logradouro}
                      </FormControlErrorText>
                    </FormControlError>
                  </FormControl>

                  {/* Numero */}
                  <FormControl
                    isInvalid={errors.endereco?.numero ? true : false}
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
                        value={values.endereco?.numero.toString()}
                        onChangeText={(txt) => {
                          const end = values.endereco;
                          end.numero = txt === '' ? 0 : parseInt(txt);
                          setFieldValue('endereco', end);
                        }}
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
                        {errors.endereco?.numero}
                      </FormControlErrorText>
                    </FormControlError>
                  </FormControl>

                  {/* Complemento */}
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
                        value={values.endereco?.complemento}
                        onChangeText={(txt) => {
                          const end = values.endereco;
                          end.complemento = txt;
                          setFieldValue('endereco', end);
                        }}
                        placeholder="Informe o complemento do seu endereco aqui."
                      />
                    </View>
                    <FormControlHelper>
                      <FormControlHelperText>
                        Informe o complemento do endereço.
                      </FormControlHelperText>
                    </FormControlHelper>
                  </FormControl>

                  {/* Bairro */}
                  <FormControl
                    isInvalid={errors.endereco?.bairro ? true : false}
                    size={'md'}
                    isDisabled={isAllDisabled.bairro}
                    isRequired={true}
                  >
                    <FormControlLabel>
                      <FormControlLabelText>Bairro</FormControlLabelText>
                    </FormControlLabel>
                    <Input>
                      <InputField
                        value={values.endereco?.bairro}
                        onChangeText={(txt) => {
                          const end = values.endereco;
                          end.bairro = txt;
                          setFieldValue('endereco', end);
                        }}
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
                      <FormControlErrorText>
                        {errors.endereco?.bairro}
                      </FormControlErrorText>
                    </FormControlError>
                  </FormControl>

                  {/* Cidade */}
                  <FormControl
                    isInvalid={errors.endereco?.cidade ? true : false}
                    size={'md'}
                    isDisabled={isAllDisabled.cidade}
                    isRequired={true}
                  >
                    <FormControlLabel>
                      <FormControlLabelText>Cidade</FormControlLabelText>
                    </FormControlLabel>
                    <Input>
                      <InputField
                        value={values.endereco?.cidade}
                        onChangeText={(txt) => {
                          const end = values.endereco;
                          end.cidade = txt;
                          setFieldValue('endereco', end);
                        }}
                        type="text"
                        placeholder="ex: Araras"
                      />
                    </Input>

                    <FormControlHelper>
                      <FormControlHelperText>
                        {errors.endereco?.cidade}
                      </FormControlHelperText>
                    </FormControlHelper>

                    <FormControlError>
                      <FormControlErrorIcon as={AlertCircleIcon} />
                      <FormControlErrorText>
                        {errors.endereco?.cidade}
                      </FormControlErrorText>
                    </FormControlError>
                  </FormControl>

                  {/* UF */}
                  <FormControl
                    isInvalid={errors.endereco?.uf ? true : false}
                    size={'md'}
                    isDisabled={isAllDisabled.uf}
                    isRequired={true}
                  >
                    <FormControlLabel>
                      <FormControlLabelText>Estados</FormControlLabelText>
                    </FormControlLabel>
                    <Select
                      isInvalid={errors.endereco?.uf ? true : false}
                      isDisabled={isAllDisabled.uf}
                      onValueChange={(value) => {
                        const nome = Estados.find(
                          (est) => est.sigla == value,
                        )?.nome;
                        const end = values.endereco;
                        end.uf = value;
                        setFieldValue('endereco', end);
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
                                isPressed={values.endereco?.uf === estado.sigla}
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
                        {errors.endereco?.uf}
                      </FormControlErrorText>
                    </FormControlError>
                  </FormControl>

                  {/* Telefones */}
                  {values.telefones.map((value, i) => (
                    <FormControl
                      key={i}
                      isInvalid={getTelefoneError(errors, i) ? true : false}
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
                            valor[i].telefone = mask(
                              text,
                              '+55 (99) 99999-9999',
                            );
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
                          {getTelefoneError(errors, i)}
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
                          id: '',
                          telefone: '',
                          descricao: '',
                        },
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

                  {/* Emails */}
                  {values.emails.map((value, i) => (
                    <FormControl
                      key={i}
                      isInvalid={getEmailError(errors, i) ? true : false}
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
                            valor[i].email = text;
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
                          {getEmailError(errors, i)}
                        </FormControlErrorText>
                      </FormControlError>
                    </FormControl>
                  ))}
                  <Button
                    action="positive"
                    onPress={() =>
                      setFieldValue('emails', [
                        ...values.emails,
                        {
                          id: '',
                          email: '',
                          descricao: '',
                        },
                      ])
                    }
                  >
                    <ButtonIcon as={AddIcon} />
                  </Button>
                  <Button
                    action="negative"
                    onPress={() => {
                      if (values.emails.length > 1) {
                        setFieldValue('emails', [
                          ...values.emails.slice(0, -1),
                        ]);
                      } else {
                        Alert.alert('Erro', 'Não há o que ser removido!');
                      }
                    }}
                  >
                    <ButtonIcon as={RemoveIcon} />
                  </Button>
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
                      <Box
                        h="$full"
                        justifyContent="center"
                        px="$3"
                        $light-bgColor="$backgroundLight300"
                        $dark-bgColor="$backgroundDark700"
                      >
                        <Text size="xl">
                          R<Text>$</Text>
                        </Text>
                      </Box>
                      <InputField
                        type="text"
                        value={values.limite.toString()}
                        keyboardType="number-pad"
                        onChangeText={(txt) => {
                          setFieldValue('limite', Number(txt));
                        }}
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
                  <HStack alignItems="center" space="md">
                    <Switch
                      isChecked={values.status}
                      defaultValue={Boolean(values.status)}
                      value={Boolean(values.status)}
                      size={'lg'}
                      isInvalid={false}
                      onValueChange={(status) => {
                        setFieldValue('status', status);
                      }}
                    />
                    <Text size="lg">{values.status ? 'Ativo' : 'Inativo'}</Text>
                  </HStack>
                  <Box>
                    <Button
                      $active-bgColor={
                        theme === 'dark' ? '$purple700' : '$purple500'
                      }
                      $dark-backgroundColor="$purple500"
                      $light-backgroundColor="$purple700"
                      onPress={
                        handleSubmit as unknown as (
                          event: GestureResponderEvent,
                        ) => void
                      }
                    >
                      <ButtonText>Atualizar</ButtonText>
                    </Button>
                  </Box>
                </Box>
              );
            }}
          </Formik>
        </Box>
      </Box>
    </ScrollView>
  );
};
export default Update;
