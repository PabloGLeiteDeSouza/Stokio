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
  Card,
  ButtonIcon,
} from '@gluestack-ui/themed';
import { Box, ScrollView, Text } from '@gluestack-ui/themed';
import { Formik } from 'formik';
import ModalSelectEmpresa from '@/components/Custom/Modals/SelectEmpresa';
import { FontAwesome6 } from '@expo/vector-icons';
import { CadastrarProdutoScreen } from '@/interfaces/produto';
import * as Yup from 'yup';
import { Alert } from 'react-native';
import InputDatePicker from '@/components/Custom/Inputs/DatePicker';
const validationSchema = Yup.object().shape({
  codigo_de_barras: Yup.string().required('O código de barras é obrigatório'),
  nome: Yup.string().required('O nome é obrigatório'),
  descricao: Yup.string().required('A descrição é obrigatória'),
  preco: Yup.number().required('O preço é obrigatório'),
  data_de_validade: Yup.date().required('A data de válidade é obrigatória'),
  tipo_produto: Yup.object().shape({
    id: Yup.number().required('O tipo de produto é obrigatório'),
    nome: Yup.string().required('O nome é obrigatório'),
  }),
  marca: Yup.object().shape({
    id: Yup.number().required('A marca é obrigatória'),
    nome: Yup.string().required('O nome é obrigatório'),
  }),
  quantidade: Yup.number().required('A quantidade é obrigatória'),
  unidade_de_medida: Yup.object().shape({
    id: Yup.number().required('A unidade de medida é obrigatória'),
    nome: Yup.string().required('O nome é obrigatório'),
  }),
  tamanho: Yup.number().required('O tamanho é obrigatório'),
  unidade_de_armazenamento: Yup.object().shape({
    id: Yup.number().required('A unidade de armazenamento é obrigatório'),
    nome: Yup.string().required('O nome é obrigatório'),
  }),
});
const Create: React.FC<CadastrarProdutoScreen> = ({ navigation, route }) => {
  return (
    <Box mx="$2">
      <ScrollView>
        <Box mt="$5" mx="$8">
          <Box mb="$8">
            <Heading textAlign="center" size="xl">
              Cadastre o Produto abaixo
            </Heading>
          </Box>
          <Box gap="$8" mb="$10">
            <Formik
              validationSchema={validationSchema}
              initialValues={{
                codigo_de_barras: '',
                nome: '',
                descricao: '',
                data_de_validade: new Date(),
                valor: '',
                quantidade: '',
                tamanho: '',
                marca: {
                  id: '',
                  nome: '',
                },
                tipo_produto: {
                  id: '',
                  nome: '',
                },
                unidade_de_medida: {
                  id: '',
                  nome: '',
                },
                unidade_de_armazenamento: {
                  id: '',
                  nome: '',
                },
                empresa: {
                  id: '',
                  nome: '',
                },
              }}
              onSubmit={() => {}}
            >
              {({ values, errors, handleChange, setFieldValue }) => {
                React.useEffect(() => {
                  if (route && route.params?.code) {
                    setFieldValue('codigo_de_barras', route.params.code);
                  }
                }, [route]);
                return (
                  <>
                    {values.empresa.id != '' && (
                      <>
                        <Card>
                          <Heading size="lg">Dados da Empresa</Heading>
                          <Box>
                            <Text>Nome da Empresa: {values.empresa.nome}</Text>
                          </Box>
                        </Card>
                      </>
                    )}
                    <FormControl
                      isInvalid={false}
                      size={'md'}
                      isDisabled={false}
                      isRequired={true}
                    >
                      <ModalSelectEmpresa
                        onChangeEmpresa={(emp) => {
                          setFieldValue('empresa.nome', emp.nome_fantasia);
                          setFieldValue('empresa.id', emp.id);
                        }}
                      />

                      <FormControlHelper>
                        <FormControlHelperText>
                          Você deve selecionar a empresa.
                        </FormControlHelperText>
                      </FormControlHelper>

                      <FormControlError>
                        <FormControlErrorIcon as={AlertCircleIcon} />
                        <FormControlErrorText>
                          {errors.empresa?.id}
                        </FormControlErrorText>
                      </FormControlError>
                    </FormControl>
                    <InputDatePicker
                      value={values.data_de_validade}
                      title="Data de Válidade"
                      onChangeDate={handleChange('data_de_validade')}
                    />
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
                          placeholder="2132142343232"
                          keyboardType="number-pad"
                          onChangeText={handleChange('codigo_de_barras')}
                        />
                        <Button
                          onPress={() =>
                            navigation?.navigate('code-scanner', {
                              screen: 'cadastrar-produto',
                            })
                          }
                        >
                          <ButtonIcon
                            as={(props: object) => (
                              <FontAwesome6 name="barcode" {...props} />
                            )}
                          />
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
                          type="text"
                          onChangeText={handleChange('nome')}
                          placeholder="Nome do produto"
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
                        <FormControlLabelText>Valor</FormControlLabelText>
                      </FormControlLabel>
                      <Input>
                        <Box
                          h="$full"
                          justifyContent="center"
                          alignItems="center"
                          px="$5"
                          $dark-bgColor="$blueGray400"
                          $light-bgColor="$blueGray600"
                        >
                          <Text $light-color="$white" $dark-color="$black" >R$</Text>
                        </Box>
                        <InputField
                          type="text"
                          value={values.valor}
                          placeholder="25.99"
                          onChangeText={handleChange('valor')}
                          keyboardType="number-pad"
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
                        <FormControlLabelText>Quantidade</FormControlLabelText>
                      </FormControlLabel>
                      <Input>
                        <InputField
                          type="text"
                          value={values.quantidade}
                          placeholder="500"
                          onChangeText={handleChange('quantidade')}
                          keyboardType="number-pad"
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
                        <FormControlLabelText>Tamanho</FormControlLabelText>
                      </FormControlLabel>
                      <Input>
                        <InputField
                          type="text"
                          value={values.tamanho}
                          placeholder="100"
                          onChangeText={handleChange('tamanho')}
                          keyboardType="number-pad"
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
                    <Box>
                      <Button>
                        <ButtonText>
                          Cadastrar Produto
                        </ButtonText>
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
