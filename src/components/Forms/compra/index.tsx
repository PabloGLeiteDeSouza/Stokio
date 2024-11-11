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
import React from 'react';
import { validationSchema } from './validation';
import { Card } from '@gluestack-ui/themed';
const FormCreateProduto: React.FC = () => {
    const [is] = React.useState();
  return (
    <>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          codigo_de_barras: '',
          nome: '',
          descricao: '',
          data_de_validade: new Date(),
          valor: '',
          quantidade: '0',
          tamanho: '',
          marca: {
            id: Number(null),
            nome: '',
          },
          tipo_produto: {
            id: Number(null),
            nome: '',
          },
          unidade_de_medida: {
            id: Number(null),
            nome: '',
            valor: '',
          },
          unidade_de_armazenamento: {
            id: Number(null),
            nome: '',
          },
          empresa: {
            id: Number(null),
            nome_fantaisa: '',
            razao_social: '',
            cnpj: '',
            cpf: '',
          },
        }}
        onSubmit={() => {}}
      >
        {({ values, errors, handleChange, setFieldValue }) => {
          React.useEffect(() => {
            if (code) {
              setFieldValue('codigo_de_barras', code);
            }
          }, [code]);
          React.useEffect(() => {
            if (empresa) {
              setFieldValue('empresa', empresa);
            }
          }, [empresa]);
          React.useEffect(() => {
            if (marca) {
              setFieldValue('marca.id', marca.id);
              setFieldValue('marca.nome', marca.nome);
            }
          }, [marca]);
          React.useEffect(() => {
            if (tipo_produto) {
              setFieldValue('tipo_produto', tipo_produto);
            }
          }, [tipo_produto]);
          React.useEffect(() => {
            if (um) {
              setFieldValue('unidade_de_medida', um);
            }
          }, [um]);
          React.useEffect(() => {
            if (ua) {
              setFieldValue('unidade_de_armazenamento', ua);
            }
          }, [ua]);
          return (
            <>
              <Box>
                <Heading textAlign="center">Empresa Responsável</Heading>
              </Box>
              {values.empresa.id != 0 && (
                <>
                  <Card>
                    <Box gap="$5">
                      <Heading size="lg">Dados da Empresa</Heading>
                      <Box>
                        <Text>Nome da Fantasia</Text>
                        <Text>{values.empresa.nome_fantaisa}</Text>
                      </Box>
                      <Box>
                        <Text>Razao Social</Text>
                        <Text></Text>
                      </Box>
                      {values.empresa.cnpj !== '' && (
                        <Box>
                          <Text>CNPJ</Text>
                          <Text>{values.empresa.cnpj}</Text>
                        </Box>
                      )}
                      {values.empresa.cnpj === '' && (
                        <Box>
                          <Text>CPF</Text>
                          <Text>{values.empresa.cpf}</Text>
                        </Box>
                      )}
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
                <Box>
                  <Button
                    onPress={() => {
                        onSelectEmpresa(values.empresa);
                    }}
                  >
                    <ButtonText>Selecionar empresa</ButtonText>
                  </Button>
                </Box>
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
              <Box>
                <Button
                  onPress={() => {
                    onCreateEmpresa()
                  }}
                >
                  <ButtonText>Cadastrar Empresa</ButtonText>
                </Button>
              </Box>
              <Box>
                <Heading textAlign="center">Marca do Produto</Heading>
              </Box>
              {values.marca.id !== 0 && (
                <Box>
                  <Card>
                    <HStack>
                      <VStack gap="$5">
                        <Box>
                          <Heading>Maarca Selecionada:</Heading>
                        </Box>
                        <Box>
                          <Text>{values.marca.nome}</Text>
                        </Box>
                      </VStack>
                    </HStack>
                  </Card>
                </Box>
              )}
              <Box gap="$5">
                <Button
                  onPress={() => {
                    onSelectMarca(values.marca);
                  }}
                >
                  <ButtonText>
                    {values.marca.id !== 0
                      ? 'Atualizar Marca'
                      : 'Selecionar Marca'}
                  </ButtonText>
                </Button>
                <Box>
                    {!isNewMarca && (
                        <>
                            <Button onPress={() => setIsNewMarca(true)}>
                            <ButtonText>Cadastrar Marca</ButtonText>
                            </Button>
                        </>
                    )}
                </Box>

              {isNewMarca || values.marca.id === 0 && (
                <FormControl
                  isInvalid={errors.marca?.nome ? true : false}
                  size={'md'}
                  isDisabled={false}
                  isRequired={true}
                >
                  <FormControlLabel>
                    <FormControlLabelText>Marca</FormControlLabelText>
                  </FormControlLabel>
                  <Input>
                    <InputField
                      type="text"
                      value={values.marca.nome}
                      placeholder="marca"
                      onChangeText={handleChange('marca.nome')}
                    />
                  </Input>

                  <FormControlHelper>
                    <FormControlHelperText>
                      Informe o nome da marca.
                    </FormControlHelperText>
                  </FormControlHelper>

                  <FormControlError>
                    <FormControlErrorIcon as={AlertCircleIcon} />
                    <FormControlErrorText>
                      {errors.marca?.nome}
                    </FormControlErrorText>
                  </FormControlError>
                </FormControl>
              )}
              <Box>
                <Heading textAlign="center">Tipo do Produto</Heading>
              </Box>

              {haveTipoProduto && (
                <Box>
                  {values.tipo_produto.id !== 0 && (
                    <>
                      <Card>
                        <HStack>
                          <VStack gap="$5">
                            <Box>
                              <Heading>Tipo do Produto Selecionado:</Heading>
                            </Box>
                            <Box>
                              <Text>{values.tipo_produto.nome}</Text>
                            </Box>
                          </VStack>
                        </HStack>
                      </Card>
                    </>
                  )}
                  <Box>
                    <Button
                      onPress={() => {
                        navigation?.navigate('selecionar-tipo-produto', {
                          screen: 'cadastrar-produto',
                          tipoProdutoSelecionado: values.tipo_produto,
                        });
                      }}
                    >
                      <ButtonText>
                        {values.tipo_produto.id !== 0
                          ? 'Atualizar Tipo do Produto'
                          : 'Selecionar Tipo do Produto'}
                      </ButtonText>
                    </Button>
                  </Box>
                </Box>
              )}
              {!isNewTipoProduto && (
                <Box gap="$5">
                  <Button onPress={() => setIsNewTipoProduto(true)}>
                    <ButtonText>Cadastrar Tipo de Produto</ButtonText>
                  </Button>
                </Box>
              )}
              {isNewTipoProduto && (
                <Box>
                  <FormControl
                    isInvalid={errors.tipo_produto?.nome ? true : false}
                    size={'md'}
                    isDisabled={false}
                    isRequired={true}
                  >
                    <FormControlLabel>
                      <FormControlLabelText>
                        Tipo de Produto
                      </FormControlLabelText>
                    </FormControlLabel>
                    <Input>
                      <InputField
                        type="text"
                        value={values.tipo_produto.nome}
                        placeholder="Desodorante Roll'on"
                        onChangeText={handleChange('tipo_produto.nome')}
                      />
                    </Input>

                    <FormControlHelper>
                      <FormControlHelperText>
                        Informe o nome do tipo de produto.
                      </FormControlHelperText>
                    </FormControlHelper>

                    <FormControlError>
                      <FormControlErrorIcon as={AlertCircleIcon} />
                      <FormControlErrorText>
                        {errors.tipo_produto?.nome}
                      </FormControlErrorText>
                    </FormControlError>
                  </FormControl>
                </Box>
              )}
              <Box>
                <Heading textAlign="center">Unidade de Medida</Heading>
              </Box>
              {values.unidade_de_medida.id !== 0 && isHaveUnidadeDeMedida && (
                <Box>
                  <Card>
                    <HStack>
                      <VStack gap="$5">
                        <Box>
                          <Heading>Unidade de medida Selecionada:</Heading>
                        </Box>
                        <Box>
                          <Text>{values.unidade_de_medida.nome}</Text>
                          <Text>{values.unidade_de_medida.valor}</Text>
                        </Box>
                      </VStack>
                    </HStack>
                  </Card>
                </Box>
              )}
              {isHaveUnidadeDeMedida && (
                <Box gap="$5">
                  <Button
                    onPress={() => {
                      navigation?.navigate('selecionar-um', {
                        screen: 'cadastrar-produto',
                        umSelecionado: values.unidade_de_medida,
                      });
                    }}
                  >
                    <ButtonText>
                      {values.unidade_de_medida.id !== 0
                        ? 'Atualizar Unidade de Medida'
                        : 'Selecionar Unidade de Medida'}
                    </ButtonText>
                  </Button>
                  <Button onPress={() => setIsNewUnidadeDeMedida(true)}>
                    <ButtonText>Cadastrar Unidade de Medida</ButtonText>
                  </Button>
                </Box>
              )}

              {isNewUnidadeDeMedida && (
                <Box gap="$5">
                  <FormControl
                    isInvalid={errors.unidade_de_medida?.nome ? true : false}
                    size={'md'}
                    isDisabled={false}
                    isRequired={true}
                  >
                    <FormControlLabel>
                      <FormControlLabelText>
                        Nome Unidade De Medida
                      </FormControlLabelText>
                    </FormControlLabel>
                    <Input>
                      <InputField
                        type="text"
                        value={values.unidade_de_medida.nome}
                        onChangeText={handleChange('unidade_de_medida.nome')}
                        placeholder="Nome"
                      />
                    </Input>

                    <FormControlHelper>
                      <FormControlHelperText>
                        Infome a o nome da unidade de medida.
                      </FormControlHelperText>
                    </FormControlHelper>

                    <FormControlError>
                      <FormControlErrorIcon as={AlertCircleIcon} />
                      <FormControlErrorText>
                        {errors.unidade_de_medida?.nome}
                      </FormControlErrorText>
                    </FormControlError>
                  </FormControl>
                  <FormControl
                    isInvalid={errors.unidade_de_medida?.valor ? true : false}
                    size={'md'}
                    isDisabled={false}
                    isRequired={true}
                  >
                    <FormControlLabel>
                      <FormControlLabelText>
                        Valor da unidade de medida
                      </FormControlLabelText>
                    </FormControlLabel>
                    <Input>
                      <InputField
                        type="text"
                        value={values.unidade_de_medida.valor}
                        placeholder="cm"
                        onChangeText={handleChange('unidade_de_medida.valor')}
                      />
                    </Input>

                    <FormControlHelper>
                      <FormControlHelperText>
                        Informe o Valor da unidade de medida exemplo
                        cm/centrimetros.
                      </FormControlHelperText>
                    </FormControlHelper>

                    <FormControlError>
                      <FormControlErrorIcon as={AlertCircleIcon} />
                      <FormControlErrorText>
                        Atleast 6 characters are required.
                      </FormControlErrorText>
                    </FormControlError>
                  </FormControl>
                </Box>
              )}

              <Box>
                <Heading textAlign="center">Unidade de Armazenamento</Heading>
              </Box>
              {values.unidade_de_armazenamento.id !== 0 && (
                <Box>
                  <Card>
                    <HStack>
                      <VStack gap="$5">
                        <Box>
                          <Heading>
                            Unidade de Armazenamento Selecionado:
                          </Heading>
                        </Box>
                        <Box>
                          <Text>{values.unidade_de_armazenamento.nome}</Text>
                        </Box>
                      </VStack>
                    </HStack>
                  </Card>
                </Box>
              )}

              <Box gap="$5">
                <Button
                  onPress={() => {
                    navigation?.navigate('selecionar-ua', {
                      screen: 'cadastrar-produto',
                      uaSelecionada: values.unidade_de_armazenamento,
                    });
                  }}
                >
                  <ButtonText>
                    {values.marca.id !== 0
                      ? 'Atualizar Unidade de Armazenamento'
                      : 'Selecionar Unidade de Armazenamento'}
                  </ButtonText>
                </Button>
              </Box>

              <Box gap="$5">
                <Button
                  onPress={() => {
                    navigation?.navigate('screens-uas');
                  }}
                >
                  <ButtonText>Cadastrar Unidade de Armazenamento</ButtonText>
                </Button>
              </Box>

              <InputDatePicker
                value={values.data_de_validade}
                title="Data de Válidade"
                onChangeDate={(data) => setFieldValue('data_validade', data)}
              />
              <FormControl
                isInvalid={false}
                size={'md'}
                isDisabled={false}
                isRequired={true}
              >
                <FormControlLabel>
                  <FormControlLabelText>Código de barras</FormControlLabelText>
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
                    value={values.nome}
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
              <InputText
                title="Valor"
                inputType="money"
                error={errors.valor}
                value={values.valor}
                onChangeValue={handleChange('valor')}
                isInvalid={errors.valor ? true : false}
                size="md"
              />
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
                    value={values.tamanho.toString()}
                    placeholder="100"
                    onChangeText={handleChange('tamanho')}
                    keyboardType="number-pad"
                  />
                  {values.unidade_de_medida.valor && (
                    <Box
                      h="$full"
                      justifyContent="center"
                      px="$5"
                      $light-bgColor="$blueGray700"
                      $dark-bgColor="$blueGray300"
                    >
                      <Text $light-color="$white" $dark-color="$black">
                        {values.unidade_de_medida.valor}
                      </Text>
                    </Box>
                  )}
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
                  <ButtonText>Cadastrar Produto</ButtonText>
                </Button>
              </Box>
            </>
          );
        }}
      </Formik>
    </>
  );
};
