import { ClienteService } from '@/classes/cliente/cliente.service';
import {
  IClienteUpdate,
  IEmailUpdate,
  IEnderecoUpdate,
  IPessoaUpdate,
  ITelefoneUpdate,
} from '@/classes/cliente/interfaces';
import LoadingScreen from '@/components/LoadingScreen';
import { DetalhesClienteScreen } from '@/interfaces/cliente';
import { mask } from '@/utils/mask';
import {
  Box,
  Button,
  ButtonIcon,
  ButtonText,
  EditIcon,
  Heading,
  ScrollView,
  Text,
  TrashIcon,
} from '@gluestack-ui/themed';
import { useSQLiteContext } from 'expo-sqlite';
import React from 'react';
import { Alert } from 'react-native';

const Details: React.FC<DetalhesClienteScreen> = ({ navigation, route }) => {
  if (!route || !route.params || !route.params.id) {
    navigation?.navigate('visualizar-clientes');
    return null;
  }
  const id = route?.params?.id;
  const db = useSQLiteContext();
  const [isLoading, setIsLoading] = React.useState(true);
  const [cliente, setCliente] = React.useState<IClienteUpdate | null>(null);

  React.useEffect(() => {
    async function start() {
      try {
        const cli = await new ClienteService(db).findClienteById(id);
        setCliente(cli);
        setIsLoading(false);
      } catch (error) {
        Alert.alert('Error', (error as Error).message);
        setIsLoading(false);
        navigation?.goBack();
        throw error;
      }
    }
    start();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!cliente) {
    navigation?.goBack();
    return null;
  }

  return (
    <Box w="$full" h="$full">
      <ScrollView w="$full">
        <Box w="$full" gap="$5" px="$8" py="$5">
          <Box w="$full" alignItems="center">
            <Text size="3xl">Detalhes do Cliente</Text>
          </Box>
          <Box gap="$5">
            <Box gap="$1.5">
              <Heading>Nome:</Heading>
              <Text>{cliente.pessoa.nome}</Text>
            </Box>
            <Box gap="$1.5">
              <Heading>Data de nascimento:</Heading>
              <Text>
                {new Intl.DateTimeFormat('pt-BR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                }).format(new Date(cliente.pessoa.data_nascimento))}
              </Text>
            </Box>
            <Box gap="$1.5">
              <Heading>CPF:</Heading>
              <Text>{mask(cliente.pessoa.cpf, 'cpf')}</Text>
            </Box>
            <Box>
              <Heading>Saldo:</Heading>
              <Text>
                {new Intl.NumberFormat('pt-BR', {
                  currency: 'BRL',
                  style: 'currency',
                }).format(Number(cliente.saldo))}
              </Text>
            </Box>
            <Box gap="$1.5">
              <Heading>Endereço:</Heading>
              <Box gap="$1.5">
                <Heading>Logradouro:</Heading>
                <Text>{cliente.logradouro}</Text>
              </Box>
              <Box gap="$1.5">
                <Heading>Número:</Heading>
                <Text>{cliente.numero}</Text>
              </Box>
              <Box gap="$1.5">
                <Heading>Complemento:</Heading>
                <Text>{cliente.complemento}</Text>
              </Box>
              <Box gap="$1.5">
                <Heading>Bairro:</Heading>
                <Text>{cliente.bairro}</Text>
              </Box>
              <Box gap="$1.5">
                <Heading>Cidade:</Heading>
                <Text size="xl">{cliente.bairro}</Text>
              </Box>
              <Box gap="$1.5">
                <Heading>UF:</Heading>
                <Text size="xl">{cliente.uf}</Text>
              </Box>
            </Box>
            <Box gap="$1.5">
              <Heading>Telefones:</Heading>
              {cliente.telefones.map((tel) => (
                <Box key={`telefone-${tel.id}`}>
                  <Text size="lg">{mask(tel.numero, 'telefone')}</Text>
                </Box>
              ))}
            </Box>
            <Box gap="$1.5">
              <Heading>Emails:</Heading>
              {cliente.emails.map((mail) => (
                <Box key={`email-${mail.id}`}>
                  <Text size="lg">{mail.endereco}</Text>
                </Box>
              ))}
            </Box>
            <Box gap="$5">
              <Button
                gap="$2.5"
                onPress={() =>
                  navigation?.navigate('atualizar-cliente', { id: cliente.id })
                }
              >
                <ButtonIcon as={EditIcon} />
                <ButtonText>Editar</ButtonText>
              </Button>
              <Button gap="$2.5" action="negative">
                <ButtonIcon as={TrashIcon} />
                <ButtonText>Excluir</ButtonText>
              </Button>
            </Box>
          </Box>
        </Box>
      </ScrollView>
    </Box>
  );
};

export default Details;
