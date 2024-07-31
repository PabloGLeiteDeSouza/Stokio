import { RemoveIcon } from '@gluestack-ui/themed';

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
  ButtonIcon,
} from '@gluestack-ui/themed';
import { ScrollView } from '@gluestack-ui/themed';
import { FontAwesome6 } from '@expo/vector-icons';
import { RootStackParamList } from '$types/index';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useThemeApp } from '$providers/theme';
import { Formik } from 'formik';
import LoadingScreen from '$components/LoadingScreen';
import { UpdateEmpresaDto } from '$classes/empresa/dto/update-empresa.dto';
import { UpdateMarcaDto } from '$classes/marca/dto/update-marca.dto';
import { UpdateCategoriaDto } from '$classes/categoria/dto/update-categoria.dto';
import { UpdateUnidadeDeArmazenamentoDto } from '$classes/ua/dto/update-ua.dto';
import { UpdateUmDto } from '$classes/um/dto/update-um.dto';
import { Empresa } from '$classes/empresa';
import { useSQLiteContext } from 'expo-sqlite';
import { Marca } from '$classes/marca';
import { Categoria } from '$classes/categoria';
import { Um } from '$classes/um';
import { UnidadeDeArmazenamento } from '$classes/ua';
import { Alert } from 'react-native';
type CadastrarProdutosScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'cadastrar-produtos'
>;
type CadastrarProdutosScreennRouteProp = RouteProp<
  RootStackParamList,
  'cadastrar-produtos'
>;
interface CadastrarProdutosScreenProps {
  navigation?: CadastrarProdutosScreenNavigationProp;
  route?: CadastrarProdutosScreennRouteProp;
}
type CadastrarProdutosAction = {
  type:
    | 'alt_edt_qtd_unidades'
    | 'alt_codigo'
    | 'alt_nome'
    | 'tipo_produto'
    | 'alt_unidades'
    | 'alt_quantidade'
    | 'alt_tipo_quantidade'
    | 'alt_valor'
    | 'alt_empresa'
    | 'alt_categoria';
  qtd_unidades_is_edt?: boolean;
  codigo?: string;
  nome?: string;
  tipo?: string;
  unidades?: number;
  quantidade?: number;
  tipo_quantidade?: string;
  valor?: string;
  empresa?: number;
  categoria?: number;
};
type CadastrarProdutosState = {
  qtd_unidades_is_edt: boolean;
  codigo: string;
  nome: string;
  tipo: string;
  unidades: number;
  quantidade: number;
  tipo_quantidade: string;
  valor: string;
  empresa: number;
  categoria: number;
};

type DadosDB = {
  empresas: Array<UpdateEmpresaDto | unknown>;
  marcas: Array<UpdateMarcaDto | unknown>;
  categorias: Array<UpdateCategoriaDto | unknown>;
  unidades_de_medida: Array<UpdateUmDto | unknown>;
  unidades_de_armazenamento: Array<UpdateUnidadeDeArmazenamentoDto | unknown>;
  tipo_produto: Array<>;
};

