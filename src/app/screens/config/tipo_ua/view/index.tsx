import React from 'react';
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlHelper,
  FormControlHelperText,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  Input,
  InputField,
  Button,
  ButtonText,
  HStack,
  Heading,
  Text,
  AlertCircleIcon,
  Divider,
  ButtonIcon,
  TrashIcon,
  AddIcon,
  FlatList,
  Box,
  Card,
  EditIcon,
  SearchIcon,
} from '@gluestack-ui/themed';
import { Formik } from 'formik';
import { TipoUaFlatList } from '@/types/screens/tipo-ua';
import { Alert, GestureResponderEvent, ListRenderItem } from 'react-native';
import { VisualizarTipoUaScreen } from '@/interfaces/tipo-ua';
import { useSQLiteContext } from 'expo-sqlite';
import TipoUaService from '@/classes/tipo_ua/tipo_ua.service';
import { TipoUaUpdate } from '@/classes/tipo_ua/interfaces';
import { useIsFocused } from '@react-navigation/native';
import LoadingScreen from '@/components/LoadingScreen';

const View: React.FC<VisualizarTipoUaScreen> = ({ navigation }) => {
  const db = useSQLiteContext();
  const [tipos_Uas, setTipos_Uas] = React.useState<Array<TipoUaUpdate>>([]);
  const [isRefreshing, setIsRefreshing] = React.useState<boolean>(true);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const FlatListTipoUa = FlatList as TipoUaFlatList;

  const isFocused = useIsFocused();

  async function start() {
    try {
      const tipos = await new TipoUaService(db).getAll();
      setTipos_Uas([...tipos]);
      setIsRefreshing(false);
      setIsLoading(false);
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
      setTipos_Uas([]);
      setIsRefreshing(false);
      setIsLoading(false);
    }
  }

  React.useEffect(() => {
    if (isFocused) {
      start();
    }
  }, [isFocused]);

  const ListRenderTipoUa: ListRenderItem<TipoUaUpdate> = ({ item }) => {
    return (
      <Card size="md" variant="elevated" m="$3">
        <HStack justifyContent="space-between">
          <Box w="$2/3">
            <Heading mb="$1" size="md">
              {item.nome}
            </Heading>
          </Box>
          <Box gap="$5">
            <Button
              onPress={async () => {
                try {
                  Alert.alert(
                    'Aviso',
                    `Voce deseja mesmo deletear o tipo: ${item.nome}`,
                    [
                      {
                        text: 'Não',
                        onPress: () =>
                          Alert.alert('Aviso', 'Operacao cancelada'),
                      },
                      {
                        text: 'Sim',
                        onPress: async () => {
                          try {
                            await new TipoUaService(db).delete(item.id);
                            Alert.alert(
                              'Aviso',
                              `Item ${item.nome} deletado com sucesso`,
                            );
                            start();
                          } catch (error) {
                            throw error;
                          }
                        },
                      },
                    ],
                  );
                } catch (error) {
                  Alert.alert('Error', (error as Error).message);
                  throw error;
                }
              }}
              action="negative"
            >
              <ButtonIcon as={TrashIcon} />
            </Button>
            <Button
              onPress={() =>
                navigation?.navigate('atualizar-tipo-ua', { id: item.id })
              }
            >
              <ButtonIcon as={EditIcon} />
            </Button>
          </Box>
        </HStack>
      </Card>
    );
  };

  if (isLoading) {
    return <LoadingScreen />
  }

  return tipos_Uas.length < 1 ? (
    <Box h="$full" w="$full" alignItems="center" justifyContent="center">
      <Box gap="$5">
        <Heading textAlign="center">
          Tipos de Unidades de Armazenamento não encontrados
        </Heading>
        <Box>
          <Button onPress={() => navigation?.navigate('cadastrar-tipo-ua')}>
            <ButtonText>Cadastrar Tipo de UA</ButtonText>
            <ButtonIcon as={AddIcon} />
          </Button>
        </Box>
      </Box>
    </Box>
  ) : (
    <Box w="$full" h="$full" px="$8" py="$8">
      <Box gap="$5">
        <Formik
          initialValues={{
            busca: '',
          }}
          onSubmit={async (values) => {
            try {
              const res = await new TipoUaService(db).getNome(values.busca);
              if (res.length > 0) {
                setTipos_Uas(res);
              } else {
                throw new Error('Nenhum  tipo de UA encontrado');
              }
            } catch (error) {
              Alert.alert('Error', (error as Error).message);
              throw error;
            }
          }}
        >
          {({ values, errors, handleChange, handleSubmit }) => {
            return (
              <>
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
                      type="text"
                      value={values.busca}
                      placeholder="Buscar"
                      onChangeText={handleChange('busca')}
                    />
                    <Button
                      onPress={
                        handleSubmit as unknown as (
                          event: GestureResponderEvent,
                        ) => void
                      }
                    >
                      <ButtonIcon as={SearchIcon} />
                    </Button>
                  </Input>

                  <FormControlHelper>
                    <FormControlHelperText>
                      Must be atleast 6 characters.
                    </FormControlHelperText>
                  </FormControlHelper>

                  <FormControlError>
                    <FormControlErrorIcon as={AlertCircleIcon} />
                    <FormControlErrorText>{errors.busca}</FormControlErrorText>
                  </FormControlError>
                </FormControl>
              </>
            );
          }}
        </Formik>
        <Button onPress={() => navigation?.navigate('cadastrar-tipo-ua')}>
          <ButtonText>Cadastrar Tipos de UAs</ButtonText>
          <ButtonIcon ml="$5" as={AddIcon} />
        </Button>
      </Box>
      <Box w="$full" alignItems="center" gap="$5" my="$5">
        <Divider />
        <Text>Tipos de Unidades de Armazenamento</Text>
        <Divider />
      </Box>
      <FlatListTipoUa
        data={tipos_Uas}
        renderItem={ListRenderTipoUa}
        keyExtractor={(item) => String(item.id)}
        refreshing={isRefreshing}
        onRefresh={async () => {
          try {
            start();
          } catch (error) {
            Alert.alert('Erro', (error as Error).message);
            setIsRefreshing(false);
            throw error;
          }
        }}
      />
    </Box>
  );
};
export default View;
