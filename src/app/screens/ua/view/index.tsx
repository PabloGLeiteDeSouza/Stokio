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
import Uas from './uas.json';
import { SearchIcon } from '@gluestack-ui/themed';
import { Ua, UaFlatList } from '@/types/screens/ua';
import { Alert, GestureResponderEvent, ListRenderItem } from 'react-native';
import { VisualizarUaScreen } from '@/interfaces/ua';
import { useSQLiteContext } from 'expo-sqlite';
import UaService from '@/classes/ua/ua.service';
import { useIsFocused } from '@react-navigation/native';
import { TipoUaUpdate } from '@/classes/tipo_ua/interfaces';
import TipoUaService from '@/classes/tipo_ua/tipo_ua.service';
import { TipoUaFlatList } from '@/types/screens/tipo-ua';

const View: React.FC<VisualizarUaScreen> = ({ navigation }) => {

  const FlatListUa = FlatList as UaFlatList;

  const FlatListTipoUa = FlatList as TipoUaFlatList;

  const [uas, setUas] = React.useState<Ua[]>([]);
  const [tiposUas, setTiposUas] = React.useState<TipoUaUpdate[]>([])
  const [isLoading, setIsLoading] = React.useState(true);
  const db = useSQLiteContext();
  const isFocused = useIsFocused();

  const ListRenderUa: ListRenderItem<Ua> = ({ item }) => {
    return (
      <Card size="md" variant="elevated" m="$3">
        <HStack justifyContent="space-between">
          <Box w="$2/3">
            <Heading mb="$1" size="md">
              {item.nome}
            </Heading>
            <Text size="sm">{item.tipo}</Text>
          </Box>
          <Box gap="$5">
            <Button
              onPress={() =>
                navigation?.navigate('detalhes-ua', { id: item.id })
              }
            >
              <ButtonIcon as={EyeIcon} />
            </Button>
          </Box>
        </HStack>
      </Card>
    );
  };

  const ListRenderSelectTipoUa: ListRenderItem<TipoUaUpdate> = ({ item }) => {
    return (
      <SelectItem label={item.nome} value={item.id.toString()} />
    )
  }

  async function start() {
    const data = await new UaService(db).findAll();
    const tipoUas = await new TipoUaService(db).getAll();
    setUas([...data]);
    setTiposUas([...tipoUas]);
  }

  React.useEffect(() => {
    start();
  }, [isFocused])

  return uas.length < 1 ? (
    <Box h="$full" w="$full" alignItems="center" justifyContent="center">
      <Box gap="$5">
        <Heading textAlign="center">
          Unidades de Armazenamento não encontradas
        </Heading>
        <Box>
          <Button onPress={() => navigation?.navigate('cadastrar-ua')}>
            <ButtonText>Cadastrar Ua</ButtonText>
            <ButtonIcon as={AddIcon} />
          </Button>
        </Box>
      </Box>
    </Box>
  ) : (
    <Box w="$full" h="$full" px="$8" py="$8">
      <Box gap="$5">
        <Formik
          initialValues={{
            busca: '',
            tipo: 'nome' as 'nome' | 'tipo',
            id_tipo_ua: 0,
          }}
          onSubmit={async (values) => {
            try {
              if(values.tipo === "nome"){
                const data = await new UaService(db).findUaByNome(values.busca);
                setUas([...data]);
              } else {
                const data = await new UaService(db).findUaByTipo(values.id_tipo_ua);
                setUas([...data]);
              }
            } catch (error) {
              Alert.alert('Erro', (error as Error).message);
            }
            
          }}
        >
          {({ values, handleChange, setFieldValue, handleSubmit, errors }) => {
            return (
              <>
                <FormControl
                  isInvalid={false}
                  size={'md'}
                  isDisabled={false}
                  isRequired={true}
                >
                  <FormControlLabel>
                    <FormControlLabelText>
                      Selecione o tipo de busca da uas
                    </FormControlLabelText>
                  </FormControlLabel>
                  <Select
                    onValueChange={(text) => {
                      setFieldValue('tipo', text);
                    }}
                    defaultValue={values.tipo}
                    initialLabel={values.tipo === "nome" ? "Nome" : "Tipo"}
                    selectedValue={values.tipo === "nome" ? "Nome" : "Tipo"}
                    isInvalid={false}
                    isDisabled={false}
                  >
                    <SelectTrigger size="lg" variant={'rounded'}>
                      <SelectInput placeholder="Selecione uma opcao" />
                      <SelectIcon mr={'$3'} ml={0} as={ChevronDownIcon} />
                    </SelectTrigger>
                    <SelectPortal>
                      <SelectBackdrop />
                      <SelectContent>
                        <SelectDragIndicatorWrapper>
                          <SelectDragIndicator />
                        </SelectDragIndicatorWrapper>
                        <SelectItem
                          label="nome"
                          value="nome"
                          isPressed={values.tipo === 'nome'}
                        />
                        <SelectItem
                          label="tipo"
                          value="tipo"
                          isPressed={values.tipo === 'tipo'}
                        />
                      </SelectContent>
                    </SelectPortal>
                  </Select>

                  <FormControlHelper>
                    <FormControlHelperText>
                      Selecione uma opcao.
                    </FormControlHelperText>
                  </FormControlHelper>

                  <FormControlError>
                    <FormControlErrorIcon as={AlertCircleIcon} />
                    <FormControlErrorText>{errors.tipo}</FormControlErrorText>
                  </FormControlError>
                </FormControl>
                {values.tipo === 'nome' && (
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
                        <Button onPress={handleSubmit as unknown as (event: GestureResponderEvent) => void}>
                          <ButtonIcon as={SearchIcon} />
                        </Button>
                      </Input>

                      <FormControlHelper>
                        <FormControlHelperText>
                          Infrome o nome da unidade de armazenamento.
                        </FormControlHelperText>
                      </FormControlHelper>

                      <FormControlError>
                        <FormControlErrorIcon as={AlertCircleIcon} />
                        <FormControlErrorText>
                          {errors.busca}
                        </FormControlErrorText>
                      </FormControlError>
                    </FormControl>
                  </>
                )}
                {values.tipo === 'tipo' && (
                  <>
                    <FormControl
                      isInvalid={false}
                      size={'md'}
                      isDisabled={false}
                      isRequired={true}
                    >
                      <FormControlLabel>
                        <FormControlLabelText>Selecione o tipo</FormControlLabelText>
                      </FormControlLabel>
                      <Select onValueChange={(vl) => setFieldValue('id_tipo_ua', Number(vl))} isInvalid={false} isDisabled={false}>
                        <SelectTrigger size={'lg'} variant={'rounded'}>
                          <SelectInput placeholder="Select option" />
                          <SelectIcon mr={'$3'} ml={0} as={ChevronDownIcon} />
                        </SelectTrigger>
                          <SelectPortal>
                            <SelectBackdrop />
                            <SelectContent>
                              <SelectDragIndicatorWrapper>
                                <SelectDragIndicator />
                              </SelectDragIndicatorWrapper>
                              <FlatListTipoUa
                                w="$full"
                                data={tiposUas}
                                renderItem={ListRenderSelectTipoUa}
                                keyExtractor={(item) => item.id.toString()}
                              />
                            </SelectContent>
                          </SelectPortal>
                      </Select>

                      <FormControlHelper>
                        <FormControlHelperText>
                          Selecione um tipo.
                        </FormControlHelperText>
                      </FormControlHelper>

                      <FormControlError>
                        <FormControlErrorIcon as={AlertCircleIcon} />
                        <FormControlErrorText>
                          {errors.id_tipo_ua}
                        </FormControlErrorText>
                      </FormControlError>
                    </FormControl>
                    <Box>
                      <Button onPress={handleSubmit as unknown as (event: GestureResponderEvent) => void}>
                        <ButtonText>Buscar</ButtonText>
                      </Button>
                    </Box>
                  </>
                )}
              </>
            );
          }}
        </Formik>
        <Button onPress={() => navigation?.navigate('cadastrar-ua')}>
          <ButtonText>Cadastrar UAs</ButtonText>
          <ButtonIcon ml="$5" as={AddIcon} />
        </Button>
      </Box>
      <Box w="$full" alignItems="center" gap="$5" my="$5">
        <Divider />
        <Text>UAs</Text>
        <Divider />
      </Box>
      <FlatListUa
        data={uas}
        renderItem={ListRenderUa}
        keyExtractor={(v, i) => i.toString()}
      />
    </Box>
  );
};
export default View;
