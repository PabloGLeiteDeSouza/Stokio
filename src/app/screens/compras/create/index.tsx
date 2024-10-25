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
import { CadastrarCompraScreen } from '@/interfaces/compra';
const Create: React.FC<CadastrarCompraScreen> = ({ navigation }) => {
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
                status: '',
                empresa: {
                  id: Number(null),
                  nome: '',
                },
                itens_compra: [
                  {
                    quantidade: Number(null),
                    preco_unitario: '',
                    produto: {
                      id: Number(null),
                      nome: '',
                      marca: '',
                      tipo: '',
                      preco: '',
                      data_validade: new Date(),
                      quantidade: Number(null),
                    },
                  },
                ],
              }}
              onSubmit={() => {}}
            >
              {({ values, errors, handleChange, setFieldValue, handleSubmit }) => {
                return (
                  <>
                    <Button
                      onPress={() => {
                        navigation?.navigate('screens-produtos');
                      }}
                    >
                      <ButtonText>Cadastrar produto</ButtonText>
                    </Button>
                    <InputDatePicker
                      onChangeDate={(data) => setFieldValue('data', data)}
                      value={values.data}
                      title="Data da Compra"
                      error={errors.data}
                    />
                    <Box>
                      <Heading>Valor Total</Heading>
                      <Text>{values.itens_compra.map((vld) => Number(vld.preco_unitario) * Number(vld.quantidade)).reduce((acumulador, valorAtual) => acumulador + valorAtual)}</Text>
                    </Box>
                    {}
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
