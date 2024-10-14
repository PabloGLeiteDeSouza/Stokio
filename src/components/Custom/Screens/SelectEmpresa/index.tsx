import LoadingScreen from '@/components/LoadingScreen';
import {
  Box,
  Button,
  ButtonText,
  Card,
  FlatList,
  Heading,
  HStack,
  VStack,
} from '@gluestack-ui/themed';
import React from 'react';
import { ListRenderItem } from 'react-native';
import { ISelectEmpresaProps } from './interfaces';
import { Empresa, EmpresaFlatList } from '@/types/screens/empresa';
import { Text } from '@gluestack-ui/themed';

const SelectEmpresa: React.FC<ISelectEmpresaProps> = ({
  navigation,
  route,
}) => {
  if (!route || !route.params || !route.params.screen) {
    navigation?.goBack();
    return null;
  }
  const screen = route.params.screen;
  const [empresas, setEmpresas] = React.useState<Array<Empresa>>([
    {
      id: '1',
      nome_fantasia: 'João',
      razao_social: 'Joao',
      cpf: '21347298146327',
    },
    {
      id: '2',
      nome_fantasia: 'Maria',
      razao_social: 'Maria',
      cpf: '21382194763289',
    },
  ]);
  const [empresa, setEmpresa] = React.useState<Empresa>(empresas[0]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function startScreen() {
      try {
        setEmpresas([
          ...empresas,
          {
            id: '3',
            nome_fantasia: 'Comercio de Eletronicos ATA e CIA',
            razao_social: 'Comercio de Eletronicos ATA e CIA',
            cpf: '21347298146327',
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

  const FlatListEmpresas = FlatList as EmpresaFlatList;

  const ListRenderEmpresas: ListRenderItem<Empresa> = ({ item, index }) => {
    return (
      <Card mt={index === 0 ? '$5' : '$2.5'} mb={'$2.5'}>
        <HStack justifyContent="space-between">
          <VStack space="xl" w="$3/5">
            <Box>
              <Heading>{item.nome_fantasia}</Heading>
            </Box>
            <Box>
              {item.cnpj ? <Text>{item.cnpj}</Text> : <Text>{item.cpf}</Text>}
            </Box>
            <Box>
              <Text>{item.razao_social}</Text>
            </Box>
          </VStack>
          <VStack w="$24">
            <Button
              h="$10"
              size="xs"
              isDisabled={item.id === empresa.id}
              onPress={() => setEmpresa(item)}
            >
              <ButtonText>
                {item.id === empresa.id ? 'SELECIONADO' : 'SELECIONAR'}
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
          Selecionar Empresa:
        </Heading>
      </Box>
      <FlatListEmpresas
        mx="$5"
        data={empresas}
        renderItem={ListRenderEmpresas}
        keyExtractor={(item) => String(item.id)}
      />
      <Box m="$5">
        <Button onPress={() => navigation?.navigate(screen, { empresa })}>
          <ButtonText>Selecionar Empresa</ButtonText>
        </Button>
      </Box>
    </Box>
  );
};

export default SelectEmpresa;
