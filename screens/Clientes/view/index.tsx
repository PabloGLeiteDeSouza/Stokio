import {
  FormControlLabel,
  FormControlLabelText,
  Input,
  Button,
  ButtonText,
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
  HStack,
  VStack,
  Heading,
  Text,
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
import { ListarClientesScreenProps } from '../interfaces';
import { Pessoa } from '$classes/pessoa';
import { Cliente } from '$classes/cliente';
import { Telefone } from '$classes/telefone';
import { Email } from '$classes/email';
import { Endereco } from '$classes/endereco';
import { ClientesObject } from '../types';
import SearchClientes from '$components/SearchClientes';

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
                const existsEmpresa = await new Empresa(
                  db,
                ).verifyEmpresaExistsIdPessoa(cliente.id_pessoa);
                if (!existsEmpresa) {
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
              Alert.alert('Aviso', operations.delete_messages.cliente);
              return;
            },
          },
        ],
      );
    } catch (error) {
      console.log(error);
    }
  };

  const editarCliente = (cliente: ClientesObject) => {
    navigation?.navigate('editar-clientes', { cliente: cliente });
  };

  if (isStartingPage) {
    return <LoadingScreen />;
  }

  return todosClientes.length > 0 ? (
    <ScrollView>
      <Box w="$full" px="$5">
        <SearchClientes
          db={db}
          onSearchValues={(vl) => {
            setTodosClientes(vl);
          }}
          setIsStartingPage={setIsStartingPage}
        />
        <Box gap="$3">
          <Button onPress={() => navigation?.navigate('cadastrar-clientes')}>
            <ButtonIcon as={AddIcon} />
          </Button>
        </Box>
      </Box>
      <Box w="$full" alignItems="center" my="$8" gap="$8">
        {todosClientes.map((value, i) => {
          return (
            <Card key={i} size="md" borderRadius="$lg" variant="elevated">
              <HStack gap="$3">
                <VStack gap="$2">
                  <Heading>{value.nome}</Heading>
                  <Text>
                    <Text fontWeight="$bold">Data de Nascimento:</Text>{' '}
                    {formatStringDate(
                      String(new Date(value.data_de_nascimento)),
                    )}
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
          );
        })}
      </Box>
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
