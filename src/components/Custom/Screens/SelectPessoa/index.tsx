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

const SelectPessoa: React.FC<ISlectPessoaProps> = ({ navigation, route }) => {
  if (!route || !route.params || !route.params.screen) {
    navigation?.goBack();
    return null;
  }
  const screen = route.params.screen;
  const [pessoas, setPessoas] = React.useState<Array<Pessoa>>([
    {
      id: 1,
      nome: 'João',
      data_nascimento: '05-04-2000',
      cpf: '12345678901',
    },
    {
      id: 2,
      nome: 'Maria',
      data_nascimento: '02-03-1999',
      cpf: '98765432101',
    },
  ]);
  const [pessoa, setPessoa] = React.useState<Pessoa>(pessoas[0]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function startScreen() {
      try {
        setPessoas([
          ...pessoas,
          {
            id: 3,
            nome: 'Pedro',
            data_nascimento: '15-06-1998',
            cpf: '11111111111',
          },
        ]);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        throw error;
      }
    }
    startScreen();
  }, []);

  const FlatListPessoas = FlatList as PessoaFlatList;

  const ListRenderPessoas: ListRenderItem<Pessoa> = ({ item }) => {
    return (
      <Card>
        <HStack>
          <VStack>
            <Box>
              <Heading>{item.nome}</Heading>
            </Box>
            <Box>
              <Text>
                {new Date(item.data_nascimento).toLocaleDateString('PT-BR')}
              </Text>
            </Box>
            <Box>
              <Text>{item.cpf}</Text>
            </Box>
          </VStack>
          <VStack>
            <Button onPress={() => setPessoa(item)}>
              <ButtonText>
                {item.id === pessoa.id ? 'selcionado' : 'selecionar'}
              </ButtonText>
            </Button>
          </VStack>
        </HStack>
      </Card>
    );
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Box h="$full" w="$full">
      <Box>
        <Heading size="2xl" textAlign="center">
          Selecionar Pessoa:
        </Heading>
      </Box>
      <Box>
        <FlatListPessoas
          data={pessoas}
          renderItem={ListRenderPessoas}
          keyExtractor={(item) => String(item.id)}
        />
        <Box>
          <Button onPress={() => navigation?.navigate(screen, { pessoa })}>
            <ButtonText>Selecionar Pessoa</ButtonText>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SelectPessoa;
