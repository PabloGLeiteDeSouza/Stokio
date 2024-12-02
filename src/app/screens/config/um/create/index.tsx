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
import UmService from '@/classes/um/um.service';
import { useSQLiteContext } from 'expo-sqlite';
import { CadastrarUmScreen } from '@/interfaces/um';
const Create: React.FC<CadastrarUmScreen> = ({ navigation }) => {
  const db = useSQLiteContext();
  return (
    <Box h="$full" w="$full" px="$8" py="$8">
      <ScrollView w="$full">
        <VStack space="lg">
          <Box w="$full" alignItems="center">
            <Heading>Cadastrar Unidade de Medida:</Heading>
          </Box>
          <Formik
            initialValues={{
              nome: '',
              valor: '',
            }}
            onSubmit={async (values) => {
              try {
                await new UmService(db).create(values);
                navigation?.goBack();
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
                    isInvalid={errors.nome ? true : false}
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
                    isInvalid={errors?.valor ? true : false}
                    size={'md'}
                    isDisabled={false}
                    isRequired={true}
                  >
                    <FormControlLabel>
                      <FormControlLabelText>Valor</FormControlLabelText>
                    </FormControlLabel>
                    <Input>
                      <InputField
                        type="text"
                        value={values.valor}
                        placeholder="cm"
                        onChangeText={handleChange('valor')}
                      />
                    </Input>

                    <FormControlHelper>
                      <FormControlHelperText>
                        Informe o valor da unidade de medida.
                      </FormControlHelperText>
                    </FormControlHelper>

                    <FormControlError>
                      <FormControlErrorIcon as={AlertCircleIcon} />
                      <FormControlErrorText>
                        {errors.valor}
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
