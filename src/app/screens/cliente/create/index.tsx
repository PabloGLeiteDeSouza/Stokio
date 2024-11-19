import React from 'react';
import { Box, Text, ScrollView } from '@gluestack-ui/themed';
import { CadastrarClienteScreen } from '@/interfaces/cliente';
import LoadingScreen from '@/components/LoadingScreen';
import { Alert } from 'react-native';
import { ClienteService } from '@/classes/cliente/cliente.service';
import { useSQLiteContext } from 'expo-sqlite';
import { getStringFromDate } from '@/utils';
import { IPessoaUpdate } from '@/classes/cliente/interfaces';
import FormCreateClient from '@/components/Forms/cliente/create';

const Create: React.FC<CadastrarClienteScreen> = ({ navigation, route }) => {
  const [pessoas, setPessoas] = React.useState<Array<IPessoaUpdate>>([]);
  const [isNewPerson, setIsNewPerson] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const db = useSQLiteContext();

  async function startScreen() {
    try {
      const pss = await new ClienteService(db).findAllPessoas();
      if (pss.length > 0) {
        setPessoas([...pss]);
      }
      setIsLoading(false);
    } catch (error) {
      Alert.alert('Erro', (error as Error).message);
      setIsLoading(false);
      throw error;
    }
  }
  React.useEffect(() => {
    startScreen();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Box w="$full" h="$full">
      <ScrollView w="$full">
        <Box px="$8" py="$5">
          <Box w="$full" alignItems="center">
            <Text size="3xl">Cadastrar Cliente</Text>
          </Box>
          <Box>
            <FormCreateClient 
              db={db} 
              onCreated={() => {
                navigation?.goBack();
              }}
              onSelectPerson={(pessoas, pessoaSelecionada) => {
                navigation?.navigate('selecionar-pessoa', {
                  pessoas,
                  screen: 'cadastrar-cliente',
                  pessoaSelecionada,
                });
              }}
              pessoas={pessoas.length > 0 ? pessoas.map((item) => { return { ...item, data_nascimento: getStringFromDate(item.data_nascimento) };}) : []}
              pessoa={route?.params?.pessoa}
            />
          </Box>
        </Box>
      </ScrollView>
    </Box>
  );
};
export default Create;
