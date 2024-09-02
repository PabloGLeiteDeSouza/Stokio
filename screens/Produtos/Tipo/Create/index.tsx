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
  Textarea,
  TextareaInput,
  AlertCircleIcon,
} from '@gluestack-ui/themed';
import { Box, ScrollView } from '@gluestack-ui/themed';
import { Formik } from 'formik';
import { CadastrarTiposDeProdutosProp } from './interfaces';
import { criarTipo } from './functions';
import { useSQLiteContext } from 'expo-sqlite';
import { Alert, GestureResponderEvent } from 'react-native';
import { Text } from '@gluestack-ui/themed';
const Create: React.FC<CadastrarTiposDeProdutosProp> = ({ navigation }) => {
  const db = useSQLiteContext();
  return (
    <ScrollView>
      <Box
        mt="$5"
        w="$full"
        alignItems="center"
        justifyContent="center"
        gap="$5"
      >
        <Box w="$full" justifyContent="center" alignItems="center">
          <Text size="2xl">Cadastre um tipo de produto abaixo:</Text>
        </Box>
        <Formik
          initialValues={{
            nome: '',
            descricao: '',
          }}
          onSubmit={(values) => criarTipo(values, db, navigation, Alert)}
        >
          {({ handleChange, handleSubmit, errors }) => {
            return (
              <Box w="$3/4" gap="$5">
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
                      onChangeText={handleChange('nome')}
                      type="text"
                      placeholder="Nome"
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
                  isRequired={true}
                >
                  <FormControlLabel>
                    <FormControlLabelText>Descricao</FormControlLabelText>
                  </FormControlLabel>
                  <Textarea>
                    <TextareaInput
                      onChangeText={handleChange('descricao')}
                      placeholder="Descricao"
                    />
                  </Textarea>

                  <FormControlHelper>
                    <FormControlHelperText>
                      Informe uma descricao.
                    </FormControlHelperText>
                  </FormControlHelper>

                  <FormControlError>
                    <FormControlErrorIcon as={AlertCircleIcon} />
                    <FormControlErrorText>
                      {errors.descricao}
                    </FormControlErrorText>
                  </FormControlError>
                </FormControl>
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
            );
          }}
        </Formik>
      </Box>
    </ScrollView>
  );
};
export default Create;
