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
  const [haveProducts, setHaveProducts] = React.useState(false);
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
                valor_pago: '',
                status: '',
                itens_compra: [
                  {
                    quantidade: '',
                    preco_unitario: '',
                    subtotal: '',
                    produto: {
                      id: '',
                      nome: '',
                      marca: '',
                      tipo: '',
                      preco: '',
                      data_validade: '',
                    },
                  },
                ],
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
                          type="text"
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
                          type="text"
                          value={values.valor_pago}
                          placeholder="R$ 100,00"
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
                      value={values.data_pagamento}
                      title="Data do Pagamento"
                      onChangeDate={handleChange('data_pagamento')}
                    />
                    <FormControl
                      isInvalid={errors.status ? true : false}
                      size={'md'}
                      isDisabled={false}
                      isRequired={true}
                    >
                      <FormControlLabel>
                        <FormControlLabelText>Status</FormControlLabelText>
                      </FormControlLabel>
                      <Select
                        onValueChange={handleChange('status')}
                        selectedValue={
                          values.status === 'concluido'
                            ? 'Concluido'
                            : values.status === 'pendente'
                              ? 'Pendente'
                              : values.status === 'cancelado'
                                ? 'Cancelado'
                                : ''
                        }
                        isInvalid={errors.status ? true : false}
                        isDisabled={false}
                      >
                        <SelectTrigger size={'lg'} variant={'rounded'}>
                          <SelectInput placeholder="Select option" />
                          <SelectIcon mr={'$3'} ml={0} as={ChevronDownIcon} />
                        </SelectTrigger>
                        <SelectPortal>
                          <SelectBackdrop />
                          <SelectContent>
                            <SelectDragIndicatorWrapper>
                              <SelectDragIndicator />
                            </SelectDragIndicatorWrapper>
                            <SelectItem
                              isPressed={values.status === 'concluido'}
                              label="Concluido"
                              value="concluido"
                            />
                            <SelectItem
                              isPressed={values.status === 'pendente'}
                              label="Pendente"
                              value="pendente"
                            />
                            <SelectItem
                              isPressed={values.status === 'cancelado'}
                              label="Cancelado"
                              value="cancelado"
                            />
                          </SelectContent>
                        </SelectPortal>
                      </Select>

                      <FormControlHelper>
                        <FormControlHelperText>
                          Selecione o status da compra
                        </FormControlHelperText>
                      </FormControlHelper>

                      <FormControlError>
                        <FormControlErrorIcon as={AlertCircleIcon} />
                        <FormControlErrorText>
                          {errors.status}
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
