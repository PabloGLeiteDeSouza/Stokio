import React from 'react';
import Estados from '$databases/Estados.json';
import {
  HStack,
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
  Checkbox,
  CheckboxIndicator,
  CheckboxIcon,
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
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  VStack,
  Heading,
  Text,
  Icon,
  CheckIcon,
  AlertCircleIcon,
  ChevronDownIcon,
  Card,
  ButtonIcon,
} from '@gluestack-ui/themed';
import { ScrollView } from '@gluestack-ui/themed';
import { Box } from '@gluestack-ui/themed';
import { useThemeApp } from '$providers/theme';
import { Pessoa } from '$classes/pessoa';
import { useSQLiteContext } from 'expo-sqlite';
import { Alert, GestureResponderEvent } from 'react-native';
import { UpdatePessoaDto } from '$classes/pessoa/dto/update-pessoa.dto';
import { RootStackParamList } from '$types/index';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Formik } from 'formik';
import { CloseIcon } from '@gluestack-ui/themed';
import { mask } from 'react-native-mask-text';
import { AddIcon } from '@gluestack-ui/themed';
import { RemoveIcon } from '@gluestack-ui/themed';
import { formatDateString } from 'utils';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { CalendarDaysIcon } from '@gluestack-ui/themed';
import { View } from '@gluestack-ui/themed';
import { Cliente } from '$classes/cliente';
import { Endereco } from '$classes/endereco';
import { Telefone } from '$classes/telefone';
import { Email } from '$classes/email';
type CadastrarProdutosScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'cadastrar-clientes'
>;
type CadastrarProdutosScreennRouteProp = RouteProp<
  RootStackParamList,
  'cadastrar-clientes'
