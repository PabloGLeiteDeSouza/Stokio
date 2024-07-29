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
const Create: React.FC<CadastrarProdutosScreenProps> = ({
  navigation,
  route,
}) => {
  const teste = [
    { id: 25, name: 'Natura' },
    { id: 50, name: 'Boticário' },
    { id: 155, name: 'WesleyRoupasLTDA' },
  ];
  const reducer = (
    state: CadastrarProdutosState,
    action: CadastrarProdutosAction,
  ): CadastrarProdutosState => {
    switch (action.type) {
      case 'alt_edt_qtd_unidades':
        return {
          qtd_unidades_is_edt: Boolean(action.qtd_unidades_is_edt),
          categoria: state.categoria,
          codigo: state.codigo,
          empresa: state.empresa,
          nome: state.nome,
          quantidade: state.quantidade,
          tipo_quantidade: state.tipo_quantidade,
          unidades: state.unidades,
          valor: state.valor,
          tipo: state.tipo,
        };

      case 'alt_codigo':
        return {
          qtd_unidades_is_edt: state.qtd_unidades_is_edt,
          categoria: state.categoria,
          codigo: String(action.codigo),
          empresa: state.empresa,
          nome: state.nome,
          quantidade: state.quantidade,
          tipo_quantidade: state.tipo_quantidade,
          unidades: state.unidades,
          valor: state.valor,
          tipo: state.tipo,
        };
      case 'alt_nome':
        return {
          qtd_unidades_is_edt: state.qtd_unidades_is_edt,
          categoria: state.categoria,
          codigo: state.codigo,
          empresa: state.empresa,
          nome: String(action.nome),
          quantidade: state.quantidade,
          tipo_quantidade: state.tipo_quantidade,
          unidades: state.unidades,
          valor: state.valor,
          tipo: state.tipo,
        };
      case 'alt_quantidade':
        return {
          qtd_unidades_is_edt: state.qtd_unidades_is_edt,
          categoria: state.categoria,
          codigo: state.codigo,
          empresa: state.empresa,
          nome: state.nome,
          quantidade: Number(action.quantidade),
          tipo_quantidade: state.tipo_quantidade,
          unidades: state.unidades,
          valor: state.valor,
          tipo: state.tipo,
        };
      case 'alt_tipo_quantidade':
        return {
          qtd_unidades_is_edt: state.qtd_unidades_is_edt,
          categoria: state.categoria,
          codigo: state.codigo,
          empresa: state.empresa,
          nome: state.nome,
          quantidade: state.quantidade,
          tipo_quantidade: String(action.tipo_quantidade),
          unidades: state.unidades,
          valor: state.valor,
          tipo: state.tipo,
        };
      case 'alt_unidades':
        return {
          qtd_unidades_is_edt: state.qtd_unidades_is_edt,
          categoria: state.categoria,
          codigo: state.codigo,
          empresa: state.empresa,
          nome: state.nome,
          quantidade: state.quantidade,
          tipo_quantidade: state.tipo_quantidade,
          unidades: Number(action.unidades),
          valor: state.valor,
          tipo: state.tipo,
        };
      case 'alt_categoria':
        return {
          qtd_unidades_is_edt: state.qtd_unidades_is_edt,
          categoria: state.categoria,
          codigo: String(action.codigo),
          empresa: state.empresa,
          nome: state.nome,
          quantidade: state.quantidade,
          tipo_quantidade: state.tipo_quantidade,
          unidades: state.unidades,
          valor: state.valor,
          tipo: state.tipo,
        };
      case 'alt_empresa':
        return {
          qtd_unidades_is_edt: state.qtd_unidades_is_edt,
          categoria: state.categoria,
          codigo: state.codigo,
          empresa: Number(action.empresa),
          nome: state.nome,
          quantidade: state.quantidade,
          tipo_quantidade: state.tipo_quantidade,
          unidades: state.unidades,
          valor: state.valor,
          tipo: state.tipo,
        };
      case 'alt_valor':
        return {
          qtd_unidades_is_edt: state.qtd_unidades_is_edt,
          categoria: state.categoria,
          codigo: state.codigo,
          empresa: state.empresa,
          nome: state.nome,
          quantidade: state.quantidade,
          tipo_quantidade: state.tipo_quantidade,
          unidades: state.unidades,
          valor: String(action.valor),
          tipo: state.tipo,
        };
      case 'tipo_produto':
        return {
          qtd_unidades_is_edt: state.qtd_unidades_is_edt,
          categoria: state.categoria,
          codigo: state.codigo,
          empresa: state.empresa,
          nome: state.nome,
          quantidade: state.quantidade,
          tipo_quantidade: state.tipo_quantidade,
          unidades: state.unidades,
          valor: state.valor,
          tipo: String(action.tipo),
        };
      default:
        throw new Error('Erro ao atualizar o estado');
    }
  };
  const [state, dispatch] = React.useReducer<
    React.Reducer<CadastrarProdutosState, CadastrarProdutosAction>
  >(reducer, {
    qtd_unidades_is_edt: false,
    categoria: 0,
    codigo: '',
    empresa: 0,
    nome: '',
    quantidade: 0,
    tipo_quantidade: '',
    unidades: 0,
    valor: '0,00',
    tipo: '',
  });

  const [haveEmprise, setHaveEmprise] = React.useState(false);
  const [quantidade, setQauntidade] = React.useState<number>(0);
  const [valor, setValor] = React.useState('');
  const { theme } = useThemeApp();
  React.useEffect(() => {
    if (route?.params?.code) {
      dispatch({
        type: 'alt_codigo',
        codigo: route.params.code,
      });
    }
    return () => {};
  }, [route?.params?.code]);
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
          }}
          onSubmit={() => {}}
        ></Formik>
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
              value={state.codigo}
              onChangeText={(txt) =>
                dispatch({
                  type: 'alt_codigo',
                  codigo: txt,
                })
              }
              placeholder="código de barras"
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
                as={(props: any) => {
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
              onChangeText={(text) =>
                dispatch({
                  type: 'alt_nome',
                  nome: text,
                })
              }
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
          <Input>
            <InputField
              type="text"
              defaultValue=""
              placeholder="Tipo de produto"
            />
          </Input>

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
          isChecked={state.qtd_unidades_is_edt}
          onChange={(isSelected: boolean) =>
            dispatch({
              type: 'alt_edt_qtd_unidades',
              qtd_unidades_is_edt: isSelected,
            })
          }
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
            <FormControlLabelText>Quantidade em unidades</FormControlLabelText>
          </FormControlLabel>
          <Input w="$full">
            <Button
              onPress={() => {
                setQauntidade(quantidade === 0 ? 0 : quantidade - 1);
              }}
              backgroundColor="$red600"
            >
              <ButtonIcon
                as={(props: any) => <FontAwesome6 name="minus" {...props} />}
              />
            </Button>
            <InputField
              editable={state.qtd_unidades_is_edt}
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
                as={(props: any) => <FontAwesome6 name="add" {...props} />}
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
              value={state.valor}
              keyboardType="number-pad"
              onChangeText={(text) =>
                dispatch({ type: 'alt_valor', valor: text })
              }
              onEndEditing={(e) => {
                dispatch({
                  type: 'alt_valor',
                  valor: parseFloat(
                    Number(state.valor.replace(',', '.')).toString(),
                  )
                    .toFixed(2)
                    .replace('.', ','),
                });
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
            <FormControlHelperText>Selecione a empresa</FormControlHelperText>
          </FormControlLabel>
          <Select
            isInvalid={false}
            w={'$full'}
            onValueChange={async (value) => {
              dispatch({ type: 'alt_empresa', empresa: Number(value) });
            }}
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

        {/*  */}
        <FormControl w="$full">
          <FormControlLabel>
            <FormControlHelperText>Categoria</FormControlHelperText>
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
                <SelectItem label="Web Development" value="Web Development" />
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

        {/*  */}
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
                <SelectItem label="Web Development" value="Web Development" />
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

        {/*  */}
        <Box mb="$5">
          <Button
            $active-bgColor={theme === 'dark' ? '$purple700' : '$purple500'}
            $dark-backgroundColor="$purple500"
            $light-backgroundColor="$purple700"
          >
            <ButtonText>Enviar</ButtonText>
          </Button>
        </Box>
      </Box>
    </ScrollView>
  );
};
export default Create;
