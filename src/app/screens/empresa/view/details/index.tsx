import { EmpresaService } from '@/classes/empresa/empresa.service';
import { EmpresaUpdate } from '@/classes/empresa/types';
import LoadingScreen from '@/components/LoadingScreen';
import { DetalhesEmpresaScreen } from '@/interfaces/empresa';
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

const Details: React.FC<DetalhesEmpresaScreen> = ({ navigation, route }) => {
  if (!route || !route.params || !route.params.id) {
    navigation?.navigate('visualizar-empresas');
    return null;
  }
  const id = route.params.id;
  const [isLoading, setIsLoading] = React.useState(true);
  const [empresa, setEmpresa] = React.useState<EmpresaUpdate>({});
  const db = useSQLiteContext();

  async function start() {
    try {
      if (!isLoading) {
        setIsLoading(true);
      }
      const Empresa = await new EmpresaService(db).getById(id);
      setEmpresa(Empresa);
      setIsLoading(false);
    } catch (error) {
      Alert.alert('Erro', (error as Error).message);
      navigation?.goBack();
      setIsLoading(false);
    }
  }

  React.useEffect(() => {
    start();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Box w="$full" h="$full">
      <ScrollView w="$full">
        <Box w="$full" gap="$5" px="$8" py="$5">
          <Box w="$full" alignItems="center">
            <Text size="3xl">Detalhes da Empresa</Text>
          </Box>
          <Box gap="$5">
            <Box gap="$1.5">
              <Heading>Nome:</Heading>
              <Text>{empresa.pessoa.nome}</Text>
            </Box>
            <Box>
              <Heading>Razao Social:</Heading>
              <Text>{empresa.razao_social}</Text>
            </Box>
            <Box>
              <Heading>Nome Fantasia:</Heading>
              <Text>{empresa.nome_fantasia}</Text>
            </Box>
            <Box gap="$1.5">
              <Heading>Data de nascimento:</Heading>
              <Text>
                {new Intl.DateTimeFormat('pt-BR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                }).format(empresa.pessoa.data_nascimento)}
              </Text>
            </Box>
            {empresa.cnpj === '' ? (
              <Box gap="$1.5">
                <Heading>CPF:</Heading>
                <Text>{mask(empresa.pessoa.cpf, 'cpf')}</Text>
              </Box>
            ) : (
              <>
                <Box gap="$1.5">
                  <Heading>CPF:</Heading>
                  <Text>{mask(empresa.pessoa.cpf, 'cpf')}</Text>
                </Box>
                {empresa.cnpj && (
                  <Box>
                    <Heading>CNPJ:</Heading>
                    <Text>{mask(empresa.cnpj, 'cnpj')}</Text>
                  </Box>
                )}
              </>
            )}

            <Box gap="$1.5">
              <Heading textAlign="center" size="xl">
                Endereço
              </Heading>
              <Box gap="$1.5">
                <Heading>Logradouro:</Heading>
                <Text>{empresa.logradouro}</Text>
              </Box>
              <Box gap="$1.5">
                <Heading>Número:</Heading>
                <Text>{empresa.numero}</Text>
              </Box>
              {empresa.complemento && (
                <Box gap="$1.5">
                  <Heading>Complemento:</Heading>
                  <Text>{empresa.complemento}</Text>
                </Box>
              )}
              <Box gap="$1.5">
                <Heading>Bairro:</Heading>
                <Text>{empresa.bairro}</Text>
              </Box>
              <Box gap="$1.5">
                <Heading>Cidade:</Heading>
                <Text size="xl">{empresa.cidade}</Text>
              </Box>
              <Box gap="$1.5">
                <Heading>UF:</Heading>
                <Text size="xl">{empresa.uf}</Text>
              </Box>
            </Box>
            <Box gap="$1.5">
              <Heading size="xl" textAlign="center">
                Telefones
              </Heading>
              {empresa.telefones.map((tel, i) => (
                <Box key={`telefone-${tel.id}`} gap="$2.5">
                  <Heading>Telefone {i + 1}:</Heading>
                  <Text size="lg">
                    {mask(
                      tel.numero,
                      'telefone',
                      tel.numero.length > 12 ? 'movel' : 'fixo',
                    )}
                  </Text>
                </Box>
              ))}
            </Box>
            <Box gap="$1.5">
              <Heading size="xl" textAlign="center">
                Emails
              </Heading>
              {empresa.emails.map((mail, i) => (
                <Box key={`email-${mail.id}`} gap="$2.5">
                  <Heading>Email {i + 1}:</Heading>
                  <Text size="xl">{mail.endereco}</Text>
                </Box>
              ))}
            </Box>
            <Box gap="$5">
              <Button
                gap="$5"
                onPress={() =>
                  navigation?.navigate('atualizar-empresa', { id: empresa.id })
                }
              >
                <ButtonIcon as={EditIcon} />
                <ButtonText>Editar</ButtonText>
              </Button>
              <Button
                onPress={() => {
                  Alert.alert('Aviso', `Voce deseja mesmo deletar a empresa de nome fantasia ${empresa.nome_fantasia} ?`, [
                    {
                      text: 'Sim',
                      onPress: async () => {
                        await new EmpresaService(db).delete(empresa.id);
                        Alert.alert('Aviso', 'Empresa deletada com sucesso!', [
                          {
                            text: 'OK',
                            onPress: () => navigation?.goBack(),
                          }
                        ])
                      }
                    },
                    {
                      text: 'Não',
                      style: 'cancel',
                      onPress: () => Alert.alert('Aviso', 'Operacao cancelada')
                    }
                  ])
                  
                }} 
                gap="$5"
                action="negative"
              >
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
