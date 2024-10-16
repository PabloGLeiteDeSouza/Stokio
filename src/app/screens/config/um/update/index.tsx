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
import { AtualizarUmScreen } from '@/interfaces/um';
const Update: React.FC<AtualizarUmScreen> = ({ navigation, route }) => {
  const db = useSQLiteContext();
  if (!route || !route.params || !route.params.um) {
    navigation?.goBack();
    return null;
  }
  const um = route.params.um;
  return (
    <Box h="$full" w="$full" px="$8" py="$8">
      <ScrollView w="$full">
        <VStack w="$full" space="2xl">
          <Box w="$full" alignItems="center">
            <Heading size="xl">Atualizar Unidade de Medida:</Heading>
          </Box>
          <Formik
            initialValues={um}
            onSubmit={async (values) => {
              try {
                await new UmService(db).update(values);
                Alert.alert(
                  'Sucesso',
                  'Unidade de Medida atualizada com sucesso!',
                );
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
                    isInvalid={errors.valor ? true : false}
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
                        Informe um valor para unidade de medida.
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
