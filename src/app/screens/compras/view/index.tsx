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
  Text,
  Center,
  Icon,
  CircleIcon,
  CheckIcon,
  AlertCircleIcon,
  ChevronDownIcon,
} from '@gluestack-ui/themed';
import LoadingScreen from '@/components/LoadingScreen';
import { VisualizarCompraScreen } from '@/interfaces/compra';
import { ScrollView } from '@gluestack-ui/themed';
import { Button } from '@gluestack-ui/themed';
import { Box, ButtonText, Heading } from '@gluestack-ui/themed';
import { Formik } from 'formik';
import React from 'react';
import { Alert } from 'react-native';
const View: React.FC<VisualizarCompraScreen> = ({ navigation, route }) => {
  const [compras, setCompras] = React.useState<unknown[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  async function start() {
    try {
      if (!isLoading) {
        setIsLoading(true);
      }
      setCompras([]);
      setIsLoading(false);
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
      setIsLoading(false);
      throw error;
    }
  }
  React.useEffect(() => {
    start();
  }, []);
  if (isLoading) {
    return <LoadingScreen />;
  }
  return compras.length < 1 ? (
    <Box h="$full" w="$full" alignItems="center" justifyContent="center">
      <Box gap="$5">
        <Heading>Não Foi possivel encontrar compras</Heading>
        <Button onPress={() => navigation?.navigate('cadastrar-compra')}>
          <ButtonText>Cadastrar Compra</ButtonText>
        </Button>
      </Box>
    </Box>
  ) : (
    <Box w="$full" h="$full">
      <Box>
        <Heading>Compras</Heading>
        <Box>
          <Formik
            initialValues={{
                busca: '',
                tipo: '',
                data_inicio: '',
                data_fim: '',
            }}
            onSubmit={async () => {
                
            }}
          >
            {({ values, handleChange, handleBlur, handleSubmit }) => {
              return (
                <>
                  <FormControl
                    isInvalid={false}
                    size={'md'}
                    isDisabled={false}
                    isRequired={true}
                  >
                    <FormControlLabel>
                      <FormControlLabelText>Password</FormControlLabelText>
                    </FormControlLabel>
                    <Input>
                      <InputField
                        type="password"
                        defaultValue="12345"
                        placeholder="password"
                      />
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
                  <FormControl
                    isInvalid={false}
                    size={'md'}
                    isDisabled={false}
                    isRequired={true}
                  >
                    <FormControlLabel>
                      <FormControlLabelText>Password</FormControlLabelText>
                    </FormControlLabel>
                    <Input>
                      <InputField
                        type="password"
                        defaultValue="12345"
                        placeholder="password"
                      />
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
                </>
              );
            }}
          </Formik>
        </Box>
      </Box>
      <ScrollView>
        <Box gap="$5"></Box>
      </ScrollView>
    </Box>
  );
};
export default View;
