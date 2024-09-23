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
  Radio,
  RadioGroup,
  RadioIcon,
  RadioIndicator,
  RadioLabel,
  Button,
  ButtonText,
  Checkbox,
  CheckboxGroup,
  CheckboxIndicator,
  CheckboxIcon,
  CheckboxLabel,
  Textarea,
  TextareaInput,
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicatorWrapper,
  SelectDragIndicator,
  SelectItem,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Switch,
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  HStack,
  VStack,
  Heading,
  Center,
  Icon,
  CircleIcon,
  CheckIcon,
  AlertCircleIcon,
  ChevronDownIcon,
} from '@gluestack-ui/themed';
import { Box, Text } from '@gluestack-ui/themed';
import { Formik } from 'formik';
import { Alert, GestureResponderEvent } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import { Ramo } from '$classes/ramo';
import { CadastrarRamosScreenProps } from '../interfaces';

const Create: React.FC<CadastrarRamosScreenProps> = ({ navigation }) => {
  const db = useSQLiteContext();

  const onSubmit = async (values: { nome: string; descricao: string }) => {
    try {
      await new Ramo(db).create(values);
      Alert.alert('Sucesso', 'Ramo criado com sucesso!');
      navigation?.navigate('listar-ramos');
    } catch (error) {
      Alert.alert('Erro', (error as Error).message);
      throw error;
    }
  };

  return (
    <Box w="$full" justifyContent="center" alignItems="center">
      <Box my="$5">
        <Text size="3xl">Cadastrar Ramo</Text>
      </Box>
      <Box>
        <Formik
          initialValues={{
            nome: '',
            descricao: '',
          }}
          onSubmit={onSubmit}
        >
          {({ values, handleChange, handleSubmit, errors }) => {
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
                      placeholder="Ramo"
                      onChangeText={handleChange('nome')}
                    />
                  </Input>

                  <FormControlHelper>
                    <FormControlHelperText>
                      Informe um nome para o ramo.
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
                      placeholder="Drescricao do Ramo"
                      onChangeText={handleChange('descricao')}
                      value={values.descricao}
                    />
                  </Textarea>

                  <FormControlHelper>
                    <FormControlHelperText>
                      Informe a descricao do ramo a ser cadastrado.
                    </FormControlHelperText>
                  </FormControlHelper>
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
      </Box>
    </Box>
  );
};
export default Create;
