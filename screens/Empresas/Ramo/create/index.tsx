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
import { GestureResponderEvent } from 'react-native';
const Create: React.FC = () => {
  return (
    <Box w="$full" justifyContent="center" alignItems="center">
      <Text>Cadastrar Ramo</Text>
      <Box>
        <Formik
          initialValues={{
            nome: '',
            descricao: '',
          }}
        >
          {({ values, handleChange, handleSubmit, errors }) => {
            return (
              <Box>
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
