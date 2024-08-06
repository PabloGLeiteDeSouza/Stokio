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
  SearchIcon,
} from '@gluestack-ui/themed';

import { Categoria } from '$classes/categoria';
import { Empresa } from '$classes/empresa';
import { Marca } from '$classes/marca';
import { Produto } from '$classes/produto';
import { UpdateProdutoDto } from '$classes/produto/dto/update-produto.dto';
import { TipoDeProduto } from '$classes/tipo_produto';
import LoadingScreen from '$components/LoadingScreen';
import { useThemeApp } from '$providers/theme';
import { RootStackParamList } from '$types/index';
import { Ionicons } from '@expo/vector-icons';
import { Button, ButtonIcon, ScrollView } from '@gluestack-ui/themed';
import { ButtonText } from '@gluestack-ui/themed';
import { Box, Text } from '@gluestack-ui/themed';
import { RouteProp, useIsFocused } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSQLiteContext } from 'expo-sqlite';
import React from 'react';
import { Alert } from 'react-native';
type ListarProdutosScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'listar-produtos'
>;
type ListarProdutosScreenRouteProp = RouteProp<
  RootStackParamList,
  'listar-produtos'
>;
interface ListarProdutosScreenProps {
  navigation?: ListarProdutosScreenNavigationProp;
  route?: ListarProdutosScreenRouteProp;
}
const View: React.FC<ListarProdutosScreenProps> = ({ navigation }) => {
  const onFocused = useIsFocused();
  const [products, setProdutcts] = React.useState<Array<UpdateProdutoDto>>([]);
  const [paramSearch, setParamSearch] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);
  const [haveAllDeps, setHaveAllDeps] = React.useState({
    empresa: false,
    tipo: false,
    categoria: false,
    marca: false,
    um: false,
    ua: false,
  });
  const { theme } = useThemeApp();
  const db = useSQLiteContext();
  const getProdutos = async (
    type:
      | 'all'
      | 'nome'
      | 'codigo_de_barras'
      | 'categoria'
      | 'marca'
      | 'tipo'
      | 'empresa',
  ) => {
    switch (type) {
      case 'all':
        const produtos = await new Produto(db).findAll();
        setProdutcts(produtos);
        break;
      case 'codigo_de_barras':
        const produto = await new Produto(db).findFirstByBarCode(paramSearch);
        setProdutcts([produto]);
        break;
      case 'categoria':
        const produtosCategoria = await new Produto(db).findAllByCategory(
          Number(paramSearch),
        );
        setProdutcts(produtosCategoria);
        break;
      case 'empresa':
        const produtosEmpresa = await new Produto(db).findAllByIdEmpresa(
          Number(paramSearch),
        );
        setProdutcts(produtosEmpresa);
        break;
      case 'marca':
        const produtosMarca = await new Produto(db).findFirstByIdMarca(
          Number(paramSearch),
        );
        setProdutcts(produtosMarca);
        break;
      case 'tipo':
        const produtosTipo = await new Produto(db).findAllByTipo(paramSearch);
        setProdutcts(produtosTipo);
        break;
      case 'nome':
        const produtosNome = await new Produto(db).findFirstByName(paramSearch);
        setProdutcts([produtosNome]);
        break;
    }
    if (isLoading) {
      setIsLoading(false);
    }
  };
  React.useEffect(() => {
    async function start() {
      try {
        setIsLoading(true);
        const empresa = await new Empresa(db).findAll();
        if (empresa) {
          setHaveAllDeps({
            ...haveAllDeps,
            empresa: empresa.length > 0,
          });
        }
        const tipo = await new TipoDeProduto(db).findAll();
        if (tipo) {
          setHaveAllDeps({
            ...haveAllDeps,
            tipo: tipo.length > 0,
          });
        }
        const categoria = await new Categoria(db).findAll();
        if (categoria) {
          setHaveAllDeps({
            ...haveAllDeps,
            categoria: categoria.length > 0,
          });
        }
        const marca = await new Marca(db).findAll();
        if (marca) {
          setHaveAllDeps({
            ...haveAllDeps,
            marca: marca.length > 0,
          });
        }
        setIsLoading(false);
      } catch (error) {
        Alert.alert('Erro', (error as Error).message);
        throw error;
      }
    }
    start();
  }, []);
  React.useEffect(() => {
    setIsLoading(true);
    getProdutos('all');
  }, [onFocused]);
  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <>
      {products.length > 0 ? (
        <ScrollView>
          <Box>
            <Box>
              <FormControl
                isInvalid={false}
                size={'md'}
                isDisabled={false}
                isRequired={true}
              >
                <FormControlLabel>
                  <FormControlLabelText>Buscar</FormControlLabelText>
                </FormControlLabel>
                <Input>
                  <InputField
                    type="password"
                    defaultValue="12345"
                    placeholder="password"
                    value={paramSearch}
                    onChangeText={(text) => setParamSearch(text)}
                  />
                  <Button>
                    <ButtonIcon as={SearchIcon} />
                  </Button>
                </Input>
              </FormControl>
            </Box>
            <Box>
              {products.map((itens, i) => (
                <Box key={i}>
                  <HStack>
                    <VStack>
                      <Text>Nome:</Text>
                      <Text>{itens.nome}</Text>
                    </VStack>
                    <VStack>
                      <Text>Preço:</Text>
                      <Text>{itens.preco}</Text>
                    </VStack>
                    <VStack>
                      <Text>Descrição:</Text>
                      <Text>{itens.descricao}</Text>
                    </VStack>
                  </HStack>
                </Box>
              ))}
            </Box>
          </Box>
        </ScrollView>
      ) : (
        <Box w="$full" h="$full" alignItems="center" justifyContent="center">
          <Box gap={10}>
            <Text size="xl" textAlign="center">
              Não há{' '}
              {!haveAllDeps.categoria
                ? 'categorias cadastradas'
                : !haveAllDeps.empresa
                  ? 'empresas cadastradas'
                  : !haveAllDeps.marca
                    ? 'marcas cadastradas'
                    : !haveAllDeps.tipo
                      ? 'tipos de produtos cadastrados'
                      : !haveAllDeps.ua
                        ? 'unidades de armazenamento cadastradas'
                        : !haveAllDeps.um
                          ? 'unidades de medida cadastradas'
                          : 'produtos cadastrados'}
            </Text>
            <Button
              $active-bgColor={theme === 'dark' ? '$purple700' : '$purple500'}
              $dark-backgroundColor="$purple500"
              $light-backgroundColor="$purple700"
              gap={10}
              onPress={() =>
                navigation?.navigate(
                  !haveAllDeps.categoria
                    ? 'screens-categorias'
                    : !haveAllDeps.empresa
                      ? 'screens-empresas'
                      : !haveAllDeps.marca
                        ? 'screens-marcas'
                        : !haveAllDeps.tipo
                          ? 'screens-tipos-produtos'
                          : !haveAllDeps.ua
                            ? 'screens-uas'
                            : !haveAllDeps.um
                              ? 'screens-ums'
                              : 'cadastrar-produtos',
                )
              }
            >
              <ButtonText>
                {!haveAllDeps.categoria
                  ? 'Cadastrar Categoria'
                  : !haveAllDeps.empresa
                    ? 'Cadastrar Empresas'
                    : !haveAllDeps.marca
                      ? 'Cadastrar marca'
                      : !haveAllDeps.tipo
                        ? 'Cadastrar Tipo'
                        : !haveAllDeps.ua
                          ? 'Cadastrar Unidade de Armazenamento'
                          : !haveAllDeps.um
                            ? 'Cadastrar Unidades de Medidas'
                            : 'Cadastrar Produtos'}
              </ButtonText>
              <ButtonIcon
                color="$white"
                as={() => (
                  <Ionicons name="add-circle" size={15} color="white" />
                )}
              />
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};
export default View;
