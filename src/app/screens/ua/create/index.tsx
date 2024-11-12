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
import { GestureResponderEvent } from 'react-native';
import { CadastrarUaScreen } from '@/interfaces/ua';
import UaService from '@/classes/ua/ua.service';
import { useSQLiteContext } from 'expo-sqlite';
import FormCreateUa from '@/components/Forms/ua/create';
const Create: React.FC<CadastrarUaScreen> = ({ navigation }) => {
  const [isLoadingScreen, setisLoadingScreen] = React.useState(true);
  const db = useSQLiteContext();
  React.useEffect(() => {
    async function Start() {
      try {
        setisLoadingScreen(false);
      } catch (error) {
        throw error;
      }
    }
    if (isLoadingScreen) {
      Start();
    }
  }, [isLoadingScreen]);
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
              onSubimited={() => {
                navigation?.goBack();
              }}
            />
          </Box>
        </VStack>
      </ScrollView>
    </Box>
  );
};
export default Create;
