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

const SelectPessoa: React.FC<ISlectPessoaProps> = ({ navigation, route }) => {
  if (!route || !route.params || !route.params.screen) {
    navigation?.goBack();
    return null;
  }
  if (!route || !route.params || !route.params.pessoas) {
    navigation?.goBack();
    return null;
  }
  const screen = route.params.screen;
  const [pessoas, setPessoas] = React.useState<Array<Pessoa>>([
    ...route.params.pessoas,
  ]);
  const selectedPessoa = route.params.pessoaSelecionada
    ? route.params.pessoaSelecionada
    : pessoas[0];
  const [pessoa, setPessoa] = React.useState<Pessoa>(selectedPessoa);
  const [isLoading, setIsLoading] = React.useState(true);

  const startScreen = React.useCallback(async () => {
    try {
      setPessoas([...pessoas]);
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

  const ListRenderPessoas: ListRenderItem<Pessoa> = ({ item }) => {
    return (
      <Box>
        <Card my="$5">
          <HStack justifyContent="space-between">
            <VStack>
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
                <Text>{item.cpf}</Text>
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
              pessoa,
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
