import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  Input,
  InputField,
  SearchIcon,
  EditIcon,
} from '@gluestack-ui/themed';

import { Categoria } from '$classes/categoria';
import { UpdateCategoriaDto } from '$classes/categoria/dto/update-categoria.dto';
import LoadingScreen from '$components/LoadingScreen';
import { RootStackParamList } from '$types/index';
import {
  AddIcon,
  Box,
  Button,
  ButtonIcon,
  ButtonText,
  HStack,
  ScrollView,
  Text,
  TrashIcon,
} from '@gluestack-ui/themed';
import { RouteProp, useIsFocused } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSQLiteContext } from 'expo-sqlite';
import React from 'react';
import { Alert } from 'react-native';
type ListarCategoriasScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'listar-produtos'
>;
type ListarCategoriasScreenRouteProp = RouteProp<
  RootStackParamList,
  'listar-produtos'
>;
interface ListarCategoriasScreenProps {
  navigation?: ListarCategoriasScreenNavigationProp;
  route?: ListarCategoriasScreenRouteProp;
}

const View: React.FC<ListarCategoriasScreenProps> = ({ navigation }) => {
  const db = useSQLiteContext();
  const focused = useIsFocused();
  const [isLoading, setIsLoading] = React.useState(true);
  const [categorys, setCategorys] = React.useState<Array<UpdateCategoriaDto>>(
    [],
  );
  async function Start() {
    try {
      const categorias = await new Categoria(db).findAll();
      if (categorias) {
        setCategorys(categorias);
      } else {
        setCategorys([]);
      }
      setIsLoading(false);
      return;
    } catch (error) {
      Alert.alert('Erro', (error as Error).message);
      setIsLoading(false);
    }
  }

  const [buscar, setBuscar] = React.useState('');
  React.useEffect(() => {
    Start();
  }, []);

  React.useEffect(() => {
    Start();
  }, [focused]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  const searchCategoria = async (search: string) => {
    try {
      const data = await new Categoria(db).findAllByName(search);
      if (data.length < 1) {
        throw new Error('Não foi possível encontrar nenhuma categoria!');
      }
      setCategorys(data);
    } catch (error) {
      Alert.alert('Erro', (error as Error).message);
      console.error(error);
      throw error;
    }
  };

  const deletar_categoria = async (categoria: UpdateCategoriaDto) => {
    try {
      await new Categoria(db).delete(categoria.id as number);
      Alert.alert('Sucesso', 'Categoria deletada com sucesso!');
      setCategorys(categorys.filter((cat) => cat.id !== categoria.id));
    } catch (error) {
      Alert.alert('Erro', (error as Error).message);
      console.error(error);
      throw error;
    }
  };

  return (
    <>
      {categorys.length > 0 ? (
        <ScrollView>
          <Box mt="$5" gap="$5" alignItems="center" mb="$10">
            <Box mb="$5" w="$4/5" gap="$5">
              <FormControl
                isInvalid={false}
                size={'md'}
                isDisabled={false}
                isRequired={true}
              >
                <FormControlLabel>
                  <FormControlLabelText>Buscar</FormControlLabelText>
                </FormControlLabel>
                <Input>
                  <InputField
                    value={buscar}
                    onChangeText={(text) => setBuscar(text)}
                    type="text"
                    placeholder="Informe o nome da categoria"
                  />
                  <Button onPress={() => searchCategoria(buscar)}>
                    <ButtonIcon as={SearchIcon} />
                  </Button>
                </Input>
              </FormControl>
              <Button
                onPress={() => navigation?.navigate('cadastrar-categoria')}
              >
                <ButtonIcon as={AddIcon} />
                <ButtonText>Adicionar Categorias</ButtonText>
              </Button>
            </Box>
            {categorys.map((categoria) => (
              <Box
                w="$4/5"
                p="$5"
                rounded="$lg"
                $dark-bgColor="$purple800"
                $light-bgColor="$purple300"
                key={categoria.id}
              >
                <HStack gap="$5" justifyContent="space-between">
                  <Box w="$2/3">
                    <Text size="2xl" mb={1}>
                      {categoria.nome}
                    </Text>
                    <Text size="md">{categoria.descricao}</Text>
                  </Box>
                  <Box gap="$2">
                    <Button
                      onPress={() => {
                        navigation?.navigate('editar-categoria', { categoria });
                      }}
                      action="primary"
                    >
                      <ButtonIcon as={EditIcon} />
                    </Button>
                    <Button
                      onPress={() => {
                        Alert.alert(
                          'Aviso',
                          'Você deseja mesmo deletar a categoria: ' +
                            categoria.nome +
                            '?',
                          [
                            {
                              text: 'Sim',
                              onPress: async () => {
                                await deletar_categoria(categoria);
                              },
                            },
                            {
                              text: 'Não',
                              style: 'cancel',
                              onPress: () => {
                                Alert.alert('Retorno', 'Operação cancelada!');
                              },
                            },
                          ],
                        );
                      }}
                      action="negative"
                    >
                      <ButtonIcon as={TrashIcon} />
                    </Button>
                  </Box>
                </HStack>
              </Box>
            ))}
          </Box>
        </ScrollView>
      ) : (
        <Box
          h="$full"
          w="$full"
          alignItems="center"
          justifyContent="center"
          gap="$5"
        >
          <Text size="xl">Não há categorias cadastradas</Text>
          <Box>
            <Button
              onPress={() => {
                navigation?.navigate('cadastrar-categoria');
              }}
            >
              <ButtonIcon as={AddIcon} />
              <ButtonText>Cadastrar categoria</ButtonText>
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};
export default View;
