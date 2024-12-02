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
  const [havePessoas, setHavePessoas] = React.useState(false);
  const [isNewPerson, setIsNewPerson] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const db = useSQLiteContext();

  async function startScreen() {
    try {
      const pss = await new ClienteService(db).findAllPessoas();
      if (pss.length > 0) {
        setHavePessoas(true);
      } else {
        setIsNewPerson(true);
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
              onSelectPerson={(id_pessoa) => {
                navigation?.navigate('selecionar-pessoa', {
                  id_pessoa,
                  screen: 'cadastrar-cliente',
                });
              }}
              havePessoas={havePessoas}
              id_pessoa={route?.params?.id_pessoa}
            />
          </Box>
        </Box>
      </ScrollView>
    </Box>
  );
};
export default Create;
