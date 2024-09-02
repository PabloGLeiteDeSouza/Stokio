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
  AddIcon,
} from '@gluestack-ui/themed';
import { UpdateProdutoDto } from '$classes/produto/dto/update-produto.dto';
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
import start from './functions/start';
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
    marca: false,
    tipo: false,
    um: false,
    ua: false,
  });

  const { theme } = useThemeApp();
  const db = useSQLiteContext();

  React.useEffect(() => {
    setIsLoading(true);
    start(setProdutcts, setIsLoading, setHaveAllDeps, db, haveAllDeps, Alert);
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
                    type="text"
                    placeholder="Buscar..."
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
              {haveAllDeps.empresa
                ? haveAllDeps.marca
                  ? haveAllDeps.tipo
                    ? haveAllDeps.ua
                      ? haveAllDeps.um
                        ? 'produtos cadastrados'
                        : 'unidades de medida cadastradas'
                      : 'unidades de armazenamento cadastradas'
                    : 'tipos de produtos cadastrados'
                  : 'marcas de produtos cadastradas'
                : 'empresas cadastradas'}
            </Text>
            <Button
              $active-bgColor={theme === 'dark' ? '$purple700' : '$purple500'}
              $dark-backgroundColor="$purple500"
              $light-backgroundColor="$purple700"
              gap={10}
              onPress={() =>
                navigation?.navigate(
                  !haveAllDeps.empresa
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
                {!haveAllDeps.empresa
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
