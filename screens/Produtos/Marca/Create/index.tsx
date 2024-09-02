import { Marca } from '$classes/marca';
import {
  AlertCircleIcon,
  ButtonText,
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlHelper,
  FormControlHelperText,
  Input,
  InputField,
  Text,
} from '@gluestack-ui/themed';
import { FormControlLabel } from '@gluestack-ui/themed';
import { Textarea } from '@gluestack-ui/themed';
import { Button } from '@gluestack-ui/themed';
import { TextareaInput } from '@gluestack-ui/themed';
import { FormControlLabelText } from '@gluestack-ui/themed';
import { Box } from '@gluestack-ui/themed';
import { useSQLiteContext } from 'expo-sqlite';
import { Formik } from 'formik';
import { Alert, GestureResponderEvent } from 'react-native';
import { CadastrarMarcasScreenProps } from './interfaces';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  nome: Yup.string().required('O nome não pode ser vázio!'),
  descicao: Yup.string(),
});

const Create: React.FC<CadastrarMarcasScreenProps> = ({ navigation }) => {
  const db = useSQLiteContext();

  return (
    <Box w="$full" h="$full" display="flex" alignItems="center">
      <Box pt="$5">
        <Text textAlign="center" size="2xl">
          Cadastre uma marca de um produto abaixo:
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
            try {
              const result = await new Marca(db).create(values);
              if (result) {
                Alert.alert('Sucesso', 'Marca cadastrada com sucesso!');
                return navigation?.navigate('listar-marca');
              } else {
                throw new Error('não foi possível cadastrar a marca!');
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
                    Informe o nome da marca.
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
                    placeholder="Informe a descrição da marca"
                    onChangeText={handleChange('descricao')}
                    value={values.descricao}
                  />
                </Textarea>

                <FormControlHelper>
                  <FormControlHelperText>
                    Informe acima a descrição da marca.
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
