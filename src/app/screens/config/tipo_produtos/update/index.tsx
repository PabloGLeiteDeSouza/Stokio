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
import { AtualizarTipoProdutoScreen } from '@/interfaces/tipo-produto';
import TipoProdutoService from '@/classes/tipo_produto/tipo_produto.service';
import { useSQLiteContext } from 'expo-sqlite';
import LoadingScreen from '@/components/LoadingScreen';
import { useIsFocused } from '@react-navigation/native';
import { TipoProdutoUpdate } from '@/classes/tipo_produto/interfaces';
const Update: React.FC<AtualizarTipoProdutoScreen> = ({
  navigation,
  route,
}) => {
  if (!route || !route.params || !route.params.id) {
    navigation?.goBack();
    return null;
  }
  const id = route.params.id;
  const [tipoProduto, setTipoProduto] = React.useState<
    TipoProdutoUpdate | unknown
  >({});
  const [isLoading, setIsLoading] = React.useState(true);
  const isFocused = useIsFocused();
  const db = useSQLiteContext();
  async function start() {
    try {
      const tp = await new TipoProdutoService(db).getById(id);
      setTipoProduto(tp);
      setIsLoading(false);
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
      navigation?.goBack();
      setIsLoading(false);
      throw error;
    }
  }

  React.useEffect(() => {
    if (isFocused) {
      start();
    }
  }, [isFocused]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Box h="$full" w="$full" px="$8" py="$8">
      <ScrollView w="$full">
        <VStack w="$full" space="2xl">
          <Box w="$full" alignItems="center">
            <Heading size="xl">Atualizar Tipo de Produto:</Heading>
          </Box>
          <Formik
            initialValues={tipoProduto as TipoProdutoUpdate}
            onSubmit={async (values) => {
              try {
                await new TipoProdutoService(db).update(values);
                Alert.alert(
                  'Sucesso',
                  'Tipo de produto atualizado com sucesso!',
                );
                navigation?.navigate('visualizar-tipo-produtos');
              } catch (error) {
                Alert.alert('Error', (error as Error).message);
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