const Create: React.FC<CadastrarProdutosScreenProps> = ({
  navigation,
  route,
}) => {
  const teste = [
    { id: 25, name: 'Natura' },
    { id: 50, name: 'Boticário' },
    { id: 155, name: 'WesleyRoupasLTDA' },
  ];

  const db = useSQLiteContext();

  const [verifyExists, setVerifyExists] = React.useState({
    empresa: false,
    marca: false,
    categoria: false,
    unidade_de_medida: false,
    unidade_de_armazenamento: false,
  });

  const [isLoading, setIsLoading] = React.useState(true);

  const [quantidade, setQauntidade] = React.useState<number>(0);
  const [dadosdb, setDadosdb] = React.useState<DadosDB>({
    empresas: [],
    marcas: [],
    categorias: [],
    unidades_de_medida: [],
    unidades_de_armazenamento: [],
    tipo_produto: [],
  });
  const { theme } = useThemeApp();

  React.useEffect(() => {
    const load = async () => {
      try {
        const dados_empresas = await new Empresa(db).findAll();
        if (dados_empresas) {
          setVerifyExists({
            ...verifyExists,
            empresa: true,
          });
        }
        const dados_marcas = await new Marca(db).findAll();
        if (dados_marcas) {
          setVerifyExists({
            ...verifyExists,
            marca: true,
          });
        }
        const dados_categorias = await new Categoria(db).findAll();
        if (dados_categorias) {
          setVerifyExists({
            ...verifyExists,
            categoria: true,
          });
        }
        const dados_unidades_de_medida = await new Um(db).findAll();
        if (dados_unidades_de_medida) {
          setVerifyExists({
            ...verifyExists,
            unidade_de_medida: true,
          });
        }
        const dados_unidades_de_armazenamento =
          await new UnidadeDeArmazenamento(db).findAll();
        if (dados_unidades_de_armazenamento) {
          setVerifyExists({
            ...verifyExists,
            unidade_de_armazenamento: true,
          });
        }
        setDadosdb({
          empresas: dados_empresas,
          marcas: dados_marcas,
          categorias: dados_categorias,
          unidades_de_medida: dados_unidades_de_medida,
          unidades_de_armazenamento: dados_unidades_de_armazenamento,
        });
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        Alert.alert('Erro', (error as Error).message);
        setIsLoading(false);
      }
    };
    load();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!verifyExists.categoria) {
    return (
      <Box h="$full" w="$full" alignItems="center" justifyContent="center">
        <Box>
          <Text>Não há categorias cadastradas.</Text>
          <Text>Cadastre uma antes de cadastrar um produto.</Text>
          <Button onPress={() => navigation?.navigate('cadastrar-categoria')}>
            <ButtonText>Cadastrar Categoria</ButtonText>
          </Button>
        </Box>
      </Box>
    );
  }
  if (!verifyExists.empresa) {
    return (
      <Box h="$full" w="$full" alignItems="center" justifyContent="center">
        <Box>
          <Text>Não há categorias cadastradas.</Text>
          <Text>Cadastre uma antes de cadastrar um produto.</Text>
          <Button onPress={() => navigation?.navigate('cadastrar-empresas')}>
            <ButtonText>Cadastrar Categoria</ButtonText>
          </Button>
        </Box>
      </Box>
    );
  }
  if (!verifyExists.marca) {
    return (
      <Box h="$full" w="$full" alignItems="center" justifyContent="center">
        <Box>
          <Text>Não há categorias cadastradas.</Text>
          <Text>Cadastre uma antes de cadastrar um produto.</Text>
          <Button onPress={() => navigation?.navigate('cadastrar-marca')}>
            <ButtonText>Cadastrar Categoria</ButtonText>
          </Button>
        </Box>
      </Box>
    );
  }
  if (!verifyExists.unidade_de_armazenamento) {
    return (
      <Box h="$full" w="$full" alignItems="center" justifyContent="center">
        <Box>
          <Text>Não há categorias cadastradas.</Text>
          <Text>Cadastre uma antes de cadastrar um produto.</Text>
          <Button onPress={() => navigation?.navigate('cadastrar-ua')}>
            <ButtonText>Cadastrar Categoria</ButtonText>
          </Button>
        </Box>
      </Box>
    );
  }
  if (!verifyExists.unidade_de_medida) {
    return (
      <Box h="$full" w="$full" alignItems="center" justifyContent="center">
        <Box>
          <Text>Não há categorias cadastradas.</Text>
          <Text>Cadastre uma antes de cadastrar um produto.</Text>
          <Button onPress={() => navigation?.navigate('cadastrar-um')}>
            <ButtonText>Cadastrar Categoria</ButtonText>
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <ScrollView>
      <Box mx="$10" mt="$6" gap="$5">
        <Text size="xl">Insira os dados do produto:</Text>
        <Formik
          initialValues={{
            codigo_de_barras: '',
            nome: '',
            descricao: '',
            tipo: '',
            categoria: '',
            marca: '',
            empresa: '',
            quantidade: '0',
            tamanho: '0',
            unidade_de_medida: '',
            valor: '0,00',
            data_de_validade: new Date(),
            unidade_de_armazenamento: '',
            qtd_unidades_is_edt: false,
          }}
          onSubmit={() => {}}
        >
          {({ values, handleChange, setFieldValue }) => {
            React.useEffect(() => {
              if (route?.params?.code) {
                setFieldValue('codigo_de_barras', route.params.code);
              }
              return () => {};
            }, [route?.params?.code]);
            return (
              <Box>
                {/* Código de barras */}
                <FormControl
                  isInvalid={false}
                  size={'md'}
                  isDisabled={false}
                  isRequired={true}
                >
                  <FormControlLabel>
                    <FormControlLabelText>Código</FormControlLabelText>
                  </FormControlLabel>
                  <Input w="$full">
                    <InputField
                      type="text"
                      value={values.codigo_de_barras}
                      onChangeText={handleChange('codigo_de_barras')}
                      placeholder="Código de barras"
                    />
                    <Button
                      onPress={() =>
                        navigation?.navigate('code-scanner', {
                          screen: 'cadastrar-produtos',
                          type: 'scan',
                        })
                      }
                    >
                      <ButtonIcon
                        as={(props: object) => {
                          return <FontAwesome6 name="barcode" {...props} />;
                        }}
                      />
                    </Button>
                  </Input>

                  <FormControlHelper>
                    <FormControlHelperText>
                      Informe o código de barras ou escaneie clicando no botão.
                    </FormControlHelperText>
                  </FormControlHelper>

                  <FormControlError>
                    <FormControlErrorIcon as={AlertCircleIcon} />
                    <FormControlErrorText>
                      O código de barras é obrigatório.
                    </FormControlErrorText>
                  </FormControlError>
                </FormControl>

                {/*  */}
                <FormControl
                  isInvalid={false}
                  size={'md'}
                  isDisabled={false}
                  isRequired={true}
                >
                  <FormControlLabel>
                    <FormControlLabelText>Nome do produto</FormControlLabelText>
                  </FormControlLabel>
                  <Input w="$full">
                    <InputField
                      type="text"
                      placeholder="Nome do Produto"
                      onChangeText={handleChange('nome')}
                    />
                  </Input>

                  <FormControlHelper>
                    <FormControlHelperText>
                      Insira o nome do produto a ser cadastrado.
                    </FormControlHelperText>
                  </FormControlHelper>

                  <FormControlError>
                    <FormControlErrorIcon as={AlertCircleIcon} />
                    <FormControlErrorText>
                      O nome é um campo obrigatório.
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
                      Descição do Produto
                    </FormControlLabelText>
                  </FormControlLabel>
                  <FormControl
                    as={Textarea}
                    size={'lg'}
                    isInvalid={false}
                    isDisabled={false}
                    mx="$2"
                  >
                    <InputField
                      as={Textarea}
                      onChangeText={handleChange('descricao')}
                      placeholder="Your text goes here..."
                    />
                  </FormControl>

                  <FormControlHelper>
                    <FormControlHelperText>
                      Informe a descrição do produto.
                    </FormControlHelperText>
                  </FormControlHelper>

                  <FormControlError>
                    <FormControlErrorIcon as={AlertCircleIcon} />
                    <FormControlErrorText>
                      A descrição não pode ser vazia.
                    </FormControlErrorText>
                  </FormControlError>
                </FormControl>

                {/* Tipo de produto */}
                <FormControl
                  isInvalid={false}
                  size={'md'}
                  isDisabled={false}
                  isRequired={true}
                >
                  <FormControlLabel>
                    <FormControlLabelText>Tipo de produto</FormControlLabelText>
                  </FormControlLabel>
                  <Select
                    isInvalid={false}
                    isDisabled={false}
                    onValueChange={handleChange('tipo_de_produto')}
                  >
                    <SelectTrigger size={'lg'} variant={'outline'}>
                      <SelectInput placeholder="Select option" />
                      <SelectIcon mr={'$3'} ml={0} as={ChevronDownIcon} />
                    </SelectTrigger>
                    <SelectPortal>
                      <SelectBackdrop />
                      <SelectContent>
                        <SelectDragIndicatorWrapper>
                          <SelectDragIndicator />
                        </SelectDragIndicatorWrapper>
                        {dadosdb.tipo}
                        <SelectItem label="UX Research" value="UX Research" />
                      </SelectContent>
                    </SelectPortal>
                  </Select>

                  <FormControlHelper>
                    <FormControlHelperText>
                      O tipo de produto ex: Colônia, Refil, Toalha e etc...
                    </FormControlHelperText>
                  </FormControlHelper>

                  <FormControlError>
                    <FormControlErrorIcon as={AlertCircleIcon} />
                    <FormControlErrorText>
                      Atleast 6 characters are required.
                    </FormControlErrorText>
                  </FormControlError>
                </FormControl>

                {/* Quantidade em unidades de medida ml l m cm g mg */}
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
                      defaultValue=""
                      placeholder="Quantidade em gramas ex: 1mg"
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

                {/* Checkbox enable or disable manual digitation */}

                <Checkbox
                  m="$2"
                  size={'md'}
                  isInvalid={false}
                  isIndeterminate
                  aria-label="Label 1"
                  value="Label 1"
                  accessibilityLabel="Checkbox"
                  isChecked={values.qtd_unidades_is_edt}
                  onChange={(isSelected) => {
                    setFieldValue('qtd_unidades_is_edt', isSelected);
                  }}
                  nativeID="checkbox-1"
                >
                  <CheckboxIndicator mr="$2">
                    <CheckboxIcon as={CheckIcon} />
                  </CheckboxIndicator>
                  <CheckboxLabel>Editar quantidade de unidades</CheckboxLabel>
                </Checkbox>

                {/*  */}
                <FormControl
                  isInvalid={false}
                  size={'md'}
                  isDisabled={false}
                  isRequired={true}
                >
                  <FormControlLabel>
                    <FormControlLabelText>
                      Quantidade em unidades
                    </FormControlLabelText>
                  </FormControlLabel>
                  <Input w="$full">
                    <Button
                      onPress={() => {
                        setQauntidade(quantidade === 0 ? 0 : quantidade - 1);
                      }}
                      backgroundColor="$red600"
                    >
                      <ButtonIcon
                        as={(props: object) => (
                          <FontAwesome6 name="minus" {...props} />
                        )}
                      />
                    </Button>
                    <InputField
                      editable={values.qtd_unidades_is_edt}
                      keyboardType="numeric"
                      textAlign="center"
                      type="text"
                      onChangeText={(text) => {
                        setQauntidade(Number(text.replace(/\D/g, '')));
                      }}
                      value={String(quantidade)}
                      placeholder="Quantidade"
                    />
                    <Button
                      onPress={() => setQauntidade(quantidade + 1)}
                      backgroundColor="$primary500"
                    >
                      <ButtonIcon
                        as={(props: object) => (
                          <FontAwesome6 name="add" {...props} />
                        )}
                      />
                    </Button>
                  </Input>

                  <FormControlHelper>
                    <FormControlHelperText>
                      Informe a quantidade do produto.
                    </FormControlHelperText>
                  </FormControlHelper>

                  <FormControlError>
                    <FormControlErrorIcon as={AlertCircleIcon} />
                    <FormControlErrorText>
                      A quantidade é um valor obrigatório.
                    </FormControlErrorText>
                  </FormControlError>
                </FormControl>

                {/*  */}
                <FormControl
                  isInvalid={false}
                  size={'md'}
                  isDisabled={false}
                  isRequired={true}
                >
                  <FormControlLabel>
                    <FormControlLabelText>Valor</FormControlLabelText>
                  </FormControlLabel>
                  <Input w="$full">
                    <Box
                      px="$5"
                      backgroundColor="$trueGray300"
                      h="$full"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Text color="$black">
                        <Text fontSize="$xl" color="$black">
                          R
                        </Text>
                        $
                      </Text>
                    </Box>
                    <InputField
                      type="text"
                      value={values.valor}
                      keyboardType="number-pad"
                      onChangeText={handleChange('valor')}
                      onEndEditing={() => {
                        setFieldValue(
                          'valor',
                          parseFloat(
                            Number(values.valor.replace(',', '.')).toString(),
                          )
                            .toFixed(2)
                            .replace('.', ','),
                        );
                      }}
                      placeholder="R$XXX,XX"
                    />
                  </Input>

                  <FormControlHelper>
                    <FormControlHelperText>
                      Insira o valor do produto.
                    </FormControlHelperText>
                  </FormControlHelper>

                  <FormControlError>
                    <FormControlErrorIcon as={AlertCircleIcon} />
                    <FormControlErrorText>
                      O Valor é um campo obrigatório.
                    </FormControlErrorText>
                  </FormControlError>
                </FormControl>

                {/*  Selecione a empresa desejada */}
                <FormControl w="$full">
                  <FormControlLabel>
                    <FormControlHelperText>
                      Selecione a empresa
                    </FormControlHelperText>
                  </FormControlLabel>
                  <Select
                    isInvalid={false}
                    w={'$full'}
                    onValueChange={handleChange('empresa')}
                  >
                    <SelectTrigger size={'md'} variant={'outline'}>
                      <SelectInput placeholder="Selecione uma empresa" />
                      <SelectIcon mr={'$3'} ml={0} as={ChevronDownIcon} />
                    </SelectTrigger>
                    <SelectPortal>
                      <SelectBackdrop />
                      <SelectContent>
                        <SelectDragIndicatorWrapper>
                          <SelectDragIndicator />
                        </SelectDragIndicatorWrapper>
                        {teste.map((item) => (
                          <SelectItem
                            key={item.id}
                            label={item.name}
                            value={item.id.toString()}
                          />
                        ))}
                      </SelectContent>
                    </SelectPortal>
                  </Select>
                  <FormControlHelper>
                    <FormControlHelperText>
                      Selecione a empresa desejada.
                    </FormControlHelperText>
                  </FormControlHelper>

                  <FormControlError>
                    <FormControlErrorIcon as={AlertCircleIcon} />
                    <FormControlErrorText>
                      Selecine uma empresa o campo é obrigatório.
                    </FormControlErrorText>
                  </FormControlError>
                </FormControl>

                {/* Select Categoria */}
                <FormControl w="$full">
                  <FormControlLabel>
                    <FormControlHelperText>Categoria</FormControlHelperText>
                  </FormControlLabel>
                  <Select
                    onValueChange={handleChange('categoria')}
                    isInvalid={false}
                    w={'$full'}
                    isDisabled={false}
                  >
                    <SelectTrigger size={'md'} variant={'outline'}>
                      <SelectInput placeholder="Select option" />
                      <SelectIcon mr={'$3'} ml={0} as={ChevronDownIcon} />
                    </SelectTrigger>
                    <SelectPortal>
                      <SelectBackdrop />
                      <SelectContent>
                        <SelectDragIndicatorWrapper>
                          <SelectDragIndicator />
                        </SelectDragIndicatorWrapper>
                        <SelectItem label="UX Research" value="UX Research" />
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
                      Insira o valor do produto.
                    </FormControlHelperText>
                  </FormControlHelper>

                  <FormControlError>
                    <FormControlErrorIcon as={AlertCircleIcon} />
                    <FormControlErrorText>
                      O Valor é um campo obrigatório.
                    </FormControlErrorText>
                  </FormControlError>
                </FormControl>

                {/* Select */}
                <FormControl w="$full">
                  <FormControlLabel>
                    <FormControlHelperText>AAA</FormControlHelperText>
                  </FormControlLabel>
                  <Select isInvalid={false} w={'$full'} isDisabled={false}>
                    <SelectTrigger size={'md'} variant={'outline'}>
                      <SelectInput placeholder="Select option" />
                      <SelectIcon mr={'$3'} ml={0} as={ChevronDownIcon} />
                    </SelectTrigger>
                    <SelectPortal>
                      <SelectBackdrop />
                      <SelectContent>
                        <SelectDragIndicatorWrapper>
                          <SelectDragIndicator />
                        </SelectDragIndicatorWrapper>
                        <SelectItem label="UX Research" value="UX Research" />
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
                      Insira o valor do produto.
                    </FormControlHelperText>
                  </FormControlHelper>

                  <FormControlError>
                    <FormControlErrorIcon as={AlertCircleIcon} />
                    <FormControlErrorText>
                      O Valor é um campo obrigatório.
                    </FormControlErrorText>
                  </FormControlError>
                </FormControl>

                {/* Box Botão cadastrar */}
                <Box mb="$5">
                  <Button
                    $active-bgColor={
                      theme === 'dark' ? '$purple700' : '$purple500'
                    }
                    $dark-backgroundColor="$purple500"
                    $light-backgroundColor="$purple700"
                  >
                    <ButtonText>Cadastrar</ButtonText>
                  </Button>
                </Box>
              </Box>
            );
          }}
        </Formik>
      </Box>
    </ScrollView>
  );
};
export default Create;
