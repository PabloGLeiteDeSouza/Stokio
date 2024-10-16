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
  Text,
  Center,
  Icon,
  CircleIcon,
  CheckIcon,
  AlertCircleIcon,
  ChevronDownIcon,
} from '@gluestack-ui/themed';
import { Box, Heading, ScrollView } from '@gluestack-ui/themed';
import { Formik } from 'formik';
import { GestureResponderEvent } from 'react-native';
import InputDatePicker from '@/components/Custom/Inputs/DatePicker';
const Create: React.FC = () => {
  return (
    <Box w="$full" h="$full">
      <ScrollView w="$full">
        <Box my="$5" mx="$5" gap="$5">
          <Box w="$full" alignItems="center">
            <Heading size="xl">Cadastrar Compra</Heading>
          </Box>
          <Box gap="$5">
            <Formik
              initialValues={{
                data: new Date(),
                data_pagamento: new Date(),
                produtos: [],
              }}
              onSubmit={() => {}}
            >
              {({ values, errors, handleChange, handleSubmit }) => {
                return (
                  <>
                    <InputDatePicker
                      onChangeDate={handleChange('data')}
                      value={values.data}
                      title="Data da Compra"
                      error={errors.data}
                    />
                    <FormControl
                      isInvalid={false}
                      size={'md'}
                      isDisabled={false}
                      isRequired={true}
                    >
                      <FormControlLabel>
                        <FormControlLabelText>Valor Total</FormControlLabelText>
                      </FormControlLabel>
                      <Input>
                        <InputField
                          type="password"
                          defaultValue="12345"
                          placeholder="password"
                        />
                      </Input>

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
                    <FormControl
                      isInvalid={false}
                      size={'md'}
                      isDisabled={false}
                      isRequired={true}
                    >
                      <FormControlLabel>
                        <FormControlLabelText>Valor Pago</FormControlLabelText>
                      </FormControlLabel>
                      <Input>
                        <InputField
                          type="password"
                          defaultValue="12345"
                          placeholder="password"
                        />
                      </Input>

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
                    <InputDatePicker
                        title="Data do Pagamento"

                    />
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
                  </>
                );
              }}
            </Formik>
          </Box>
        </Box>
      </ScrollView>
    </Box>
  );
};
export default Create;
