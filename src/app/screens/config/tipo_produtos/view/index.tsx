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
  Box,
  ScrollView,
  Card,
  EditIcon,
  SearchIcon,
} from '@gluestack-ui/themed';
import { Formik } from 'formik';
import Tipos_Produtos from './tipo_produto.json';
import { TipoProduto, TipoProdutoFlatList } from '@/types/screens/tipo-produto';
import { ListRenderItem } from 'react-native';
import { VisualizarTipoProdutoScreen } from '@/interfaces/tipo-produto';

const View: React.FC<VisualizarTipoProdutoScreen> = ({ navigation }) => {
  const [tipos_produtos, setTipos_Produtos] =
    React.useState<Array<TipoProduto>>(Tipos_Produtos);
  const FlatListTipoProduto = FlatList as TipoProdutoFlatList;
  const ListRenderTipoProduto: ListRenderItem<TipoProduto> = ({ item }) => {
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
                navigation?.navigate('atualizar-tipo-produto', {
                  id: Number(item.id),
                })
              }
            >
              <ButtonIcon as={EditIcon} />
            </Button>
          </Box>
        </HStack>
      </Card>
    );
  };

  return tipos_produtos.length < 1 ? (
    <Box h="$full" w="$full" alignItems="center" justifyContent="center">
      <Box gap="$5">
        <Heading textAlign="center">Tipos de Produtos não encontrados</Heading>
        <Box>
          <Button
            onPress={() => navigation?.navigate('cadastrar-tipo-produto')}
          >
            <ButtonText>Cadastrar Tipo de Produto</ButtonText>
            <ButtonIcon as={AddIcon} />
          </Button>
        </Box>
      </Box>
    </Box>
  ) : (
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
                      onChangeText={handleChange('busca')}
                    />
                    <Button>
                      <ButtonIcon as={SearchIcon} />
                    </Button>
                  </Input>

                  <FormControlHelper>
                    <FormControlHelperText>
                      Informe o nome do tipo de produto que deseja buscar.
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
        <Button onPress={() => navigation?.navigate('cadastrar-tipo-produto')}>
          <ButtonText>Cadastrar Tipos de produtos</ButtonText>
          <ButtonIcon ml="$5" as={AddIcon} />
        </Button>
      </Box>
      <Box w="$full" alignItems="center" gap="$5" my="$5">
        <Divider />
        <Text>Tipos de Produtos</Text>
        <Divider />
      </Box>
      <FlatListTipoProduto
        data={tipos_produtos}
        renderItem={ListRenderTipoProduto}
        keyExtractor={(item) => String(item.id)}
      />
    </Box>
  );
};
export default View;
