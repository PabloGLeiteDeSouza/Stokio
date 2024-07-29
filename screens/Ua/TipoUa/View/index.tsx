import { TipoDeUnidadeDeArmazenamento } from '$classes/tipo_de_unidade_de_armazenamento';
import { UpdateTipoDeUnidadeDeArmazenamentoDto } from '$classes/tipo_de_unidade_de_armazenamento/dto/update-tipo-de-unidade-de-armazenamento.dto';
import { RootStackParamList } from '$types/index';
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
  ButtonIcon,
  SearchIcon,
  Spinner,
  AddIcon,
} from '@gluestack-ui/themed';

import { Box, ScrollView, Text } from '@gluestack-ui/themed';
import { RouteProp, useIsFocused } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSQLiteContext } from 'expo-sqlite';
import React from 'react';
import { Alert } from 'react-native';

type ListarTipoUaScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'listar-tipo-ua'
>;
type ListartTipoUaScreenRouteProp = RouteProp<
  RootStackParamList,
  'listar-tipo-ua'
>;
interface ListarTipoUaScreenProps {
  navigation?: ListarTipoUaScreenNavigationProp;
  route?: ListartTipoUaScreenRouteProp;
}

const View: React.FC<ListarTipoUaScreenProps> = ({ navigation }) => {
  const isFocused = useIsFocused();
  const db = useSQLiteContext();
  const [isLoadingItens, setIsLoadingItems] = React.useState(true);
  const [searchValue, setSearchValue] = React.useState('');
  const [items, setItems] = React.useState<
    Array<UpdateTipoDeUnidadeDeArmazenamentoDto>
  >([]);
  const [] = React.useState();
  const [] = React.useState();
  React.useEffect(() => {
    async function StartScreen() {
      try {
        const tipo_de_ua = await new TipoDeUnidadeDeArmazenamento(db).findAll();
        setItems(tipo_de_ua);
        setIsLoadingItems(false);
      } catch (error) {
        console.error(error);
        Alert.alert('Erro', (error as Error).message);
        setIsLoadingItems(false);
        throw error;
      }
    }
    StartScreen();
  }, []);
  React.useEffect(() => {}, [isFocused]);
  return (
    <ScrollView>
      <Box>
        <Text>Buscar Tipo de Unidade de Armazenamento</Text>
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
              value={searchValue}
              onChangeText={(text) => setSearchValue(text)}
            />
            <Button>
              <ButtonIcon as={SearchIcon} />
            </Button>
          </Input>

          <FormControlHelper>
            <FormControlHelperText>
              Busque o tipo de unidade de armazenamento pelo nome.
            </FormControlHelperText>
          </FormControlHelper>

          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>
              O campo de busca não pode ser vazio.
            </FormControlErrorText>
          </FormControlError>
        </FormControl>
        {items.length > 0 ? (
          isLoadingItens ? (
            <Box
              h="$full"
              w="$full"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Spinner size="large" />
            </Box>
          ) : (
            <Box>
              {items.map((item) => (
                <Box key={item.id}>
                  <Text>{item.nome}</Text>
                </Box>
              ))}
            </Box>
          )
        ) : (
          <Box
            h="$full"
            w="$full"
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            <Text>Não há tipos de unidades de armazenamento para exibir.</Text>
            <Box
              w="$full"
              h="$full"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Button onPress={() => navigation?.navigate('cadastrar-tipo-ua')}>
                <ButtonIcon as={AddIcon} />
                <ButtonText>Criar tipo de unidade de armazenamento</ButtonText>
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </ScrollView>
  );
};
export default View;
