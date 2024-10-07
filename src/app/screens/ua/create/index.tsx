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
import { Box, Heading, ScrollView, VStack } from '@gluestack-ui/themed';
import { Formik } from 'formik';
import { GestureResponderEvent } from 'react-native';
import { CadastrarUaScreen } from '@/interfaces/ua';
const Create: React.FC<CadastrarUaScreen> = ({ navigation }) => {
  const [isLoadingScreen, setisLoadingScreen] = React.useState(true);

  React.useEffect(() => {
    async function Start() {
      try {
        setisLoadingScreen(false);
      } catch (error) {
        throw error;
      }
    }
    if (isLoadingScreen) {
      Start();
    }
  }, [isLoadingScreen]);

  return (
    <Box h="$full" w="$full" px="$8" py="$8">
      <ScrollView w="$full">
        <VStack space="lg">
          <Box w="$full" alignItems="center">
            <Heading>Cadastrar Unidade de Armazenamento:</Heading>
          </Box>
          <Formik
            initialValues={{
              nome: '',
              id_tipo_ua: '',
              nome_tipo_ua: '',
            }}
            onSubmit={() => {}}
          >
            {({ handleChange, handleSubmit, values, errors }) => {
              return (
                <Box gap="$5">
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
                    isRequired={true}
                  >
                    <FormControlLabel>
                      <FormControlLabelText>
                        Tipo de unidade de medida
                      </FormControlLabelText>
                    </FormControlLabel>
                    <Input>
                      <InputField
                        type="text"
                        value={values.nome_tipo_ua}
                        placeholder="Descricao"
                        onChangeText={handleChange('descricao')}
                      />
                    </Input>

                    <FormControlHelper>
                      <FormControlHelperText>
                        Informe a nome do tipo de unidade de medida.
                      </FormControlHelperText>
                    </FormControlHelper>

                    <FormControlError>
                      <FormControlErrorIcon as={AlertCircleIcon} />
                      <FormControlErrorText>
                        {errors.nome_tipo_ua}
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
