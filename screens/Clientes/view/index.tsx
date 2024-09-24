import {
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
  ButtonIcon,
  SearchIcon,
  AddIcon,
  TrashIcon,
  Card,
} from '@gluestack-ui/themed';

import { Empresa } from '$classes/empresa';
import LoadingScreen from '$components/LoadingScreen';
import { useThemeApp } from '$providers/theme';
import { Box, FormControl, ScrollView } from '@gluestack-ui/themed';
import { useIsFocused } from '@react-navigation/native';
import React from 'react';
import { Alert } from 'react-native';
import { formatStringDate } from '../../../utils';
import { Ionicons } from '@expo/vector-icons';
import { useSQLiteContext } from 'expo-sqlite';
import { EditIcon } from '@gluestack-ui/themed';
import MessagesWarning, { operations } from 'messages-warnings';
import SearchEmpresas from '$components/SearchEmpresas';
import { UpdateClienteDto } from '$classes/cliente/dto/update-cliente.dto';
import { ListarClientesScreenProps } from '../interfaces';
import { Pessoa } from '$classes/pessoa';
import { Cliente } from '$classes/cliente';
import { Telefone } from '$classes/telefone';
import { Email } from '$classes/email';
import { Endereco } from '$classes/endereco';
import { UpdateEnderecoDto } from '$classes/endereco/dto/update-endereco.dto';
import { UpdateTelefoneDto } from '$classes/telefone/dto/update-telefone.dto';
import { UpdateEmailDto } from '$classes/email/dto/update-email.dto';
import { ClientesObject } from '../types';

