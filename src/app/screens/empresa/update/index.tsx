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
  Text,
  Center,
  Icon,
  CircleIcon,
  CheckIcon,
  AlertCircleIcon,
  ChevronDownIcon,
  Box,
  ScrollView,
  ButtonIcon,
  RemoveIcon,
  AddIcon,
  CalendarDaysIcon,
} from '@gluestack-ui/themed';
import { Formik } from 'formik';
import { AtualizarClienteScreen } from '@/interfaces/cliente';
import { TrashIcon } from '@gluestack-ui/themed';
const Update: React.FC<AtualizarClienteScreen> = ({ navigation, route }) => {
  return (
    <Box w="$full" h="$full">
      <ScrollView w="$full">
        <Box px="$8" py="$5">
          <Box w="$full" alignItems="center">
            <Text size="3xl">Atualizar Empresa</Text>
          </Box>
          <Box>
            <Formik
              initialValues={{
                id: '',
                id_pessoa: '',
                nome: '',
                data_nascimento: new Date(),
                cpf: '',
                cnpj: '',
                nome_fantasia: '',
                razao_social: '',
                ramo: {
                  id: '',
                  nome: '',
                },
                telefones: [
                  {
                    numero: '',
                  },
                ],
                endereco: {
                  cep: '',
                  rua: '',
                  numero: '',
                  complemento: '',
                  bairro: '',
                  cidade: '',
                  uf: '',
                },
                email: [
                  {
                    endereco: '',
                  },
                ],
                limite: '',
              }}
              onSubmit={() => {}}
            >
              {({ handleChange, setFieldValue, values, errors }) => {
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
                          placeholder="Nome Completo do Clinente"
                          onChangeText={handleChange('nome')}
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
                          {errors.nome}
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
                          Nome Fantasia
                        </FormControlLabelText>
                      </FormControlLabel>
                      <Input>
                        <InputField
                          type="text"
                          placeholder="Nome Completo do Clinente"
                          onChangeText={handleChange('nome')}
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
                          {errors.nome_fantasia}
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
                          Razao Social
                        </FormControlLabelText>
                      </FormControlLabel>
                      <Input>
                        <InputField
                          type="text"
                          placeholder="Nome Completo do Clinente"
                          onChangeText={handleChange('nome')}
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
                          {errors.razao_social}
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
                          Data de nascimento
                        </FormControlLabelText>
                      </FormControlLabel>
                      <Input isReadOnly={true}>
                        <InputField
                          type="text"
                          value={values.data_nascimento.toLocaleDateString(
                            'PT-BR',
                          )}
                          placeholder="password"
                        />
                        <Button>
                          <ButtonIcon as={CalendarDaysIcon} />
                        </Button>
                      </Input>

                      <FormControlHelper>
                        <FormControlHelperText>
                          Must be atleast 6 characters.
                        </FormControlHelperText>
                      </FormControlHelper>

                      <FormControlError>
                        <FormControlErrorIcon as={AlertCircleIcon} />
                        <FormControlErrorText>
                          {errors.data_nascimento}
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
                        <FormControlLabelText>CPF</FormControlLabelText>
                      </FormControlLabel>
                      <Input>
                        <InputField
                          type="text"
                          value={values.cpf}
                          placeholder="123.123.123.12"
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
                          {errors.cpf}
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
                        <FormControlLabelText>CNPJ</FormControlLabelText>
                      </FormControlLabel>
                      <Input>
                        <InputField
                          type="text"
                          value={values.cpf}
                          placeholder="123.123.123.12"
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
                          {errors.cnpj}
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
                        <FormControlLabelText>Cep</FormControlLabelText>
                      </FormControlLabel>
                      <Input>
                        <InputField type="text" placeholder="password" />
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
                        <FormControlLabelText>Rua</FormControlLabelText>
                      </FormControlLabel>
                      <Input>
                        <InputField type="text" placeholder="password" />
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
                        <FormControlLabelText>Numero</FormControlLabelText>
                      </FormControlLabel>
                      <Input>
                        <InputField type="text" placeholder="password" />
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
                        <FormControlLabelText>Complemento</FormControlLabelText>
                      </FormControlLabel>
                      <Input>
                        <InputField type="text" placeholder="password" />
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
                        <FormControlLabelText>Bairro</FormControlLabelText>
                      </FormControlLabel>
                      <Input>
                        <InputField type="text" placeholder="password" />
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
                        <FormControlLabelText>Cidade</FormControlLabelText>
                      </FormControlLabel>
                      <Input>
                        <InputField type="text" placeholder="password" />
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
                        <FormControlLabelText>UF</FormControlLabelText>
                      </FormControlLabel>
                      <Select isInvalid={false} isDisabled={false}>
                        <SelectTrigger size={'md'} variant={'rounded'}>
                          <SelectInput placeholder="Selecione uma UF" />
                          <SelectIcon mr={'$3'} ml={0} as={ChevronDownIcon} />
                        </SelectTrigger>
                        <SelectPortal>
                          <SelectBackdrop />
                          <SelectContent>
                            <SelectDragIndicatorWrapper>
                              <SelectDragIndicator />
                            </SelectDragIndicatorWrapper>
                            <SelectItem
                              label="UX Research"
                              value="UX Research"
                            />
                            <SelectItem
                              label="Web Development"
                              value="Web Development"
                            />
                            <SelectItem
                              label="Cross Platform Development Process"
                              value="Cross Platform Development Process"
                            />
                            <SelectItem
                              label="UI Designing"
                              value="UI Designing"
                              isDisabled={true}
                            />
                            <SelectItem
                              label="Backend Development"
                              value="Backend Development"
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
                    <Box gap="$2.5">
                      <FormControl
                        isInvalid={false}
                        size={'md'}
                        isDisabled={false}
                        isRequired={true}
                      >
                        <FormControlLabel>
                          <FormControlLabelText>Telefone</FormControlLabelText>
                        </FormControlLabel>
                        <Input>
                          <InputField type="text" placeholder="password" />
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
                      <Button action="negative">
                        <ButtonIcon as={TrashIcon} />
                      </Button>
                      <Button action="positive">
                        <ButtonIcon as={AddIcon} />
                      </Button>
                      <Button action="negative">
                        <ButtonIcon as={RemoveIcon} />
                      </Button>
                    </Box>

                    <Box gap="$2.5">
                      <FormControl
                        isInvalid={false}
                        size={'md'}
                        isDisabled={false}
                        isRequired={true}
                      >
                        <FormControlLabel>
                          <FormControlLabelText>Email</FormControlLabelText>
                        </FormControlLabel>
                        <Input>
                          <InputField type="text" placeholder="password" />
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
                      <Button action="negative">
                        <ButtonIcon as={TrashIcon} />
                      </Button>
                      <Button action="positive">
                        <ButtonIcon as={AddIcon} />
                      </Button>
                      <Button action="negative">
                        <ButtonIcon as={RemoveIcon} />
                      </Button>
                    </Box>

                    <Box>
                      <Button>
                        <ButtonText>Atualizar</ButtonText>
                      </Button>
                    </Box>
                  </Box>
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
