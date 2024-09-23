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
  Center,
  Icon,
  CircleIcon,
  CheckIcon,
  AlertCircleIcon,
  ChevronDownIcon,
} from '@gluestack-ui/themed';

import { Ramo } from '$classes/ramo';
import { UpdateRamoDto } from '$classes/ramo/dto/update-ramo.dto';
import LoadingScreen from '$components/LoadingScreen';
import { AddIcon, Card, Heading } from '@gluestack-ui/themed';
import {
  Box,
  Button,
  ButtonIcon,
  ButtonText,
  ScrollView,
  Text,
} from '@gluestack-ui/themed';
import { useSQLiteContext } from 'expo-sqlite';
import React from 'react';
import { Alert } from 'react-native';
import { ListarRamosScreenProps } from '../interfaces';
import { useIsFocused } from '@react-navigation/native';
const View: React.FC<ListarRamosScreenProps> = ({ navigation }) => {
  const focused = useIsFocused();
  const db = useSQLiteContext();
  const [ramos, setRamos] = React.useState<Array<UpdateRamoDto>>([]);
  const [loading, setLoading] = React.useState(true);
  async function start() {
    try {
      const ramos = await new Ramo(db).findAll();
      setRamos(ramos);
      setLoading(false);
    } catch (error) {
      Alert.alert('Erro', (error as Error).message);
      setLoading(false);
    }
  }
  React.useEffect(() => {
    start();
  }, []);
  React.useEffect(() => {
    if (focused) {
      start();
    }
  }, [focused]);
  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <>
      {ramos.length > 0 ? (
        <ScrollView>
          <Box gap="$5">
            <Box>
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
            </Box>
            {ramos.map((ramo) => (
              <Card size="md" variant="elevated" m="$3">
                <Heading>{ramo.nome}</Heading>
                <Box>
                  <Text>{ramo.descricao}</Text>
                </Box>
              </Card>
            ))}
          </Box>
        </ScrollView>
      ) : (
        <Box>
          <Text>Nao ha ramos cadastrados</Text>
          <Box>
            <Button onPress={() => navigation?.navigate('cadastrar-ramos')}>
              <ButtonText>Cadastrar ramo</ButtonText>
              <ButtonIcon as={AddIcon} />
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};
export default View;
