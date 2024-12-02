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
import { useSQLiteContext } from 'expo-sqlite';
import TipoProdutoService from '@/classes/tipo_produto/tipo_produto.service';
import { CadastrarTipoProdutoScreen } from '@/interfaces/tipo-produto';
const Create: React.FC<CadastrarTipoProdutoScreen> = ({ navigation }) => {
  const db = useSQLiteContext();
  return (
    <Box h="$full" w="$full" px="$8" py="$8">
      <ScrollView w="$full">
        <VStack space="lg">
          <Box w="$full" alignItems="center">
            <Heading>Cadastrar Tipo de Produto:</Heading>
          </Box>
          <Formik
            initialValues={{
              nome: '',
            }}
            onSubmit={async (value) => {
              try {
                await new TipoProdutoService(db).create(value);
                Alert.alert('Sucesso', 'Tipo de Produto criado com sucesso!');
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
                      <ButtonText>Cadastrar</ButtonText>
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
export default Create;
