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
import { Box, ScrollView, Text } from '@gluestack-ui/themed';
import { Formik } from 'formik';
import ModalSelectEmpresa from '@/components/Custom/Modal/SelectEmpresa';
const Create: React.FC = () => {
  return (
    <Box mt="$5" mx="$8">
      <ScrollView>
        <Box>
          <Text>Cadastre o Produto abaixo</Text>
        </Box>
        <Box>
          <Formik
            initialValues={{
              codigo_de_barras: '',
              nome: '',
              descricao: '',
              data_de_validade: new Date(),
              valor: '',
              quantidade: '',
              tamanho: '',
              id_marca: '',
              id_tipo_de_produto: '',
              id_unidade_de_medida: '',
              id_unidade_de_armazenamento: '',
            }}
            onSubmit={() => {}}
          >
            {({ values, handleChange, setFieldValue }) => {
              return (
                <>
                  <ModalSelectEmpresa onChangeEmpresa={() => {}} />
                  <FormControl
                    isInvalid={false}
                    size={'md'}
                    isDisabled={false}
                    isRequired={true}
                  >
                    <FormControlLabel>
                      <FormControlLabelText>
                        Código de barras
                      </FormControlLabelText>
                    </FormControlLabel>
                    <Input>
                      <InputField
                        type="text"
                        value={values.codigo_de_barras}
                        placeholder="password"
                        onChangeText={handleChange('codigo_de_barras')}
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
                      <FormControlLabelText>Nome</FormControlLabelText>
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
                      <FormControlLabelText>Descrição</FormControlLabelText>
                    </FormControlLabel>
                    <Textarea>
                      <TextareaInput
                        type="text"
                        value={values.descricao}
                        placeholder="Descrição"
                        onChangeText={handleChange('descricao')}
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
                  <FormControl
                    isInvalid={false}
                    size={'md'}
                    isDisabled={false}
                    isRequired={true}
                  >
                    <FormControlLabel>
                      <FormControlLabelText>Password</FormControlLabelText>
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
                      <FormControlLabelText>Password</FormControlLabelText>
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
                </>
              );
            }}
          </Formik>
        </Box>
      </ScrollView>
    </Box>
  );
};
export default Create;
