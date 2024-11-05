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
import { AtualizarTipoUaScreen } from '@/interfaces/tipo-ua';
import TipoUaService from '@/classes/tipo_ua/tipo_ua.service';
import { useSQLiteContext } from 'expo-sqlite';
import { TipoUaUpdate } from '@/classes/tipo_ua/interfaces';
import LoadingScreen from '@/components/LoadingScreen';
import { Textarea } from '@gluestack-ui/themed';
import { TextareaInput } from '@gluestack-ui/themed';
const Update: React.FC<AtualizarTipoUaScreen> = ({ navigation, route }) => {
  if (!route || !route.params || !route.params.id) {
    navigation?.goBack();
    return null;
  }

  const id = route.params.id;
  const db = useSQLiteContext();
  const [tipoUa, setTipoUa] = React.useState<TipoUaUpdate | unknown>({});
  const [isLoading, setIsLoading] = React.useState(true);

  async function start() {
    try {
      if (!isLoading) {
        setIsLoading(true);
      }
      const data = await new TipoUaService(db).getId(id);
      console.log(data);
      setTipoUa(data);
      setIsLoading(false);
    } catch (error) {
      Alert.alert('Erro', (error as Error).message);
      navigation?.goBack();
      setIsLoading(false);
      throw error;
    }
  }

  React.useEffect(() => {
    start();
  }, [route.params.id]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Box h="$full" w="$full" px="$8" py="$8">
      <ScrollView w="$full">
        <VStack w="$full" space="2xl">
          <Box w="$full" alignItems="center">
            <Heading size="xl" textAlign="center">
              Atualizar Tipo de Unidade de Armazenamento:
            </Heading>
          </Box>
          <Formik
            initialValues={tipoUa as TipoUaUpdate}
            onSubmit={async (values) => {
              try {
                await new TipoUaService(db).update(values);
                Alert.alert(
                  'Sucesso',
                  'Tipo de Unidade de Armazenamento atualizado com sucesso',
                );
                navigation?.navigate('visualizar-tipo-uas');
              } catch (error) {
                Alert.alert('Erro', (error as Error).message);
                throw error;
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
                  <FormControl
                    isInvalid={false}
                    size={'md'}
                    isDisabled={false}
                    isRequired={false}
                  >
                    <FormControlLabel>
                      <FormControlLabelText>Descricao</FormControlLabelText>
                    </FormControlLabel>
                    <Textarea>
                      <TextareaInput
                        onChangeText={handleChange('descricao')}
                        value={values.descricao}
                        placeholder="Descricao"
                        
                      />
                    </Textarea>

                    <FormControlHelper>
                      <FormControlHelperText>
                        Descricao do aplicativo.
                      </FormControlHelperText>
                    </FormControlHelper>

                    <FormControlError>
                      <FormControlErrorIcon as={AlertCircleIcon} />
                      <FormControlErrorText>
                        {errors.descricao}
                      </FormControlErrorText>
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
