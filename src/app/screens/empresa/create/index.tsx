import { AddIcon, Card, Heading, RemoveIcon } from '@gluestack-ui/themed';
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
  Button,
  ButtonText,
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
  Center,
  Icon,
  CircleIcon,
  CheckIcon,
  AlertCircleIcon,
  ChevronDownIcon,
  ButtonIcon,
} from '@gluestack-ui/themed';
import { Box, Text } from '@gluestack-ui/themed';
import { Formik } from 'formik';
import { CalendarDaysIcon } from '@gluestack-ui/themed';
import { ScrollView } from '@gluestack-ui/themed';
import { CadastrarEmpresaScreen } from '@/interfaces/empresa';
import formatDate from '@/utils/formatDate';
import LoadingScreen from '@/components/LoadingScreen';
import * as Yup from 'yup';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { EmpresaService } from '@/classes/empresa/empresa.service';
import { useSQLiteContext } from 'expo-sqlite';
import { RamoService } from '@/classes/ramo/ramo.service';
import InputText from '@/components/Input';
import SelectEstados from '@/components/Custom/Selects/SelectEstados';
import { Alert, GestureResponderEvent } from 'react-native';
import InputDatePicker from '@/components/Custom/Inputs/DatePicker';
import { getMinDateFor18YearsOld, getStringFromDate } from '@/utils';
import { Pessoa } from '@/classes/empresa/types';
import FormCreateEmpresa from '@/components/Forms/empresa/create';



const Create: React.FC<CadastrarEmpresaScreen> = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [pessoas, setPessoas] = React.useState<Pessoa[]>([]);
  const [isNewPerson, setIsNewPerson] = React.useState(false);
  const [isNewRamo, setIsNewRamo] = React.useState(false);
  const db = useSQLiteContext();
  const isfocused = useIsFocused();

  async function start() {
    try {
      const pss = await new EmpresaService(db).getAllPessoas();
      const rm = await new RamoService(db).haveRamos();
      if (pss.length < 1) {
        setIsNewPerson(true);
      } else {
        setPessoas([...pss]);
      }
      setIsNewRamo(!rm);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  }
  React.useEffect(() => {
    if (isfocused) {
      start();
    }
  }, [isfocused]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Box w="$full" h="$full">
      <ScrollView w="$full">
        <Box px="$8" py="$5">
          <Box w="$full" alignItems="center">
            <Text size="3xl">Cadastrar Empresa</Text>
          </Box>
          <Box gap="$5">
            <FormCreateEmpresa
              db={db}
              onChangePessoa={(pessoas, pessoaSelecionada) => {
                navigation?.navigate('selecionar-pessoa', {
                  pessoas,
                  screen: 'cadastrar-empresa',
                  pessoaSelecionada,
                })
              }}
              onChangeRamo={(ramoSelecionado) => {
                navigation?.navigate('selecionar-ramo', {
                  screen: 'cadastrar-empresa',
                  ramoSelecionado 
                })
              }}
              onSubmited={() => {
                navigation?.goBack();
              }}
              pessoa={route?.params?.pessoa}
              ramo={route?.params?.ramo}
              pessoas={pessoas.length > 0 ? pessoas.map((p) => { return { ...p, data_nascimento: getStringFromDate(p.data_nascimento) }}) : []}
              haveRamos={!isNewRamo}
            />
          </Box>
        </Box>
      </ScrollView>
    </Box>
  );
};
export default Create;
