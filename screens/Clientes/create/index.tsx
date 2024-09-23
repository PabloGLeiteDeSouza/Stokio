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

import { ScrollView } from '@gluestack-ui/themed';
import { Box } from '@gluestack-ui/themed';
import { useThemeApp } from '$providers/theme';
import { FontAwesome6, MaterialIcons } from '@expo/vector-icons';
import SelectEstado from '$components/SelectEstado';
import { Pessoa } from '$classes/pessoa';
import { useSQLiteContext } from 'expo-sqlite';
import { Alert } from 'react-native';
import { UpdatePessoaDto } from '$classes/pessoa/dto/update-pessoa.dto';
import { RootStackParamList } from '$types/index';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Formik, FormikHelpers } from 'formik';
import { CloseIcon } from '@gluestack-ui/themed';

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

const Create: React.FC<CadastrarClientesScreenProps> = () => {
  const db = useSQLiteContext();
  const { theme } = useThemeApp();
  const [pessoas, setPessoas] = React.useState<Array<UpdatePessoaDto>>([]);
  const [showModalPessoas, setShowModalPessoas] = React.useState(false);
  const refModalPesoas = React.useRef(null);

  React.useEffect(() => {
    async function start() {
      try {
        const ps = await new Pessoa(db).findAll();
        setPessoas(ps);
      } catch (error) {
        Alert.alert((error as Error).message);
        throw error;
      }
    }
    start();
  }, []);

  const onSubmit = async (
    values: {
      id_pessoa: string;
      nome: string;
      data_de_nascimento: Date;
      cpf: string;
      saldo: string;
      status: boolean;
    },
    formikHelpers: FormikHelpers<{
      id_pessoa: string;
      nome: string;
      data_de_nascimento: Date;
      cpf: string;
      saldo: string;
      status: boolean;
    }>,
  ) => {};

  return (
    <ScrollView>
      <Box my="$6" mx="$10" gap="$5">
        <Text textAlign="center" size="xl">
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
            saldo: '',
            telefones: [],
            emails: [],
            status: true,
          }}
          onSubmit={onSubmit}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            values,
            errors,
          }) => {
            return (
              <>
                {pessoas.length >= 1 ? (
                  <>
                    <Box>
                      {values.id_pessoa === '' ? (
                        <>
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
                              <ModalBody>
                                <ScrollView>
                                  <Box gap="$5">
                                    {pessoas.map((item, index) => (
                                      <Card>
                                        <VStack key={index}>
                                          <Box>
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
                                              {item.data_de_nascimento.toLocaleDateString()}
                                            </Text>
                                          </Box>
                                        </VStack>
                                      </Card>
                                    ))}
                                  </Box>
                                </ScrollView>
                              </ModalBody>
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
                          <Button onPress={() => setPessoas([])}>
                            <ButtonText>Cadastrar nova pessoa</ButtonText>
                          </Button>
                        </>
                      ) : (
                        <>
                          <Box>
                            <Text>Nome:</Text>
                            <Text>{values.nome}</Text>
                          </Box>
                          <Box>
                            <Text>Data de Nascimento:</Text>
                            <Text>
                              {values.data_de_nascimento.toLocaleDateString()}
                            </Text>
                          </Box>
                          <Box>
                            <Text>CPF:</Text>
                            <Text>{values.cpf}</Text>
                          </Box>
                        </>
                      )}
                    </Box>
                  </>
                ) : (
                  <>
                    <FormControl
                  isInvalid={false}
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
                      placeholder="Nome Completo do Cliente"
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
                      O nome comnpleto é obrigatório.
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
                  <Input>
                    <InputField
                      type="password"
                      defaultValue="12345"
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
                    <FormControlLabelText>CPF</FormControlLabelText>
                  </FormControlLabel>
                  <Input>
                    <InputField
                      type="password"
                      defaultValue="12345"
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
                )}
                
                {}
                <FormControl
                  isInvalid={false}
                  size={'md'}
                  isDisabled={false}
                  isRequired={true}
                >
                  <FormControlLabel>
                    <FormControlLabelText>
                      <FontAwesome6 name="whatsapp" /> Telefone
                    </FormControlLabelText>
                  </FormControlLabel>
                  <Input>
                    <InputField type="text" placeholder="(xx) xxxxx-xxxx" />
                  </Input>

                  <FormControlHelper>
                    <FormControlHelperText>
                      Insira o número de telefone e whatsapp do cliente.
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
                      <MaterialIcons name="email" /> Email
                    </FormControlLabelText>
                  </FormControlLabel>
                  <Input>
                    <InputField type="text" placeholder="Email" />
                  </Input>

                  <FormControlHelper>
                    <FormControlHelperText>
                      Insira o email do cliente.
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
                    <FormControlLabelText>Cep</FormControlLabelText>
                  </FormControlLabel>
                  <Input>
                    <InputField
                      type="password"
                      defaultValue="12345"
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
                      type="password"
                      defaultValue="12345"
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
                    <FormControlLabelText>Número</FormControlLabelText>
                  </FormControlLabel>
                  <Input>
                    <InputField
                      type="password"
                      defaultValue="12345"
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
                      type="password"
                      defaultValue="12345"
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
                      type="password"
                      defaultValue="12345"
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
                <SelectEstado />
                <FormControl
                  isInvalid={false}
                  size={'md'}
                  isDisabled={false}
                  isRequired={true}
                >
                  <FormControlLabel>
                    <FormControlLabelText>UF</FormControlLabelText>
                  </FormControlLabel>
                  <Input>
                    <InputField
                      type="password"
                      defaultValue="12345"
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
                    <FormControlLabelText>Password</FormControlLabelText>
                  </FormControlLabel>
                  <Input>
                    <InputField
                      type="password"
                      defaultValue="12345"
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
                    <FormControlLabelText>Password</FormControlLabelText>
                  </FormControlLabel>
                  <Input>
                    <InputField
                      type="password"
                      defaultValue="12345"
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
                    <FormControlLabelText>
                      Limite de compra
                    </FormControlLabelText>
                  </FormControlLabel>
                  <Input>
                    <InputField
                      type="text"
                      placeholder="Limite de compra por cliente"
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
                  <Button
                    $active-bgColor={
                      theme === 'dark' ? '$purple700' : '$purple500'
                    }
                    $dark-backgroundColor="$purple500"
                    $light-backgroundColor="$purple700"
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
