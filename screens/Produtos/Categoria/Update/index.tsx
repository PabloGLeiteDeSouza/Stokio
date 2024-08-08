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
import { RootStackParamList } from '$types/index';
import { Box, Text } from '@gluestack-ui/themed';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Formik } from 'formik';
import { Alert, GestureResponderEvent } from 'react-native';
import { Categoria } from '$classes/categoria';
import { useSQLiteContext } from 'expo-sqlite';
type EditarCategoriasScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'editar-categoria'
>;
type EditarCategoriasScreenRouteProp = RouteProp<
  RootStackParamList,
  'editar-categoria'
>;
interface EditarCategoriasScreenProps {
  navigation?: EditarCategoriasScreenNavigationProp;
  route?: EditarCategoriasScreenRouteProp;
}
const Update: React.FC<EditarCategoriasScreenProps> = ({
  navigation,
  route,
}) => {
  if (!route || !route.params || !route.params?.categoria) {
    navigation?.goBack();
    return null;
  }
  const db = useSQLiteContext();
  const categoria = route.params.categoria;
  return (
    <Box justifyContent="center" alignItems="center">
      <Box my="$8" w="$full" alignItems="center" justifyContent="center">
        <Text size="2xl">Atualize os dados da categoria</Text>
      </Box>
      <Box
        mx="$8"
        rounded="$lg"
        p="$5"
        $dark-bgColor="$purple900"
        $light-bgColor="$purple600"
      >
        <Formik
          initialValues={{
            ...categoria,
          }}
          onSubmit={async (values) => {
            try {
              const dados = await new Categoria(db).update(
                Number(values.id),
                values,
              );
              if (!dados) {
                throw new Error('Não foi possível atualizar a categoria!');
              }
              Alert.alert('Sucesso', 'Categoria Atualizada com Sucesso!');
              return navigation?.navigate('listar-categoria');
            } catch (error) {
              Alert.alert('Erro', (error as Error).message);
            }
          }}
        >
          {({ values, handleChange, handleSubmit, errors }) => {
            return (
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
                      type="text"
                      value={values.nome}
                      placeholder="Nome"
                      onChangeText={handleChange('nome')}
                    />
                  </Input>

                  <FormControlHelper>
                    <FormControlHelperText>
                      Informe o nome que deve ser usado.
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
                  isRequired={true}
                >
                  <FormControlLabel>
                    <FormControlLabelText>Descrição</FormControlLabelText>
                  </FormControlLabel>
                  <Textarea>
                    <TextareaInput
                      placeholder="Descrição da catgoria do produo desejado!"
                      type="text"
                      value={values.descricao}
                      onChangeText={handleChange('descricao')}
                    />
                  </Textarea>

                  <FormControlHelper>
                    <FormControlHelperText>
                      Informe a descrição da categoria do produto desejado.
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
              </>
            );
          }}
        </Formik>
      </Box>
    </Box>
  );
};
export default Update;
