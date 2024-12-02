import LoadingScreen from '@/components/LoadingScreen';
import { Pessoa, PessoaFlatList } from '@/types/screens/cliente';
import {
  Box,
  Button,
  ButtonText,
  Card,
  FlatList,
  Heading,
  HStack,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import React from 'react';
import { ListRenderItem } from 'react-native';
import { ISlectPessoaProps } from './interfaces';
import { getStringFromDate } from '@/utils';
import { ClienteService } from '@/classes/cliente/cliente.service';
import { useSQLiteContext } from 'expo-sqlite';
import { EmpresaService } from '@/classes/empresa/empresa.service';
import { mask } from '@/utils/mask';

const SelectPessoa: React.FC<ISlectPessoaProps> = ({ navigation, route }) => {
  if (!route || !route.params || !route.params.screen) {
    navigation?.goBack();
    return null;
  }
  const screen = route.params.screen;
  const id_pessoa = route.params.id_pessoa;
  const [pessoas, setPessoas] = React.useState<Array<Pessoa>>([]);
  const [pessoa, setPessoa] = React.useState<Pessoa>({
    id: id_pessoa ? id_pessoa : 0,
    nome: '',
    data_nascimento: new Date(),
    cpf: '',
  });
  const [isLoading, setIsLoading] = React.useState(true);
  const db = useSQLiteContext();

  const startScreen = React.useCallback(async () => {
    try {
      if (screen === "cadastrar-cliente") {
        const pess = await new ClienteService(db).findAllPessoas();
        setPessoas([...pess]);
        console.log(pess);
      } else {
        const pess = await new EmpresaService(db).getAllPessoas();
        setPessoas([...pess]);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  }, []);

  React.useEffect(() => {
    startScreen();
  }, []);

  const FlatListPessoas = FlatList as PessoaFlatList;

  const ListRenderPessoas: ListRenderItem<Pessoa> = ({ item, index }) => {
    return (
      <Box key={index}>
        <Card mt={index === 0 ? "$5" : "$2.5"} mb={index === (pessoas.length - 1) ? "$5" : "$2.5"}>
          <HStack justifyContent="space-between">
            <VStack w="$2/3">
              <Box>
                <Heading>{item.nome}</Heading>
              </Box>
              <Box>
                <Text>
                  {new Intl.DateTimeFormat('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  }).format(new Date(item.data_nascimento))}
                </Text>
              </Box>
              <Box>
                <Text>{mask(item.cpf, 'cpf')}</Text>
              </Box>
            </VStack>
            <VStack>
              <Button
                isDisabled={item.id === pessoa.id}
                onPress={() => setPessoa(item)}
              >
                <ButtonText>
                  {item.id === pessoa.id ? 'selcionado' : 'selecionar'}
                </ButtonText>
              </Button>
            </VStack>
          </HStack>
        </Card>
      </Box>
    );
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Box h="$full" w="$full">
      <Box mt="$5">
        <Heading size="2xl" textAlign="center">
          Selecionar Pessoa:
        </Heading>
      </Box>
      <FlatListPessoas
        px="$5"
        data={pessoas}
        renderItem={ListRenderPessoas}
        keyExtractor={(item) => String(item.id)}
      />
      <Box my="$5" mx="$5">
        <Button
          onPress={() =>
            navigation?.navigate(screen, {
              id_pessoa: pessoa.id,
            })
          }
        >
          <ButtonText>Selecionar Pessoa</ButtonText>
        </Button>
      </Box>
    </Box>
  );
};

export default SelectPessoa;
