import {
  FormControlLabel,
  FormControlLabelText,
  FormControlHelper,
  FormControlHelperText,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
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
  CircleIcon,
  CheckIcon,
  AlertCircleIcon,
  ChevronDownIcon,
  InputSlot,
} from '@gluestack-ui/themed';
import {
  Input,
  InputField,
  InputIcon,
  Center,
  VStack,
  Heading,
  Icon,
  SearchIcon,
  FormControl,
} from '@gluestack-ui/themed';
import { EyeIcon, EyeOffIcon } from 'lucide-react-native';
import { useState } from 'react';
import {
  Box,
  Button,
  ButtonIcon,
  ButtonText,
  ScrollView,
  Text,
} from '@gluestack-ui/themed';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import CadastrarEmpresasScreen from './Cadastrar';
import { Ionicons } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';
import { useThemeApp } from '$providers/theme';
import { Empresa } from '../../classes/empresa';
import * as SplashScreen from 'expo-splash-screen';
import * as SQLite from 'expo-sqlite';
import { Alert } from 'react-native';
import formatarData from '../../utils/formatarData';
const Stack = createNativeStackNavigator();
SplashScreen.preventAutoHideAsync();
const EmpresasScreens: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="listar-empresas">
      <Stack.Screen
        name="listar-empreas"
        component={ListarEmpresasScreen}
        options={{
          title: 'Listar Empresas',
        }}
      />
      <Stack.Screen
        name="cadastrar-empresas"
        component={CadastrarEmpresasScreen}
        options={{
          title: 'Cadastrar Empresas',
        }}
      />
    </Stack.Navigator>
  );
};
type ListarEmpresasScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'listar-empresas'
>;
type ListarEmpresasScreenRouteProp = RouteProp<
  RootStackParamList,
  'listar-empresas'
>;
type ErrorQuery = {
  error: boolean;
};
interface ListarEmpresasScreenProps {
  navigation?: ListarEmpresasScreenNavigationProp;
  route?: ListarEmpresasScreenRouteProp;
}
const ListarEmpresasScreen: React.FC<ListarEmpresasScreenProps> = ({
  navigation,
  route,
}) => {
  const [value, setValue] = React.useState('');
  const [haveCompanys, setHaveCompanys] = React.useState(false);
  const [todasEmpresas, setTodasEmopresas] = React.useState<Array<any>>([]);
  const { theme } = useThemeApp();
  const [buscarEmpresa, setBuscarEmpresa] = React.useState('');
  const [tipoDeBusca, setTipoDeBusca] = React.useState('');

  async function Start() {
    try {
      const empresas = await new Empresa().findAll();
      console.log(empresas);
      setTodasEmopresas(empresas);
      setHaveCompanys(true);
      await SplashScreen.hideAsync();
      return;
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', String(error));
    }
  }

  async function busca_empresa(valor: string, tipo: string) {
    try{
        switch (tipo) {
            case 'nome_completo':
                const result = await (new Empresa()).findAllByNomeCompleto(valor);
                setTodasEmopresas(result);
                break;
            case '':
                const result = (await new Empresa())
                break;
        
            default:
                break;
        }
    }
  }

  React.useEffect(() => {
    Start();
  }, []);
  return haveCompanys ? (
    <ScrollView>
      <Box w="$full" px="$5">
        <FormControl
          isInvalid={false}
          size={'lg'}
          isDisabled={false}
          isRequired={true}
        >
          <FormControlLabel>
            <FormControlLabelText>Buscar Empresa</FormControlLabelText>
          </FormControlLabel>
          <Input>
            <InputField type="text" />
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
      </Box>
      {todasEmpresas.map((value, i) => {
        return (
          <Box key={i} w="$full" alignItems="center" gap="$2.5" my="$2.5">
            {value.cnpj ? (
              <>
                <Text>Nome Fantasia: {value.nome_fantasia}</Text>
                <Text>Razão Social: {value.razao_social}</Text>
                <Text>CNPJ: {value.cnpj}</Text>
              </>
            ) : (
              <>
                <Text>Nome Completo: {value.nome_completo}</Text>
                <Text>
                  Data de Nascimento: {formatarData(value.data_de_nascimento)}
                </Text>
                <Text>CPF: {value.cpf}</Text>
              </>
            )}
          </Box>
        );
      })}
    </ScrollView>
  ) : (
    <Box w="$full" h="$full" alignItems="center" justifyContent="center">
      <Box gap={10}>
        <Text size="xl" textAlign="center">
          Não há Empresas cadastradas
        </Text>
        <Button
          $active-bgColor={theme === 'dark' ? '$purple700' : '$purple500'}
          $dark-backgroundColor="$purple500"
          $light-backgroundColor="$purple700"
          gap={10}
          onPress={() => navigation?.navigate('cadastrar-empresas')}
        >
          <ButtonText>Cadastrar Empresas</ButtonText>
          <ButtonIcon
            color="$white"
            as={() => <Ionicons name="add-circle" size={15} color="white" />}
          />
        </Button>
      </Box>
    </Box>
  );
};
export default EmpresasScreens;
