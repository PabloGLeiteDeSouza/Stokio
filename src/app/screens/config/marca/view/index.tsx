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
} from '@gluestack-ui/themed';
import { Box, ScrollView } from '@gluestack-ui/themed';
import { Formik } from 'formik';
import { Card } from '@gluestack-ui/themed';
import { EditIcon } from '@gluestack-ui/themed';
import Marcas from './marcas.json';
import { SearchIcon } from '@gluestack-ui/themed';
import { VisualizarMarcaScreen } from '@/interfaces/marca';
import { Marca, MarcaFlatList } from '@/types/screens/marca';
import { ListRenderItem } from 'react-native';

const View: React.FC<VisualizarMarcaScreen> = ({ navigation }) => {
  const [marcas, setMarcas] = React.useState<Array<Marca>>(Marcas);
  const FlatListMarca = FlatList as MarcaFlatList;
  const ListRenderMarca: ListRenderItem<Marca> = ({ item }) => {
    return (
      <Card size="md" variant="elevated" m="$3">
        <HStack justifyContent="space-between">
          <Box w="$2/3">
            <Heading mb="$1" size="md">
              {item.nome}
            </Heading>
          </Box>
          <Box gap="$5">
            <Button action="negative">
              <ButtonIcon as={TrashIcon} />
            </Button>
            <Button
              onPress={() =>
                navigation?.navigate('atualizar-marca', { id: item.id })
              }
            >
              <ButtonIcon as={EditIcon} />
            </Button>
          </Box>
        </HStack>
      </Card>
    );
  };
  return (
    <Box h="$full" w="$full" px="$8" py="$8">
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
                      Must be atleast 6 characters.
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
        <Button onPress={() => navigation?.navigate('cadastrar-marca')}>
          <ButtonText>Cadastrar Marcas</ButtonText>
          <ButtonIcon ml="$5" as={AddIcon} />
        </Button>
      </Box>
      <Box w="$full" alignItems="center" gap="$5" my="$5">
        <Divider />
        <Text>Marcas</Text>
        <Divider />
      </Box>
      <FlatListMarca
        data={marcas}
        renderItem={ListRenderMarca}
        keyExtractor={(item) => String(item.id)}
      />
    </Box>
  );
};
export default View;
