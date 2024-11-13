import {
  Radio,
  RadioGroup,
  RadioIcon,
  RadioIndicator,
  RadioLabel,
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
  Text,
  Center,
  Icon,
  CircleIcon,
  CheckIcon,
  ChevronDownIcon,
} from '@gluestack-ui/themed';

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
import TipoUaService from '@/classes/tipo_ua/tipo_ua.service';
import { useSQLiteContext } from 'expo-sqlite';
import { CadastrarTipoUaScreen } from '@/interfaces/tipo-ua';
const Create: React.FC<CadastrarTipoUaScreen> = ({ navigation }) => {
  const db = useSQLiteContext();
  return (
    <Box h="$full" w="$full" px="$8" py="$8">
      <ScrollView w="$full">
        <VStack w="$full" space="2xl">
          <Box w="$full" alignItems="center">
            <Heading size="xl" textAlign="center">
              Cadastrar Tipo de Unidade de Armazenamento:
            </Heading>
          </Box>
          <Formik
            initialValues={{
              nome: '',
              descricao: '',
            }}
            onSubmit={async (values) => {
              try {
                await new TipoUaService(db).create(values);
                Alert.alert(
                  'Sucesso',
                  'Tipo de Unidade de Armazenamento criado com sucesso!',
                );
                navigation?.navigate('visualizar-tipo-uas');
              } catch (error) {
                Alert.alert('Error', (error as Error).message);
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
                        onChangeText={handleChange('descricao')}
                        value={values.descricao}
                      />
                    </Textarea>

                    <FormControlHelper>
                      <FormControlHelperText>
                        Descricao do aplicativo.
                      </FormControlHelperText>
                    </FormControlHelper>

                    <FormControlError>
                      <FormControlErrorIcon as={AlertCircleIcon} />
                      <FormControlErrorText>
                        Atleast 6 characters are required.
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
