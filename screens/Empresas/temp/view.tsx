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
  TrashIcon,
} from '@gluestack-ui/themed';

import { Empresa } from '$classes/empresa';
import LoadingScreen from '$components/LoadingScreen';
import { useThemeApp } from '$providers/theme';
import { RootStackParamList, UpdateEmpresaObject } from '$types/index';
import { Box, FormControl, ScrollView } from '@gluestack-ui/themed';
import { RouteProp, useIsFocused } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Alert } from 'react-native';
import { formatStringDate } from '../../../utils';
import { Ionicons } from '@expo/vector-icons';
import { useSQLiteContext } from 'expo-sqlite';
import { EditIcon } from '@gluestack-ui/themed';
import MessagesWarning, { operations } from 'messages-warnings';
import SearchEmpresas from '$components/SearchEmpresas';

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
const View: React.FC<ListarEmpresasScreenProps> = ({ navigation }) => {
  const isFocused = useIsFocused();
  const db = useSQLiteContext();
  const [valorBusca, setValorBusca] = React.useState('');
  const [haveCompanys, setHaveCompanys] = React.useState(false);
  const [todasEmpresas, setTodasEmpresas] = React.useState<
    Array<UpdateEmpresaObject>
  >([]);
  const { theme } = useThemeApp();
  const [tipoDeBusca, setTipoDeBusca] = React.useState('');
  const [isStartingPage, setIsStartingPage] = React.useState(true);
  async function Start() {
    try {
      const empresas = await new Empresa(db).findAll();
      setTodasEmpresas(empresas as Array<UpdateEmpresaObject>);
      setHaveCompanys(true);
      setIsStartingPage(false);
      return;
    } catch (error) {
      setIsStartingPage(false);
      setHaveCompanys(false);
      setTodasEmpresas([]);
    }
  }
  async function busca_empresa(valor: string, tipo: string) {
    try {
      switch (tipo) {
        case 'nome_completo':
          setTodasEmpresas(
            (await new Empresa(db).findAllByNomeCompleto(
              valor,
            )) as Array<UpdateEmpresaObject>,
          );
          break;
        case 'cpf':
          setTodasEmpresas([
            (await new Empresa(db).findUniqueByCpf(
              valor,
            )) as UpdateEmpresaObject,
          ]);
          break;
        case 'nome_fantasia':
          setTodasEmpresas(
            (await new Empresa(db).findAllByNomeFantasia(
              valor,
            )) as Array<UpdateEmpresaObject>,
          );
          break;
        case 'razao_social':
          setTodasEmpresas(
            (await new Empresa(db).findAllByRazaoSocial(
              valor,
            )) as Array<UpdateEmpresaObject>,
          );
          break;
        case 'cnpj':
          setTodasEmpresas([
            (await new Empresa(db).findUniqueByCnpj(
              valor,
            )) as UpdateEmpresaObject,
          ]);
          break;
        default:
          setTodasEmpresas(
            (await new Empresa(db).findAll()) as Array<UpdateEmpresaObject>,
          );
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

  React.useEffect(() => {
    setIsStartingPage(true);
    setTimeout(() => {
      Start();
    }, 1);
  }, [isFocused]);

  const deletarEmpresa = (empresa: UpdateEmpresaObject) => {
    Alert.alert(
      'Aviso',
      MessagesWarning.delete_messages.empresa +
        (empresa.cnpj ? empresa.nome_fantasia : empresa.nome_completo),
      [
        {
          text: 'Confirmar',
          onPress: async () => {
            try {
              await new Empresa(db).delete(empresa.id);
              Alert.alert('Sucesso', 'Registro apagado com sucesso!');
              setTimeout(() => {
                Start();
              }, 1);
            } catch (error) {
              console.error(error);
              Alert.alert('Erro', (error as Error).message);
            }
          },
        },
        {
          text: 'Cancelar',
          onPress: () => {
            Alert.alert('Aviso', operations.delete_messages.empresa);
            return;
          },
        },
      ],
    );
  };

  const editarEmpresa = (empresa: UpdateEmpresaObject) => {
    navigation?.navigate('editar-empresas', { empresa: empresa });
  };

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
            <SearchEmpresas
              onChangeValue={(Text) => {
                setValorBusca(Text);
              }}
              value={valorBusca}
              tipo={tipoDeBusca}
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
              <HStack
                px="$3"
                py="$3"
                rounded="$md"
                $light-bgColor="$purple400"
                $dark-bgColor="$purple700"
                gap="$3"
              >
                <VStack gap="$2">
                  <Text>
                    <Text fontWeight="$bold">Nome Fantasia:</Text>{' '}
                    {value.nome_fantasia}
                  </Text>
                  <Text>
                    <Text fontWeight="$bold">Razão Social:</Text>{' '}
                    {value.razao_social}
                  </Text>
                  <Text>
                    <Text fontWeight="$bold">CNPJ:</Text> {value.cnpj}
                  </Text>
                </VStack>
                <VStack gap="$2">
                  <Button onPress={() => editarEmpresa(value)}>
                    <ButtonIcon as={EditIcon} />
                  </Button>
                  <Button
                    action="negative"
                    onPress={() => deletarEmpresa(value)}
                  >
                    <ButtonIcon as={TrashIcon} />
                  </Button>
                </VStack>
              </HStack>
            ) : (
              <HStack
                px="$3"
                py="$3"
                rounded="$md"
                $light-bgColor="$purple400"
                $dark-bgColor="$purple700"
                gap="$3"
              >
                <VStack gap="$2">
                  <Text>
                    <Text fontWeight="$bold">Nome Completo:</Text>{' '}
                    {value.nome_completo}
                  </Text>
                  <Text>
                    <Text fontWeight="$bold">Data de Nascimento:</Text>{' '}
                    {formatStringDate(String(value.data_de_nascimento))}
                  </Text>
                  <Text>
                    <Text fontWeight="$bold">CPF:</Text> {value.cpf}
                  </Text>
                </VStack>
                <VStack gap="$2">
                  <Button onPress={() => editarEmpresa(value)}>
                    <ButtonIcon as={EditIcon} />
                  </Button>
                  <Button
                    action="negative"
                    onPress={() => deletarEmpresa(value)}
                  >
                    <ButtonIcon as={TrashIcon} />
                  </Button>
                </VStack>
              </HStack>
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
