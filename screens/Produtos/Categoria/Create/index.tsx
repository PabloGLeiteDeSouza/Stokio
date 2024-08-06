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
import { Box, Text } from '@gluestack-ui/themed';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Categoria } from '$classes/categoria';
import { useSQLiteContext } from 'expo-sqlite';
import { Alert, GestureResponderEvent } from 'react-native';
import { RootStackParamList } from '$types/index';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

const validationSchema = Yup.object().shape({
  nome: Yup.string().required(),
  descicao: Yup.string(),
});

type CadastrarCategoriasScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'cadastrar-categoria'
>;
type CadastrarCategoriasScreenRouteProp = RouteProp<
  RootStackParamList,
  'cadastrar-categoria'
>;
interface CadastrarCategoriasScreenProps {
  navigation?: CadastrarCategoriasScreenNavigationProp;
  route?: CadastrarCategoriasScreenRouteProp;
}

const Create: React.FC<CadastrarCategoriasScreenProps> = ({ navigation }) => {
  const db = useSQLiteContext();

  return (
    <Box w="$full" h="$full" display="flex" alignItems="center">
      <Box pt="$5">
        <Text textAlign="center" size="2xl">
          Cadastre uma categoria de produto abaixo:
        </Text>
      </Box>
      <Box mt="$5" w="$2/3" gap="$6">
        <Formik
          validationSchema={validationSchema}
          initialValues={{
            nome: '',
            descricao: '',
          }}
          onSubmit={async (values) => {
            console.log('teste');
            try {
              const result = await new Categoria(db).create(values);
              if (result) {
                Alert.alert('Sucesso', 'Categoria cadastrada com sucesso!');
                return navigation?.navigate('listar-categoria');
              } else {
                throw new Error('não foi possível cadastrar a categoria!');
              }
            } catch (error) {
              Alert.alert('Error', (error as Error).message);
              console.error(error);
              throw error;
            }
          }}
        >
          {({ handleChange, handleSubmit, values, errors }) => (
            <>
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
                    value={values.nome}
                    type="text"
                    onChangeText={handleChange('nome')}
                    placeholder="nome"
                  />
                </Input>

                <FormControlHelper>
                  <FormControlHelperText>
                    Informe o nome da categoria.
                  </FormControlHelperText>
                </FormControlHelper>

                <FormControlError>
                  <FormControlErrorIcon as={AlertCircleIcon} />
                  <FormControlErrorText>{errors.nome}</FormControlErrorText>
                </FormControlError>
              </FormControl>
              <FormControl
                isInvalid={errors.descricao ? true : false}
                size={'md'}
                isDisabled={false}
                isRequired={false}
              >
                <FormControlLabel>
                  <FormControlLabelText>Descrição</FormControlLabelText>
                </FormControlLabel>

                <Textarea>
                  <TextareaInput
                    placeholder="Informe a descrição da categoria"
                    onChangeText={handleChange('descricao')}
                    value={values.descricao}
                  />
                </Textarea>

                <FormControlHelper>
                  <FormControlHelperText>
                    Informe acima a descrição da categoria.
                  </FormControlHelperText>
                </FormControlHelper>

                <FormControlError>
                  <FormControlErrorIcon as={AlertCircleIcon} />
                  <FormControlErrorText>
                    {errors.descricao}
                  </FormControlErrorText>
                </FormControlError>
              </FormControl>
              <Box w="$full">
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
            </>
          )}
        </Formik>
      </Box>
    </Box>
  );
};
export default Create;