>;
interface CadastrarClientesScreenProps {
  navigation?: CadastrarProdutosScreenNavigationProp;
  route?: CadastrarProdutosScreennRouteProp;
}
const Create: React.FC<CadastrarClientesScreenProps> = ({ navigation }) => {
  const db = useSQLiteContext();
  const { theme } = useThemeApp();
  const [pessoas, setPessoas] = React.useState<Array<UpdatePessoaDto>>([]);
  const [showModalPessoas, setShowModalPessoas] = React.useState(false);
  const [cadastrarNovaPessoa, setCadastrarNovaPessoa] = React.useState(false);
  const refModalPesoas = React.useRef(null);
  React.useEffect(() => {
    async function start() {
      try {
        const ps = await new Pessoa(db).findAll();
        const cli = await new Cliente(db).findAll();
        const peaoples = ps.filter((p) => {
          return !cli.some((c) => c.id_pessoa === p.id);
        });
        setPessoas(peaoples);
      } catch (error) {
        Alert.alert((error as Error).message);
        throw error;
      }
    }
    start();
  }, []);
  const [nomeEstado, setNomeEstado] = React.useState('');
  const onSubmit = async (values: {
    id_pessoa: string;
    nome: string;
    data_de_nascimento: Date;
    cpf: string;
    cep: string;
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    uf: string;
    telefones: string[];
    emails: string[];
    limite: string;
    status: boolean;
  }) => {
    try {
      const { id_pessoa, ...vls } = values;
      if (id_pessoa !== '') {
        const cliente = {
          limite: Number(vls.limite),
          status: vls.status,
          id_pessoa: Number(id_pessoa),
        };
        await new Cliente(db).create(cliente);
        Alert.alert('Sucesso', 'Cliente criado com sucesso!');
        navigation?.navigate('listar-clientes');
      } else {
        const {
          bairro,
          cep,
          cidade,
          complemento,
          logradouro,
          numero,
          uf,
          emails,
          limite,
          status,
          telefones,
          ...people
        } = vls;
        const pessoa = await new Pessoa(db).create(people);
        const address = {
          cep,
          logradouro,
          complemento,
          numero: Number(numero),
          bairro,
          cidade,
          uf,
          id_pessoa: pessoa.id,
        };
        await new Endereco(db).create(address);
        telefones.map(async (tel) => {
          await new Telefone(db).create({
            telefone: tel,
            id_pessoa: pessoa.id,
          });
        });
        emails.map(async (email) => {
          await new Email(db).create({
            email,
            id_pessoa: pessoa.id,
          });
        });
        await new Cliente(db).create({
          id_pessoa: pessoa.id,
          limite: Number(limite),
          status,
        });
        Alert.alert('Sucesso', 'Cliente criado com sucesso!');
        navigation?.navigate('listar-clientes');
      }
    } catch (error) {}
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
  return (
    <ScrollView>
      <Box my="$6" mx="$10" gap="$5">
        <Text textAlign="center" size="3xl">
          Informe os dados do cliente
        </Text>
        <Formik
          initialValues={{
            id_pessoa: '',
            nome: '',
            data_de_nascimento: new Date(),
            cpf: '',
            cep: '',
            logradouro: '',
            numero: '',
            complemento: '',
            bairro: '',
            cidade: '',
            uf: '',
            telefones: [''],
            emails: [''],
            limite: '',
            status: true,
          }}
          onSubmit={onSubmit}
        >
          {({ handleChange, handleSubmit, setFieldValue, values, errors }) => {
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
                {pessoas.length >= 1 && !cadastrarNovaPessoa ? (
                  <>
                    <Box>
                      {values.id_pessoa === '' ? (
                        <Box gap="$5">
                          <Box>
                            <Button
                              onPress={() => setShowModalPessoas(true)}
                              ref={refModalPesoas}
                            >
                              <ButtonText>Selecionar a pessoa</ButtonText>
                            </Button>
                          </Box>
                          <Modal
                            isOpen={showModalPessoas}
                            onClose={() => setShowModalPessoas(false)}
                            finalFocusRef={refModalPesoas}
                            size="lg"
                          >
                            <ModalBackdrop />
                            <ModalContent>
                              <ModalHeader>
                                <Heading size="lg">
                                  Selecione uma pessoa
                                </Heading>
                                <ModalCloseButton>
                                  <Icon as={CloseIcon} />
                                </ModalCloseButton>
                              </ModalHeader>
                              <ScrollView>
                                <ModalBody h="$96">
                                  <Box gap="$5" my="$10">
                                    {pessoas.map((item, index) => (
                                      <Card>
                                        <HStack space="xl" key={index}>
                                          <Box justifyContent="center">
                                            <Checkbox
                                              size="md"
                                              value={item.id.toString()}
                                              isInvalid={false}
                                              isDisabled={false}
                                              isChecked={
                                                item.id.toString() ===
                                                values.id_pessoa
                                              }
                                              onChange={(change) => {
                                                if (change) {
                                                  setFieldValue(
                                                    'id_pessoa',
                                                    item.id,
                                                  );
                                                  setFieldValue(
                                                    'nome',
                                                    item.nome,
                                                  );
                                                  setFieldValue(
                                                    'data_de_nascimento',
                                                    new Date(
                                                      item.data_de_nascimento,
                                                    ),
                                                  );
                                                  setFieldValue(
                                                    'cpf',
                                                    item.cpf,
                                                  );
                                                }
                                              }}
                                            >
                                              <CheckboxIndicator mr="$2">
                                                <CheckboxIcon as={CheckIcon} />
                                              </CheckboxIndicator>
                                            </Checkbox>
                                          </Box>
                                          <Box>
                                            <Heading size="md">
                                              {item.nome}
                                            </Heading>
                                            <Text size="xl">Cpf</Text>
                                            <Text>{item.cpf}</Text>
                                            <Text size="xl">
                                              Data de Nascimento
                                            </Text>
                                            <Text>
                                              {new Date(
                                                item.data_de_nascimento,
                                              ).toLocaleDateString()}
                                            </Text>
                                          </Box>
                                        </HStack>
                                      </Card>
                                    ))}
                                  </Box>
                                </ModalBody>
                              </ScrollView>
                              <ModalFooter>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  action="secondary"
                                  mr="$3"
                                  onPress={() => {
                                    setShowModalPessoas(false);
                                  }}
                                >
                                  <ButtonText>Cancelar</ButtonText>
                                </Button>
                                <Button
                                  size="sm"
                                  action="positive"
                                  borderWidth="$0"
                                  onPress={() => {
                                    setShowModalPessoas(false);
                                  }}
                                >
                                  <ButtonText>Confirmar</ButtonText>
                                </Button>
                              </ModalFooter>
                            </ModalContent>
                          </Modal>
                          <Button onPress={() => setCadastrarNovaPessoa(true)}>
                            <ButtonText>Cadastrar nova pessoa</ButtonText>
                          </Button>
                        </Box>
                      ) : (
                        <Box gap="$5">
                          <Box w="$full" alignItems="center">
                            <Text size="2xl">Cliente selecionado:</Text>
                          </Box>
                          <Card gap="$2">
                            <Box>
                              <Heading>{values.nome}</Heading>
                            </Box>
                            <Box gap="$2">
                              <Text>Data de Nascimento:</Text>
                              <Text>
                                {values.data_de_nascimento.toLocaleDateString()}
                              </Text>
                            </Box>
                            <Box gap="$2">
                              <Text>CPF:</Text>
                              <Text>{values.cpf}</Text>
                            </Box>
                          </Card>
                        </Box>
                      )}
                    </Box>
                  </>
                ) : (
                  <>
                    {/* Nome Completo */}
                    <FormControl
                      isInvalid={errors.nome ? true : false}
                      size={'md'}
                      isDisabled={false}
                      isRequired={true}
                    >
                      <FormControlLabel>
                        <FormControlLabelText>
                          Nome Completo
                        </FormControlLabelText>
                      </FormControlLabel>
                      <Input>
                        <InputField
                          type="text"
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
                        <FormControlErrorText>
                          {errors.nome}
                        </FormControlErrorText>
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
                        <FormControlErrorText>
                          {errors.cpf}
                        </FormControlErrorText>
                      </FormControlError>
                    </FormControl>

                    {/* Cep */}
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
                        <FormControlErrorText>
                          {errors.cep}
                        </FormControlErrorText>
                      </FormControlError>
                    </FormControl>

                    {/* Logradouro */}
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

                    {/* Numero */}
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
                        <FormControlErrorText>
                          {errors.numero}
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

                    {/* Bairro */}
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
                        <FormControlErrorText>
                          {errors.bairro}
                        </FormControlErrorText>
                      </FormControlError>
                    </FormControl>

                    {/* Cidade */}
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
                        <FormControlErrorText>
                          {errors.cidade}
                        </FormControlErrorText>
                      </FormControlError>
                    </FormControl>

                    {/* UF */}
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

                    {/* Telefones */}
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

                    {/* Emails */}
                    {values.emails.map((value, i) => (
                      <FormControl
                        key={i}
                        isInvalid={
                          errors.emails && errors.emails[i] ? true : false
                        }
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
                      defaultValue="1000"
                      placeholder=""
                      keyboardType="number-pad"
                      value={values.limite}
                      onChangeText={handleChange('limite')}
                    />
                  </Input>

                  <FormControlHelper>
                    <FormControlHelperText>
                      Informe um limite para o cliente.
                    </FormControlHelperText>
                  </FormControlHelper>

                  <FormControlError>
                    <FormControlErrorIcon as={AlertCircleIcon} />
                    <FormControlErrorText>{errors.limite}</FormControlErrorText>
                  </FormControlError>
                </FormControl>

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
                    <ButtonText>Cadastrar</ButtonText>
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
export default Create;