const View: React.FC<ListarClientesScreenProps> = ({ navigation }) => {
  const isFocused = useIsFocused();
  const db = useSQLiteContext();
  const [valorBusca, setValorBusca] = React.useState('');
  const [todosClientes, setTodosClientes] = React.useState<
    Array<ClientesObject> | Array<never>
  >([]);
  const { theme } = useThemeApp();
  const [tipoDeBusca, setTipoDeBusca] = React.useState('');
  const [isStartingPage, setIsStartingPage] = React.useState(true);
  async function Start() {
    try {
      const cli = await new Cliente(db).findAll();
      const clientes = await Promise.all(
        cli.map(async (cliente) => {
          try {
            const pessoa = await new Pessoa(db).findById(cliente.id_pessoa);
            const telefones = await new Telefone(db).findByIdPessoa(
              cliente.id_pessoa,
            );
            const emails = await new Email(db).findAllByIdPessoa(
              cliente.id_pessoa,
            );
            const endereco = await new Endereco(db).findUniqueByIdPessoa(
              cliente.id_pessoa,
            );
            return {
              ...pessoa,
              ...cliente,
              endereco,
              telefones,
              emails,
            };
          } catch (error) {
            throw error;
          }
        }),
      );
      setTodosClientes(clientes);
      setIsStartingPage(false);
      return;
    } catch (error) {
      setIsStartingPage(false);
      setTodosClientes([]);
    }
  }
  async function buscar_cliente(valor: string, tipo: string) {
    try {
      if (tipo === 'nome_completo') {
        const pss = await new Pessoa(db).findAllByNome(valor);
        setTodosClientes(
          await Promise.all(
            pss.map(async (ps) => {
              try {
                const cliente = await new Cliente(db).findByIdPessoa(ps.id);
                const telefones = await new Telefone(db).findByIdPessoa(ps.id);
                const emails = await new Email(db).findAllByIdPessoa(ps.id);
                const endereco = await new Endereco(db).findUniqueByIdPessoa(
                  ps.id,
                );
                return {
                  ...ps,
                  ...cliente,
                  endereco,
                  telefones,
                  emails,
                };
              } catch (error) {
                throw error;
              }
            }),
          ),
        );
      } else if (tipo === 'cpf') {
        const pss = [await new Pessoa(db).findUniqueByCPF(valor)];

        setTodosClientes(
          await Promise.all(
            pss.map(async (ps) => {
              try {
                const cliente = await new Cliente(db).findByIdPessoa(ps.id);
                const telefones = await new Telefone(db).findByIdPessoa(ps.id);
                const emails = await new Email(db).findAllByIdPessoa(ps.id);
                const endereco = await new Endereco(db).findUniqueByIdPessoa(
                  ps.id,
                );
                return {
                  ...ps,
                  ...cliente,
                  endereco,
                  telefones,
                  emails,
                };
              } catch (error) {
                throw error;
              }
            }),
          ),
        );
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', (error as Error).message);
    }
  }

  React.useEffect(() => {
    setTimeout(() => {
      Start();
    }, 1);
  }, []);

  React.useEffect(() => {
    setIsStartingPage(true);
    setTimeout(() => {
      Start();
    }, 1);
  }, [isFocused]);

  const deletarCliente = async (cliente: ClientesObject) => {
    try {
      const pessoa = await new Pessoa(db).findById(cliente.id_pessoa);
      Alert.alert(
        'Aviso',
        MessagesWarning.delete_messages.cliente +
          `${pessoa.nome} cujo cpf e ${pessoa.cpf}`,
        [
          {
            text: 'Confirmar',
            onPress: async () => {
              try {
                await new Cliente(db).delete(cliente.id);
                await new Endereco(db).delete(cliente.endereco.id);
                cliente.telefones.map(async (telefone) => {
                  await new Telefone(db).delete(telefone.id);
                });
                cliente.emails.map(async (email) => {
                  await new Email(db).delete(email.id);
                });
                const empresa = await new Empresa(db).findAllByIdPessoa(
                  cliente.id_pessoa,
                );
                if (empresa.length < 1) {
                  await new Pessoa(db).delete(cliente.id_pessoa);
                }
                Alert.alert('Sucesso', 'Registro apagado com sucesso!');
                setTimeout(() => {
                  Start();
                }, 1);
              } catch (error) {
                console.error(error);
                Alert.alert('Erro', (error as Error).message);
              }
            },
          },
          {
            text: 'Cancelar',
            onPress: () => {
              Alert.alert('Aviso', operations.delete_messages.empresa);
              return;
            },
          },
        ],
      );
    } catch (error) {
      console.log(error);
    }
  };

  const editarCliente = (cliente: UpdateClienteDto) => {
    navigation?.navigate('editar-clientes', { cliente: cliente });
  };

  if (isStartingPage) {
    return <LoadingScreen />;
  }

  return todosClientes.length > 0 ? (
    <ScrollView>
      <Box w="$full" px="$5">
        <FormControl
          isInvalid={false}
          size={'lg'}
          isDisabled={false}
          isRequired={true}
          my="$3"
        >
          <FormControlLabel>
            <FormControlLabelText>Buscar Cliente</FormControlLabelText>
          </FormControlLabel>
          <Input>
            <SearchEmpresas
              onChangeValue={(Text) => {
                setValorBusca(Text);
              }}
              value={valorBusca}
              tipo={tipoDeBusca}
            />
            <Select
              isInvalid={false}
              isDisabled={false}
              onValueChange={(value) => setTipoDeBusca(value)}
              initialLabel="Selecione uma opcao"
              defaultValue="-"
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
                  <SelectItem
                    label="Nome Completo"
                    value="nome_completo"
                    isPressed={tipoDeBusca === 'nome_completo'}
                  />
                  <SelectItem
                    label="CPF"
                    value="cpf"
                    isPressed={tipoDeBusca === 'cpf'}
                  />
                </SelectContent>
              </SelectPortal>
            </Select>
            <Button
              onPress={() => {
                setIsStartingPage(true);
                setTimeout(() => buscar_cliente(valorBusca, tipoDeBusca), 1);
                setIsStartingPage(false);
              }}
            >
              <ButtonIcon as={SearchIcon} />
            </Button>
          </Input>
        </FormControl>
        <Box gap="$3">
          <Text>
            Para adicionar mais empresas adicione clicando no botao + abaixo:
          </Text>
          <Button onPress={() => navigation?.navigate('cadastrar-empresas')}>
            <ButtonIcon as={AddIcon} />
          </Button>
        </Box>
      </Box>
      {todosClientes.map((value, i) => {
        return (
          <Box key={i} w="$full" alignItems="center" gap="$2.5" mt="$8">
            <Card borderRadius="$lg" variant="elevated">
              <HStack gap="$3">
                <VStack gap="$2">
                  <Heading>Nome Completo: {value.nome}</Heading>
                  <Text>
                    <Text fontWeight="$bold">Data de Nascimento:</Text>{' '}
                    {formatStringDate(String(value.data_de_nascimento))}
                  </Text>
                  <Text>
                    <Text fontWeight="$bold">CPF:</Text> {value.cpf}
                  </Text>
                </VStack>
                <VStack gap="$2">
                  <Button onPress={() => editarCliente(value)}>
                    <ButtonIcon as={EditIcon} />
                  </Button>
                  <Button
                    action="negative"
                    onPress={() => deletarCliente(value)}
                  >
                    <ButtonIcon as={TrashIcon} />
                  </Button>
                </VStack>
              </HStack>
            </Card>
          </Box>
        );
      })}
    </ScrollView>
  ) : (
    <Box w="$full" h="$full" alignItems="center" justifyContent="center">
      <Box gap={10}>
        <Text size="xl" textAlign="center">
          Não há Cleintes cadastrados
        </Text>
        <Button
          $active-bgColor={theme === 'dark' ? '$purple700' : '$purple500'}
          $dark-backgroundColor="$purple500"
          $light-backgroundColor="$purple700"
          gap={10}
          onPress={() => navigation?.navigate('cadastrar-clientes')}
        >
          <ButtonText>Cadastrar Clientes</ButtonText>
          <ButtonIcon
            color="$white"
            as={() => <Ionicons name="add-circle" size={15} color="white" />}
          />
        </Button>
      </Box>
    </Box>
  );
};

export default View;
