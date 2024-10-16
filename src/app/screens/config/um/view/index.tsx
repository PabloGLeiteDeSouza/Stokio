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
} from '@gluestack-ui/themed';
import { Box } from '@gluestack-ui/themed';
import { Formik } from 'formik';
import { Card } from '@gluestack-ui/themed';
import { EditIcon } from '@gluestack-ui/themed';
import { SearchIcon } from '@gluestack-ui/themed';
import { UmFlatList } from '@/types/screens/um';
import { Alert, ListRenderItem } from 'react-native';
import { VisualizarUmScreen } from '@/interfaces/um';
import { useIsFocused } from '@react-navigation/native';
import UmService from '@/classes/um/um.service';
import { useSQLiteContext } from 'expo-sqlite';
import LoadingScreen from '@/components/LoadingScreen';
import { UmUpdate } from '@/classes/um/interfaces';

const View: React.FC<VisualizarUmScreen> = ({ navigation }) => {
  const db = useSQLiteContext();
  const [ums, setUms] = React.useState<Array<UmUpdate>>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const FlatListUms = FlatList as UmFlatList;
  const focused = useIsFocused();

  async function start() {
    try {
      setIsLoading(true);
      const res = await new UmService(db).getAll();
      setUms(res);
      setIsLoading(false);
    } catch (error) {
      Alert.alert('Erro', (error as Error).message);
      setIsLoading(false);
      throw error;
    }
  }

  React.useEffect(() => {
    start();
  }, [focused]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  const ListRenderUms: ListRenderItem<UmUpdate> = ({ item }) => {
    return (
      <Card size="md" variant="elevated" m="$3">
        <HStack justifyContent="space-between">
          <Box w="$2/3" gap="$5">
            <Heading size="md">{item.nome}</Heading>
            <Text size="md">{item.valor}</Text>
          </Box>
          <Box gap="$5">
            <Button
              onPress={async () => {
                try {
                  await new UmService(db).delete(item.id);
                  Alert.alert('Sucesso', 'Um deletado com sucesso!');
                  start();
                } catch (error) {
                  Alert.alert('Erro', (error as Error).message);
                  throw error;
                }
              }}
              action="negative"
            >
              <ButtonIcon as={TrashIcon} />
            </Button>
            <Button
              onPress={() => navigation?.navigate('atualizar-um', { um: item })}
            >
              <ButtonIcon as={EditIcon} />
            </Button>
          </Box>
        </HStack>
      </Card>
    );
  };

  return ums.length < 1 ? (
    <Box h="$full" w="$full" alignItems="center" justifyContent="center">
      <Box gap="$5">
        <Heading textAlign="center">Unidades de Medida não encontradas</Heading>
        <Box>
          <Button onPress={() => navigation?.navigate('cadastrar-um')}>
            <ButtonText>Cadastrar UM</ButtonText>
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
              const resp = await new UmService(db).getByNome(values.busca);
              setUms([...resp]);
            } catch (error) {
              Alert.alert('Erro', (error as Error).message);
              throw error;
            }
          }}
        >
          {({ values, handleChange }) => {
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
                    <Button>
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
                    <FormControlErrorText>
                      Atleast 6 characters are required.
                    </FormControlErrorText>
                  </FormControlError>
                </FormControl>
              </>
            );
          }}
        </Formik>
        <Button onPress={() => navigation?.navigate('cadastrar-um')}>
          <ButtonText>Cadastrar Unidade De Medida</ButtonText>
          <ButtonIcon ml="$5" as={AddIcon} />
        </Button>
      </Box>
      <Box w="$full" alignItems="center" gap="$5" my="$5">
        <Divider />
        <Text>Unidades de Medida</Text>
        <Divider />
      </Box>
      <FlatListUms
        data={ums}
        renderItem={ListRenderUms}
        keyExtractor={(item) => String(item.id)}
      />
    </Box>
  );
};
export default View;
