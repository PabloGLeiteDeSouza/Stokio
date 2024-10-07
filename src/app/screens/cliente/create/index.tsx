import { AddIcon, Card, Heading, RemoveIcon } from '@gluestack-ui/themed';
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
  Center,
  Icon,
  CircleIcon,
  CheckIcon,
  AlertCircleIcon,
  ChevronDownIcon,
  ButtonIcon,
} from '@gluestack-ui/themed';
import { Box, Text } from '@gluestack-ui/themed';
import { Formik } from 'formik';
import { CalendarDaysIcon } from '@gluestack-ui/themed';
import { ScrollView } from '@gluestack-ui/themed';
import { TrashIcon } from '@gluestack-ui/themed';
import { CloseIcon } from '@gluestack-ui/themed';
import { Pessoa, PessoaFlatList } from '@/types/screens/cliente';
import { FlatList } from '@gluestack-ui/themed';
import { ListRenderItem } from 'react-native';
const Create: React.FC = () => {
  const [pessoas, setPessoas] = React.useState<Array<Pessoa>>([
    {
      id: 1,
      nome: 'João',
      cpf: '123.123.123-12',
      data_nascimento: '05-20-2000',
    },
    {
      id: 2,
      nome: 'Lucas',
      cpf: '234.234.234-23',
      data_nascimento: '06-15-1999',
    },
  ]);
  const [showModal, setShowModal] = React.useState(false);
  const ref = React.useRef(null);
  const FlastListPessoa = FlatList as PessoaFlatList;

  return (
    <Box w="$full" h="$full">
      <ScrollView w="$full">
        <Box px="$8" py="$5">
          <Box w="$full" alignItems="center">
            <Text size="3xl">Cadastrar Cliente</Text>
          </Box>
          <Box>
            <Formik
              initialValues={{
                id_pessoa: '',
                nome: '',
                data_nascimento: new Date(),
                cpf: '',
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
                const ListRenderPessoa: ListRenderItem<Pessoa> = ({ item }) => {
                  return (
                    <Card>
                      <HStack>
                        <Box>
                          <Checkbox
                            size="md"
                            isInvalid={false}
                            isDisabled={false}
                            value=""
                            onChange={(s) => {
                              if (s) {
                                setFieldValue('id_pessoa', item.id);
                              } else {
                                setFieldValue('id_pessoa', '');
                              }
                            }}
                          >
                            <CheckboxIndicator mr="$2">
                              <CheckboxIcon as={CheckIcon} />
                            </CheckboxIndicator>
                          </Checkbox>
                        </Box>
                        <Box>
                          <Heading>{item.nome}</Heading>
                        </Box>
                        <Box>
                          <Text size="md">{item.cpf}</Text>
                          <Text>{item.data_nascimento}</Text>
                        </Box>
                      </HStack>
                    </Card>
                  );
                };

                return (
                  <Box gap="$5">
                    <FormControl
                      isInvalid={false}
                      size={'md'}
                      isDisabled={false}
                      isRequired={true}
                    >
                      {values.id_pessoa == '' && pessoas.length > 0 ? (
                        <Box>
                          <Box>
                            <Text>Selecione uma pessoa:</Text>
                            <Button onPress={() => setShowModal(true)}>
                              <ButtonText>Selecionar Pessoa</ButtonText>
                            </Button>
                          </Box>
                          <Modal
                            h="$full"
                            size="lg"
                            isOpen={showModal}
                            onClose={() => {
                              setShowModal(false);
                            }}
                            finalFocusRef={ref}
                          >
                            <ModalBackdrop />
                            <ModalContent>
                              <ModalHeader>
                                <Heading size="lg">
                                  Selecione uma pessoa
                                </Heading>
                                <ModalCloseButton>
                                  <Icon as={CloseIcon} />
                                </ModalCloseButton>
                              </ModalHeader>
                              <ScrollView>
                                <ModalBody>
                                  <FlastListPessoa
                                    data={pessoas}
                                    renderItem={ListRenderPessoa}
                                    keyExtractor={(item) => String(item.id)}
                                  />
                                </ModalBody>
                              </ScrollView>
                            </ModalContent>
                          </Modal>
                        </Box>
                      ) : (
                        <></>
                      )}
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
                      <Button action="positive">
                        <ButtonIcon as={AddIcon} />
                      </Button>
                      <Button action="negative">
                        <ButtonIcon as={RemoveIcon} />
                      </Button>
                      <Button action="negative">
                        <ButtonIcon as={TrashIcon} />
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
                      <Button action="positive">
                        <ButtonIcon as={AddIcon} />
                      </Button>
                      <Button action="negative">
                        <ButtonIcon as={RemoveIcon} />
                      </Button>
                      <Button action="negative">
                        <ButtonIcon as={TrashIcon} />
                      </Button>
                    </Box>

                    <FormControl
                      isInvalid={false}
                      size={'md'}
                      isDisabled={false}
                      isRequired={true}
                    >
                      <FormControlLabel>
                        <FormControlLabelText>Limite</FormControlLabelText>
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

                    <Box>
                      <Button>
                        <ButtonText>Cadastrar</ButtonText>
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
export default Create;
