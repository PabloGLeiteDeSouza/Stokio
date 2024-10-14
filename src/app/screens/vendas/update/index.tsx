import { AtualizarVendaScreen } from '@/interfaces/venda';
import React, { useState } from 'react';
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
  Center,
  Icon,
  CircleIcon,
  CheckIcon,
  AlertCircleIcon,
  ChevronDownIcon,
  Card,
} from '@gluestack-ui/themed';
import { Box, Heading, ScrollView, Text } from '@gluestack-ui/themed';
import { Formik } from 'formik';
import InputDatePicker from '@/components/Custom/Inputs/DatePicker';
const Update: React.FC<AtualizarVendaScreen> = ({ navigation, route }) => {
  if (!route || !route.params || !route.params.id) {
    navigation?.goBack();
    return null;
  }
  const [isLoading, setIsLoading] = React.useState(true);



  return (
    <Box w="$full" h="$full">
      <ScrollView>
        <Box p="$8">
          <Box mb="$8">
            <Heading textAlign="center" size="2xl">
              Cadastrar Venda
            </Heading>
          </Box>
          <Box gap="$8">
            <Formik
              initialValues={{
                produtos: [
                  {
                    id: '',
                    nome: '',
                    marca: '',
                    tipoProduto: '',
                    valor: '',
                    quantidade: '',
                  },
                ],
                cliente: {
                  id: '',
                  nome: '',
                  cpf: '',
                },
                valor: '',
                data_venda: new Date(),
                data_atualizacao: new Date(),
                status: '' as 'pago' | 'devendo',
              }}
              onSubmit={() => {}}
            >
              {({ values, errors, handleChange, handleSubmit }) => {
                return (
                  <>
                    <InputDatePicker
                      onChangeDate={handleChange('data_venda')}
                      title="Data da Venda"
                      value={values.data_venda}
                    />

                    <InputDatePicker
                      onChangeDate={handleChange('data_atualizacao')}
                      title="Data da Atualizacao"
                      value={values.data_venda}
                    />

                    <FormControl
                      isInvalid={false}
                      size={'md'}
                      isDisabled={false}
                      isRequired={true}
                    >
                      <FormControlLabel>
                        <FormControlLabelText>Valor</FormControlLabelText>
                      </FormControlLabel>
                      <Input>
                        <InputField
                          editable={false}
                          type="text"
                          value={values.valor}
                          placeholder="120,00"
                        />
                      </Input>

                      <FormControlHelper>
                        <FormControlHelperText>
                          Valor da compra.
                        </FormControlHelperText>
                      </FormControlHelper>

                      <FormControlError>
                        <FormControlErrorIcon as={AlertCircleIcon} />
                        <FormControlErrorText>
                          {errors.valor}
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
                        <FormControlLabelText>
                          Selecione o status da venda
                        </FormControlLabelText>
                      </FormControlLabel>
                      <Select
                        onValueChange={handleChange('status')}
                        selectedValue={
                          values.status === 'pago'
                            ? 'Pago'
                            : values.status === 'devendo'
                              ? 'Devendo'
                              : ''
                        }
                        isInvalid={false}
                        isDisabled={false}
                      >
                        <SelectTrigger size={'lg'} variant={'rounded'}>
                          <SelectInput placeholder="Selecione um status" />
                          <SelectIcon mr={'$3'} ml={0} as={ChevronDownIcon} />
                        </SelectTrigger>
                        <SelectPortal>
                          <SelectBackdrop />
                          <SelectContent>
                            <SelectDragIndicatorWrapper>
                              <SelectDragIndicator />
                            </SelectDragIndicatorWrapper>
                            <SelectItem
                              label="Devendo"
                              value="devendo"
                              isPressed={values.status === 'devendo'}
                            />
                            <SelectItem
                              label="Pago"
                              value="pago"
                              isPressed={values.status === 'pago'}
                            />
                          </SelectContent>
                        </SelectPortal>
                      </Select>

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
                      <Button>
                        <ButtonText>Atualizar Venda</ButtonText>
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
export default Update;
