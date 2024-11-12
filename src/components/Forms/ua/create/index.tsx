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
  Box,
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
  Text,
  Center,
  Icon,
  CircleIcon,
  CheckIcon,
  AlertCircleIcon,
  ChevronDownIcon,
} from '@gluestack-ui/themed';
import { Formik } from 'formik';
import { Alert, GestureResponderEvent } from 'react-native';
import UaService from '@/classes/ua/ua.service';
import { IFormCreateUa } from './interface';

const FormCreateUa: React.FC<IFormCreateUa> = ({ db, onSubimited }) => {
  return (
    <>
      <Formik
        initialValues={{
          nome: '',
          descricao: '',
          tipo_ua: {
            id: 0,
            nome: '',
            descricao: '',
          },
        }}
        onSubmit={async (values) => {
          try {
            await new UaService(db).create(values);
            Alert.alert("Sucesso", "Unidade de Armazenamento cadastrada com sucesso!")
            onSubimited();
          } catch (error) {
            Alert.alert('Error', (error as Error).message);
          }
        }}
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
                isRequired={false}
              >
                <FormControlLabel>
                  <FormControlLabelText>Descricao</FormControlLabelText>
                </FormControlLabel>
                <Textarea>
                  <TextareaInput
                    value={values.descricao}
                    placeholder="descricao"
                    onChangeText={handleChange('descricao')}
                  />
                </Textarea>

                <FormControlHelper>
                  <FormControlHelperText>
                    Informe a descricao.
                  </FormControlHelperText>
                </FormControlHelper>

                <FormControlError>
                  <FormControlErrorIcon as={AlertCircleIcon} />
                  <FormControlErrorText>{errors.descricao}</FormControlErrorText>
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
                    value={values.tipo_ua.nome}
                    placeholder="Tipo de ua nome"
                    onChangeText={handleChange('tipo_ua.nome')}
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
                    {errors.tipo_ua?.nome}
                  </FormControlErrorText>
                </FormControlError>
              </FormControl>
              <FormControl
                isInvalid={false}
                size={'md'}
                isDisabled={false}
                isRequired={false}
              >
                <FormControlLabel>
                  <FormControlLabelText>
                    Descricao Tipo de Ua
                  </FormControlLabelText>
                </FormControlLabel>
                <Textarea>
                  <TextareaInput
                    value={values.tipo_ua.descricao}
                    onChangeText={handleChange('tipo_ua.descricao')}
                  />
                </Textarea>
                <FormControlHelper>
                  <FormControlHelperText>
                    Must be atleast 6 characters.
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
    </>
  );
};
export default FormCreateUa;
