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
  Divider,
  ButtonIcon,
  RemoveIcon,
  TrashIcon,
  AddIcon,
  FlatList,
  EyeIcon,
} from '@gluestack-ui/themed';
import { Box, ScrollView } from '@gluestack-ui/themed';
import { Formik } from 'formik';
import { Card } from '@gluestack-ui/themed';
import { EditIcon } from '@gluestack-ui/themed';
import Ramos from './ramos.json';
import { SearchIcon } from '@gluestack-ui/themed';
import { Ramo, RamoFlatList } from '@/types/screens/ramo';
import { ListRenderItem } from 'react-native';
import { VisualizarRamoScreen } from '@/interfaces/ramo';

const View: React.FC<VisualizarRamoScreen> = ({ navigation }) => {
  const [ramos, setRamos] = React.useState<Array<Ramo>>(Ramos);
  const FlatListRamo = FlatList as RamoFlatList;
  const ListRenderRamo: ListRenderItem<Ramo> = ({ item }) => {
    return (
      <Card size="md" variant="elevated" m="$3">
        <HStack justifyContent="space-between">
          <Box w="$2/3">
            <Heading mb="$1" size="md">
              {item.nome}
            </Heading>
          </Box>
          <Box gap="$5">
            <Button
              onPress={() =>
                navigation?.navigate('atualizar-ramo', { id: String(item.id) })
              }
            >
              <ButtonIcon as={EditIcon} />
            </Button>
            <Button action="negative">
              <ButtonIcon as={TrashIcon} />
            </Button>
          </Box>
        </HStack>
      </Card>
    );
  };

  return (
    <Box w="$full" h="$full" px="$8" py="$8">
      <Box gap="$5">
        <Formik
          initialValues={{
            busca: '',
          }}
          onSubmit={() => {}}
        >
          {({ values, handleChange, errors }) => {
            return (
              <>
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
                      value={values.busca}
                      placeholder="Buscar"
                      onChangeText={handleChange('buscar')}
                    />
                    <Button>
                      <ButtonIcon as={SearchIcon} />
                    </Button>
                  </Input>

                  <FormControlHelper>
                    <FormControlHelperText>
                      Informe o nome do Ramo que deseja buscar.
                    </FormControlHelperText>
                  </FormControlHelper>

                  <FormControlError>
                    <FormControlErrorIcon as={AlertCircleIcon} />
                    <FormControlErrorText>{errors.busca}</FormControlErrorText>
                  </FormControlError>
                </FormControl>
              </>
            );
          }}
        </Formik>
        <Button onPress={() => navigation?.navigate('cadastrar-ramo')}>
          <ButtonText>Cadastrar Ramos</ButtonText>
          <ButtonIcon ml="$5" as={AddIcon} />
        </Button>
      </Box>
      <Box w="$full" alignItems="center" gap="$5" my="$5">
        <Divider />
        <Text>Ramos</Text>
        <Divider />
      </Box>
      <FlatListRamo
        data={ramos}
        renderItem={ListRenderRamo}
        keyExtractor={(item) => String(item.id)}
      />
    </Box>
  );
};
export default View;
