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
import { UpdateCategoriaDto } from '$classes/categoria/dto/update-categoria.dto';
import LoadingScreen from '$components/LoadingScreen';
import { RootStackParamList } from '$types/index';
import {
  AddIcon,
  Box,
  Button,
  ButtonIcon,
  ButtonText,
  HStack,
  ScrollView,
  Text,
  TrashIcon,
} from '@gluestack-ui/themed';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSQLiteContext } from 'expo-sqlite';
import React from 'react';
import { Alert } from 'react-native';
type ListarCategoriasScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'listar-produtos'
>;
type ListarCategoriasScreenRouteProp = RouteProp<
  RootStackParamList,
  'listar-produtos'
>;
interface ListarCategoriasScreenProps {
  navigation?: ListarCategoriasScreenNavigationProp;
  route?: ListarCategoriasScreenRouteProp;
}
const View: React.FC<ListarCategoriasScreenProps> = ({ navigation }) => {
  const db = useSQLiteContext();
  const [isLoading, setIsLoading] = React.useState(true);
  const [categorys, setCategorys] = React.useState<Array<UpdateCategoriaDto>>(
    [],
  );
  const [buscar, setBuscar] = React.useState("");
  React.useEffect(() => {
    async function Start() {
      try {
        const categorias = await new Categoria(db).findAll();
        if (categorias) {
          setCategorys(categorias);
        } else {
          setCategorys([]);
        }
        setIsLoading(false);
        return;
      } catch (error) {
        Alert.alert('Erro', (error as Error).message);
        setIsLoading(false);
      }
    }
    Start();
  }, []);
  if (isLoading) {
    return <LoadingScreen />;
  }

  const searchCategoria = async () => {
    
  }


  return (
    <>
      {categorys.length > 0 ? (
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
                  <FormControlLabelText>Buscar:</FormControlLabelText>
                </FormControlLabel>
                <Input>
                  <InputField
                    value={buscar}
                    onChange={(text) => setBuscar(text)}
                    type="text"
                    placeholder="Informe o nome da categoria"
                  />
                </Input>
                <Button
                  onPress={}
                >
                  <ButtonIcon as={SearchIcon} />
                </Button>
              </FormControl>
            </Box>
            {categorys.map((categoria) => (
              <Box key={categoria.id} mb={2}>
                <HStack>
                  <Box>
                    <Text size="xl" mb={1}>
                      {categoria.nome}
                    </Text>
                  </Box>
                  <Box>
                    <Button action="primary">
                      <ButtonIcon as={AddIcon} />
                    </Button>
                    <Button action="negative">
                      <ButtonIcon as={TrashIcon} />
                    </Button>
                  </Box>
                </HStack>
              </Box>
            ))}
          </Box>
        </ScrollView>
      ) : (
        <Box
          h="$full"
          w="$full"
          alignItems="center"
          justifyContent="center"
          gap="$5"
        >
          <Text size="xl">Não há categorias cadastradas</Text>
          <Box>
            <Button
              onPress={() => {
                navigation?.navigate('cadastrar-categoria');
              }}
            >
              <ButtonIcon as={AddIcon} />
              <ButtonText>Cadastrar categoria</ButtonText>
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};
export default View;
