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
  AlertCircleIcon,
} from '@gluestack-ui/themed';
import { Box, Heading, ScrollView, VStack } from '@gluestack-ui/themed';
import { Formik } from 'formik';
import { Alert, GestureResponderEvent } from 'react-native';
import { AtualizarMarcaScreen } from '@/interfaces/marca';
import LoadingScreen from '@/components/LoadingScreen';
import { useSQLiteContext } from 'expo-sqlite';
import MarcaService from '@/classes/marca/marca.service';
import { MarcaUpdate } from '@/classes/marca/interfaces';
const Update: React.FC<AtualizarMarcaScreen> = ({ navigation, route }) => {

  if (!route || !route.params || !route.params.id ) {
    Alert.alert('Erro', 'Infrome uma marca correta');
    navigation?.goBack();
    return null;
  }

  const id = route.params.id;
  const [marca, setMarca] = React.useState<MarcaUpdate>({
    id,
    nome: '',
  });
  const [isLoading, setIsLoading] = React.useState(true);
  const db = useSQLiteContext();

  const start = async () => {
    try {
      const marca = await new MarcaService(db).getId(id);
      setMarca(marca);
      setIsLoading(false);
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
      setIsLoading(false);
      throw error;
    }
  }

  React.useEffect(() => {
    start();
  }, []);

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <Box h="$full" w="$full" px="$8" py="$8">
      <ScrollView w="$full">
        <VStack w="$full" space="2xl">
          <Box w="$full" alignItems="center">
            <Heading size="xl">Atualizar Marca:</Heading>
          </Box>
          <Formik
            initialValues={marca}
            onSubmit={async (values) => {
              try {
                await new MarcaService(db).update(values);
                Alert.alert("Sucesso", "Atualizacao realizada com sucesso!")
                navigation?.goBack();
              } catch (error) {
                Alert.alert("Error", (error as Error).message);
              }
            }}
          >
            {({ handleChange, handleSubmit, values, errors }) => {
              return (
                <Box gap="$8">
                  <FormControl
                    isInvalid={false}
                    size={'md'}
                    isDisabled={false}
                    isRequired={true}
                  >
                    <FormControlLabel>
                      <FormControlLabelText>Nome</FormControlLabelText>
                    </FormControlLabel>
                    <Input>
                      <InputField
                        type="text"
                        value={values.nome}
                        placeholder="Nome"
                        onChangeText={handleChange('nome')}
                      />
                    </Input>

                    <FormControlHelper>
                      <FormControlHelperText>
                        Informe um nome.
                      </FormControlHelperText>
                    </FormControlHelper>

                    <FormControlError>
                      <FormControlErrorIcon as={AlertCircleIcon} />
                      <FormControlErrorText>{errors.nome}</FormControlErrorText>
                    </FormControlError>
                  </FormControl>
                  <Box>
                    <Button
                      onPress={
                        handleSubmit as unknown as (
                          event: GestureResponderEvent,
                        ) => void
                      }
                    >
                      <ButtonText>Atualizar</ButtonText>
                    </Button>
                  </Box>
                </Box>
              );
            }}
          </Formik>
        </VStack>
      </ScrollView>
    </Box>
  );
};
export default Update;
