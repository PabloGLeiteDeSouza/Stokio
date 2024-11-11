import {
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
  Center,
  Icon,
  CircleIcon,
  CheckIcon,
  ChevronDownIcon,
} from '@gluestack-ui/themed';
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
  HStack,
  VStack,
  Heading,
  AlertCircleIcon,
  Card,
  ButtonIcon,
} from '@gluestack-ui/themed';
import { Box, ScrollView, Text } from '@gluestack-ui/themed';
import { Formik } from 'formik';
import { FontAwesome6 } from '@expo/vector-icons';
import { CadastrarProdutoScreen } from '@/interfaces/produto';
import InputDatePicker from '@/components/Custom/Inputs/DatePicker';
import LoadingScreen from '@/components/LoadingScreen';
import UmService from '@/classes/um/um.service';
import { useSQLiteContext } from 'expo-sqlite';
import MarcaService from '@/classes/marca/marca.service';
import TipoProdutoService from '@/classes/tipo_produto/tipo_produto.service';
import UaService from '@/classes/ua/ua.service';
import { EmpresaService } from '@/classes/empresa/empresa.service';
import InputText from '@/components/Input';
import { Alert } from 'react-native';

const Create: React.FC<CadastrarProdutoScreen> = ({ navigation, route }) => {
  const [haveMarca, setHaveMarca] = React.useState(true);
  const [haveTipoProduto, setHaveTipoProduto] = React.useState(false);
  const [haveUnidadeDeMedida, setHaveUnidadeDeMedida] = React.useState(false);
  const [haveUnidadeDeArmazenamento, setHaveUnidadeDeArmazenamento] =
    React.useState(false);
  const [isHaveEmpresa, setIsHaveEmpresa] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const db = useSQLiteContext();
  React.useEffect(() => {
    async function start() {
      try {
        if ((await new UmService(db).getAll()).length <= 0) {
          throw new Error('Não há empresas cadastradas', { cause: 'ERR_EXISTS_EMPRESAS' });
        }
        if ((await new TipoProdutoService(db).getAll()).length <= 0) {
          throw new Error('Não há tipos de produtos cadastrados', { cause: 'ERR_EXISTS_TIPO_PRODUTOS' });
        }
        if ((await new MarcaService(db).getAll()).length <= 0) {
          throw new Error('Não há marcas cadastradas', { cause: 'ERR_EXISTS_MARCA' });
        };
        if ((await new UaService(db).findAll()).length <= 0) {
          throw new Error('Não há unidades de armazenamento cadastrados', { cause: 'ERR_EXISTS_UA' });
        }
        if ((await new EmpresaService(db).findAll()).length <= 0) {
          throw new Error('Não há empresas cadastradas', { cause: 'ERR_EXISTS_EMPRESAS' });
        }
        setIsLoading(false);
      } catch (error) {
        const err = error as Error;
        Alert.alert('Error', err.message);
        const cause = err.cause as 'ERR_EXISTS_EMPRESAS' | 'ERR_EXISTS_TIPO_PRODUTOS' | 'ERR_EXISTS_MARCA' | 'ERR_EXISTS_UA' | 'ERR_EXISTS_EMPRESAS';
        if(cause === 'ERR_EXISTS_EMPRESAS'){
          navigation?.goBack();
          navigation?.navigate('screens-empresas');
        }
        if (cause === 'ERR_EXISTS_UA') {
          navigation?.goBack();
          navigation?.navigate('screens-uas');
        }
        setIsLoading(false);
        throw error;
      }
    }
    start();
  }, []);
  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <Box mx="$2">
      <ScrollView>
        <Box mt="$5" mx="$8">
          <Box mb="$8">
            <Heading textAlign="center" size="xl">
              Cadastre o Produto abaixo
            </Heading>
          </Box>
          <Box gap="$8" mb="$10">
            
          </Box>
        </Box>
      </ScrollView>
    </Box>
  );
};
export default Create;
