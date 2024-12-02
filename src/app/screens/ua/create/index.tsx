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
  HStack,
  Text,
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
  AlertCircleIcon,
} from '@gluestack-ui/themed';
import { Box, Heading, ScrollView, VStack } from '@gluestack-ui/themed';
import { Formik } from 'formik';
import { Alert, GestureResponderEvent } from 'react-native';
import { CadastrarUaScreen } from '@/interfaces/ua';
import UaService from '@/classes/ua/ua.service';
import { useSQLiteContext } from 'expo-sqlite';
import FormCreateUa from '@/components/Forms/ua/create';
import TipoUaService from '@/classes/tipo_ua/tipo_ua.service';
import { useIsFocused } from '@react-navigation/native';
import LoadingScreen from '@/components/LoadingScreen';
const Create: React.FC<CadastrarUaScreen> = ({ navigation, route }) => {
  const [isLoadingScreen, setisLoadingScreen] = React.useState(true);
  const [haveTipoUa, setHaveTipoUa] = React.useState(false);
  const db = useSQLiteContext();
  const isFocused = useIsFocused();
  async function Start() {
    try {
      setHaveTipoUa((await new TipoUaService(db).getAll()).length > 0)
      setisLoadingScreen(false);
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
      navigation?.goBack();
      throw error;
    }
  }
  React.useEffect(() => {
    setisLoadingScreen(true);
    Start();
  }, [isFocused]);

  if(isLoadingScreen){
    return <LoadingScreen />
  }

  return (
    <Box h="$full" w="$full" px="$1.5">
      <ScrollView w="$full">
        <VStack space="xl" py="$10">
          <Box w="$full" px="$8" alignItems="center">
            <Heading textAlign="center" size="xl">
              Cadastrar Unidade de Armazenamento:
            </Heading>
          </Box>
          <Box w="$full" px="$8">
            <FormCreateUa
              db={db}
              haveTipoUa={haveTipoUa}
              onSubimited={() => {
                navigation?.goBack();
              }}
              onChangeTipoUa={(tipo_ua) => {
                navigation?.navigate('selecionar-tipo-ua', { tipo_ua, screen: 'cadastrar-ua'});
              }}
              tipo_ua={route?.params?.tipo_ua}
            />
          </Box>
        </VStack>
      </ScrollView>
    </Box>
  );
};
export default Create;
