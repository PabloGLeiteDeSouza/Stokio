import {
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
  Text,
  Center,
  Icon,
  CircleIcon,
  CheckIcon,
  AlertCircleIcon,
  ChevronDownIcon,
  ButtonIcon,
  SearchIcon,
  AddIcon,
} from '@gluestack-ui/themed';

import { Empresa } from '$classes/empresa';
import LoadingScreen from '$components/LoadingScreen';
import { useThemeApp } from '$providers/theme';
import { RootStackParamList } from '$types/index';
import { Box, FormControl, ScrollView } from '@gluestack-ui/themed';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Alert } from 'react-native';
import { formatStringDate } from '../../utils';
import { Ionicons } from '@expo/vector-icons';
type ListarEmpresasScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'listar-empresas'
>;
type ListarEmpresasScreenRouteProp = RouteProp<
  RootStackParamList,
  'listar-empresas'
>;
interface ListarEmpresasScreenProps {
  navigation?: ListarEmpresasScreenNavigationProp;
  route?: ListarEmpresasScreenRouteProp;
}
const View: React.FC<ListarEmpresasScreenProps> = ({ navigation, route }) => {
  const [valorBusca, setValorBusca] = React.useState('');
  const [haveCompanys, setHaveCompanys] = React.useState(false);
  const [todasEmpresas, setTodasEmpresas] = React.useState<Array<any>>([]);
  const { theme } = useThemeApp();
  const [buscarEmpresa, setBuscarEmpresa] = React.useState('');
  const [tipoDeBusca, setTipoDeBusca] = React.useState('');
  const [isStartingPage, setIsStartingPage] = React.useState(true);
  async function Start() {
    try {
      const empresas = await new Empresa().findAll();
      console.log(empresas);
      setTodasEmpresas(empresas);
      setHaveCompanys(true);
      setIsStartingPage(false);
      return;
    } catch (error) {
      console.error(error);
      setIsStartingPage(false);
      Alert.alert('Erro', String(error));
    }
  }
  async function busca_empresa(valor: string, tipo: string) {
    try {
      switch (tipo) {
        case 'nome_completo':
          setTodasEmpresas(await new Empresa().findAllByNomeCompleto(valor));
          break;
        case 'cpf':
          setTodasEmpresas([await new Empresa().findUniqueByCpf(valor)]);
          break;
        case 'nome_fantasia':
          setTodasEmpresas(await new Empresa().findAllByNomeFantasia(valor));
          break;
        case 'razao_social':
          setTodasEmpresas(await new Empresa().findAllByRazaoSocial(valor));
          break;
        case 'cnpj':
          setTodasEmpresas([await new Empresa().findUniqueByCnpj(valor)]);
          break;
        default:
          setTodasEmpresas(await new Empresa().findAll());
          break;
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', (error as Error).message);
    }
  }
  React.useEffect(() => {
    setTimeout(() => {
      Start();
    }, 1);
  }, []);
  if (isStartingPage) {
    return <LoadingScreen />;
  }
  return haveCompanys ? (
    <ScrollView>
      <Box w="$full" px="$5">
        <FormControl
          isInvalid={false}
          size={'lg'}
          isDisabled={false}
          isRequired={true}
          my="$3"
        >
          <FormControlLabel>
            <FormControlLabelText>Buscar Empresa</FormControlLabelText>
          </FormControlLabel>
          <Input>
            <InputField
              onChangeText={(text) => setValorBusca(text)}
              type="text"
            />
            <Select
              isInvalid={false}
              isDisabled={false}
              onValueChange={(value) => setTipoDeBusca(value)}
              initialLabel="Selecione uma opcao"
              defaultValue="-"
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
                  <SelectItem
                    label="Nome Completo"
                    value="nome_completo"
                    isPressed={tipoDeBusca === 'nome_completo'}
                  />
                  <SelectItem
                    label="CPF"
                    value="cpf"
                    isPressed={tipoDeBusca === 'cpf'}
                  />
                  <SelectItem
                    label="Nome Fantasia"
                    value="nome_fantasia"
                    isPressed={tipoDeBusca === 'nome_fantasia'}
                  />
                  <SelectItem
                    label="Razao Social"
                    value="razao_social"
                    isPressed={tipoDeBusca === 'razao_social'}
                  />
                  <SelectItem
                    label="CNPJ"
                    value="cnpj"
                    isPressed={tipoDeBusca === 'cnpj'}
                  />
                </SelectContent>
              </SelectPortal>
            </Select>
            <Button
              onPress={() => {
                setIsStartingPage(true);
                setTimeout(() => busca_empresa(valorBusca, tipoDeBusca), 1);
                setIsStartingPage(false);
              }}
            >
              <ButtonIcon as={SearchIcon} />
            </Button>
          </Input>
        </FormControl>
        <Box gap="$3">
          <Text>
            Para adicionar mais empresas adicione clicando no botao + abaixo:
          </Text>
          <Button onPress={() => navigation?.navigate('cadastrar-empresas')}>
            <ButtonIcon as={AddIcon} />
          </Button>
        </Box>
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
                  Data de Nascimento:{' '}
                  {formatStringDate(value.data_de_nascimento)}
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

export default View;