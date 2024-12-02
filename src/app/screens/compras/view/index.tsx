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
  ButtonIcon,
  SearchIcon,
  Card,
  EyeIcon,
  FlatList,
} from '@gluestack-ui/themed';
import LoadingScreen from '@/components/LoadingScreen';
import { VisualizarCompraScreen } from '@/interfaces/compra';
import { ScrollView } from '@gluestack-ui/themed';
import { Button } from '@gluestack-ui/themed';
import { Box, ButtonText, Heading } from '@gluestack-ui/themed';
import { Formik } from 'formik';
import React from 'react';
import { Alert, GestureResponderEvent, ListRenderItem } from 'react-native';
import { CompraFlatList } from '@/types/screens/compra';
import { CompraViewObject } from '@/classes/compra/interfaces';
import CompraService from '@/classes/compra/compra.service';
import { useSQLiteContext } from 'expo-sqlite';
import { mask } from '@/utils/mask';
import { useIsFocused } from '@react-navigation/native';
import InputDatePicker from '@/components/Custom/Inputs/DatePicker';
import InputText from '@/components/Input';
const View: React.FC<VisualizarCompraScreen> = ({ navigation, route }) => {
  const [compras, setCompras] = React.useState<CompraViewObject[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const db = useSQLiteContext();
  const isFocused = useIsFocused();
  async function start() {
    try {
      if (!isLoading) {
        setIsLoading(true);
      }
      const comprs = await new CompraService(db).findAll();
      console.log('compras', comprs);
      setCompras([...comprs]);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  }
  React.useEffect(() => {
    if(isFocused){
      start();
    }
  }, [isFocused]);
  if (isLoading) {
    return <LoadingScreen />;
  }

  const ListRenderCompra: ListRenderItem<CompraViewObject> = ({ item, index }) => {
    return (
      <Card size="md" variant="elevated" mx="$8" mt={index === 1 ? "$5" : "$0"} mb={"$5"}>
        <HStack justifyContent="space-between">
          <Box gap="$2.5" w="$2/3">
            <Heading size="lg">{item.nome_empresa}</Heading>
            <Text size="md">{new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(item.data)}</Text>
            <Text>{mask(item.valor_compra.toString(), 'money')}</Text>
            <Text color={item.status === 'pendente' ? '$red600' : '$green600'} size="md">
              {item.status}
            </Text>
          </Box>
          <Box gap="$5">
            <Button
              onPress={() =>
                navigation?.navigate('detalhes-compra', { id: item.id })
              }
            >
              <ButtonIcon as={EyeIcon} />
            </Button>
          </Box>
        </HStack>
      </Card>
    );
  };

  const FlatListCompra = FlatList as CompraFlatList;

  if(isLoading){
    return <LoadingScreen />
  }

  return compras.length < 1 ? (
    <Box h="$full" w="$full" alignItems="center" justifyContent="center">
      <Box gap="$5">
        <Heading>Não ha compras cadastradas</Heading>
        <Button onPress={() => navigation?.navigate('cadastrar-compra')}>
          <ButtonText>Cadastrar Compra</ButtonText>
        </Button>
      </Box>
    </Box>
  ) : (
    <Box w="$full" h="$full">
      <Box mx="$5" my="$8">
        <Box gap="$5">
          <Formik
            initialValues={{
              busca: '',
              tipo: 'nome_empresa' as 'data' | 'nome_empresa' | 'status',
              data_inicio: new Date(),
              data_final: new Date(),
            }}
            onSubmit={async ({busca, tipo, data_inicio, data_final}) => {
              try {
                if (tipo === "data") {
                  const compras = await new CompraService(db).search(data_inicio, tipo, data_final);
                  setCompras(compras);
                } else {
                  const compras = await new CompraService(db).search(busca, tipo);
                }
              } catch (error) {
                Alert.alert('Erro', (error as Error).message);
              }
            }}
          >
            {({ values, errors, setFieldValue, handleChange, handleSubmit }) => {
              return (
                <>
                  <FormControl
                    isInvalid={errors.tipo ? true : false}
                    size={'md'}
                    isDisabled={false}
                    isRequired={true}
                  >
                    <FormControlLabel>
                      <FormControlLabelText>
                        Selecione o tipo de busca
                      </FormControlLabelText>
                    </FormControlLabel>
                    <Select
                      isInvalid={errors.tipo ? true : false}
                      isDisabled={false}
                      initialLabel='Nome da Empresa'
                      selectedValue={values.tipo === "data" ? "Data da compra" : values.tipo === "nome_empresa" ? "Nome da Empresa" : "Status"}
                      onValueChange={(text) => {
                        setFieldValue('tipo', text);
                        setFieldValue('busca', '');
                        setFieldValue('data_inicio', new Date());
                        setFieldValue('data_final', new Date());
                      }}
                    >
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
                          <SelectItem 
                            label="Nome da Empresa" 
                            value="nome_empresa" 
                            isPressed={values.tipo === "nome_empresa"}
                          />
                          <SelectItem
                            label="Data da compra"
                            value="data"
                            isPressed={values.tipo === "data"}
                          />
                          <SelectItem
                            label="Status"
                            value="status"
                            isPressed={values.tipo === "status"}
                          />
                        </SelectContent>
                      </SelectPortal>
                    </Select>

                    <FormControlHelper>
                      <FormControlHelperText>
                        Selecione o tipo de busca desejado.
                      </FormControlHelperText>
                    </FormControlHelper>

                    <FormControlError>
                      <FormControlErrorIcon as={AlertCircleIcon} />
                      <FormControlErrorText>{errors.tipo}</FormControlErrorText>
                    </FormControlError>
                  </FormControl>
                  {values.tipo !== "data" && (
                    <>
                      {values.tipo === "nome_empresa" && (
                        <>
                          <FormControl
                            isInvalid={errors.busca ? true : false}
                            size={'md'}
                            isDisabled={false}
                            isRequired={true}
                          >
                            <FormControlLabel>
                              <FormControlLabelText>Informe o nome da empresa</FormControlLabelText>
                            </FormControlLabel>
                            <Input>
                              <InputField
                                type="text"
                                value={values.busca}
                                placeholder="Busca...."
                                onChangeText={handleChange('busca')}
                              />
                              <Button onPress={handleSubmit as unknown as (event: GestureResponderEvent) => void}>
                                <ButtonIcon as={SearchIcon} />
                              </Button>
                            </Input>

                            <FormControlHelper>
                              <FormControlHelperText>
                                Insira o Nome da Empresa da venda.
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
                      {values.tipo === "status" && (
                        <Box gap="$5">
                          <FormControl
                            isInvalid={errors.tipo ? true : false}
                            size={'md'}
                            isDisabled={false}
                            isRequired={true}
                          >
                            <FormControlLabel>
                              <FormControlLabelText>
                                Selecione o tipo de status
                              </FormControlLabelText>
                            </FormControlLabel>
                            <Select
                              isInvalid={errors.tipo ? true : false}
                              isDisabled={false}
                              initialLabel={values.busca === "pago" ? "Pago" : values.busca === "devendo" ? "Devendo" : ""}
                              selectedValue={values.busca === "pago" ? "Pago" : values.busca === "devendo" ? "Devendo" : ""}
                              onValueChange={handleChange('busca')}
                            >
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
                                  <SelectItem 
                                    label="Pago" 
                                    value="pago" 
                                    isPressed={values.busca === "pago"}
                                  />
                                  <SelectItem
                                    label="Devendo"
                                    value="devendo"
                                    isPressed={values.busca === "devendo"}
                                  />
                                </SelectContent>
                              </SelectPortal>
                            </Select>

                            <FormControlHelper>
                              <FormControlHelperText>
                                Selecione o status da compra desejada.
                              </FormControlHelperText>
                            </FormControlHelper>

                            <FormControlError>
                              <FormControlErrorIcon as={AlertCircleIcon} />
                              <FormControlErrorText>{errors.tipo}</FormControlErrorText>
                            </FormControlError>
                          </FormControl>
                          <Box>
                            <Button onPress={handleSubmit as unknown as (event: GestureResponderEvent) => void}>
                              <ButtonText>
                                Buscar
                              </ButtonText>
                            </Button>
                          </Box>
                        </Box>
                      )}
                    </>
                  )}
                  {values.tipo === "data" && (
                    <Box gap="$5">
                      <InputDatePicker
                        onChangeDate={(dt) => setFieldValue('data_inicio', dt)}
                        title='Data inicial'
                        value={values.data_inicio}
                      />
                      <InputDatePicker
                        onChangeDate={(dt) => setFieldValue('data_final', dt)}
                        title='Data final'
                        value={values.data_final}
                        minimumDate={values.data_inicio}
                      />
                      <Box>
                        <Button onPress={handleSubmit as unknown as (event: GestureResponderEvent) => void}>
                          <ButtonText>
                            Buscar
                          </ButtonText>
                        </Button>
                      </Box>
                    </Box>
                  )}
                </>
              );
            }}
          </Formik>
          <Box>
            <Button onPress={() => navigation?.navigate('cadastrar-compra')}>
              <ButtonText>Cadastrar Compra</ButtonText>
            </Button>
          </Box>
        </Box>
      </Box>
      <FlatListCompra
        data={compras}
        renderItem={ListRenderCompra}
        keyExtractor={(c) => String(c.id)}
        refreshing={isLoading}
        onRefresh={() => {
          start();
        }}
      />
    </Box>
  );
};
export default View;
