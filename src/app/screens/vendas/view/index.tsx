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
  EyeIcon,
  FlatList,
} from '@gluestack-ui/themed';
import { Box, ScrollView } from '@gluestack-ui/themed';
import { Formik } from 'formik';
import { Card } from '@gluestack-ui/themed';
import { EditIcon } from '@gluestack-ui/themed';
import Vendas from './vendas.json';
import { SearchIcon } from '@gluestack-ui/themed';
import BuscasTipos from './busca_tipos_vendas.json';
import { Venda, VendaFlatList } from '@/types/screens/venda';
import { Alert, GestureResponderEvent, ListRenderItem } from 'react-native';
import { VisualizarVendaScreen } from '@/interfaces/venda';
import VendaService from '@/classes/venda/venda.service';
import { useSQLiteContext } from 'expo-sqlite';
import LoadingScreen from '@/components/LoadingScreen';
import { mask } from '@/utils/mask';
import { useIsFocused } from '@react-navigation/native';
import InputDatePicker from '@/components/Custom/Inputs/DatePicker';
import InputText from '@/components/Input';
const View: React.FC<VisualizarVendaScreen> = ({ navigation }) => {
  const tipos_busca: Array<{
    label: string;
    value: string;
  }> = BuscasTipos;
  const [vendas, setVendas] = React.useState<Array<Venda>>([]);
  const [loadingVendas, setLoadingVendas] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(true);
  const db = useSQLiteContext();
  const FlatListVenda = FlatList as VendaFlatList;
  const isFocused = useIsFocused();
  const ListRenderVenda: ListRenderItem<Venda> = ({ item }) => {
    return (
      <Card size="md" variant="elevated" m="$3">
        <HStack justifyContent="space-between">
          <Box gap="$2.5" w="$2/3">
            <Heading size="lg">{item.nome}</Heading>
            <Text size="md">{mask(item.valor.toString(), 'money')}</Text>
            <Text>
              {new Intl.DateTimeFormat('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              }).format(item.data_venda)}
            </Text>
            <Text
              color={item.status === 'devendo' ? '$red600' : '$green600'}
              size="md"
            >
              {item.status}
            </Text>
          </Box>
          <Box gap="$5">
            <Button
              onPress={() =>
                navigation?.navigate('detalhes-venda', {
                  id: item.id,
                })
              }
            >
              <ButtonIcon as={EyeIcon} />
            </Button>
          </Box>
        </HStack>
      </Card>
    );
  };
  const Start = async () => {
    try {
      const vendas = await new VendaService(db).search();
      setVendas(vendas);
      setLoadingVendas(false);
      setIsLoading(false);
    } catch (error) {
      setVendas([]);
      setLoadingVendas(false);
      setIsLoading(false);
    }
  };
  React.useEffect(() => {
    if (isFocused) {
      Start();
    }
  }, [isFocused]);
  if (isLoading) {
    return <LoadingScreen />;
  }
  return vendas.length < 1 ? (
    <Box h="$full" w="$full" alignItems="center" justifyContent="center">
      <Box gap="$5">
        <Heading textAlign="center">Vendas não encontradas</Heading>
        <Box>
          <Button onPress={() => navigation?.navigate('cadastrar-venda')}>
            <ButtonText>Cadastrar Venda</ButtonText>
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
            data_inicial: new Date(),
            data_final: new Date(),
            tipo: '' as 'data' | 'status' | 'valor' | 'nome_pessoa',
          }}
          onSubmit={async (values) => {
            try {
              if (values.tipo === 'data') {
                const vendas = await new VendaService(db).search(
                  values.data_inicial,
                  values.tipo,
                  values.data_final,
                );
                return setVendas(vendas);
              }
              const vendas = await new VendaService(db).search(
                values.busca,
                values.tipo,
              );
              setVendas(vendas);
            } catch (error) {
              Alert.alert('Erro', (error as Error).message);
            }
          }}
        >
          {({ values, errors, handleChange, handleSubmit, setFieldValue }) => {
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
                      Selecione o tipo de busca da Venda
                    </FormControlLabelText>
                  </FormControlLabel>
                  <Select
                    onValueChange={(text) => {
                      setFieldValue('tipo', text);
                      setFieldValue('busca', '');
                      setFieldValue('data_inicial', new Date());
                      setFieldValue('data_final', new Date());
                    }}
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
                        {tipos_busca.map((item, i) => {
                          return (
                            <SelectItem
                              key={i}
                              label={item.label}
                              value={item.value}
                              isPressed={item.value === values.tipo}
                            />
                          );
                        })}
                      </SelectContent>
                    </SelectPortal>
                  </Select>

                  <FormControlHelper>
                    <FormControlHelperText>
                      Selecione um tipo para a busca da venda.
                    </FormControlHelperText>
                  </FormControlHelper>

                  <FormControlError>
                    <FormControlErrorIcon as={AlertCircleIcon} />
                    <FormControlErrorText>{errors.tipo}</FormControlErrorText>
                  </FormControlError>
                </FormControl>
                {values.tipo === 'valor' && (
                  <Box gap="$2.5">
                    <InputText
                      title="Valor da Venda"
                      inputType="money"
                      value={values.busca}
                      onChangeValue={handleChange('busca')}
                      error={errors.busca}
                    />
                    <Box>
                      <Button
                        onPress={
                          handleSubmit as unknown as (
                            event: GestureResponderEvent,
                          ) => void
                        }
                      >
                        <ButtonText>Buscar</ButtonText>
                      </Button>
                    </Box>
                  </Box>
                )}
                {values.tipo === 'nome_pessoa' && (
                  <>
                    <FormControl
                      isInvalid={errors.busca ? true : false}
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
                        <Button
                          onPress={
                            handleSubmit as unknown as (
                              event: GestureResponderEvent,
                            ) => void
                          }
                        >
                          <ButtonIcon as={SearchIcon} />
                        </Button>
                      </Input>

                      <FormControlHelper>
                        <FormControlHelperText>
                          Informe o nome do cliente correto para a busca.
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
                {values.tipo === 'data' && (
                  <Box>
                    <InputDatePicker
                      onChangeDate={(dt) => setFieldValue('data_inicial', dt)}
                      title="Data inicial"
                      value={values.data_inicial}
                    />
                    <InputDatePicker
                      onChangeDate={(dt) => setFieldValue('data_final', dt)}
                      title="Data final"
                      value={values.data_final}
                      minimumDate={values.data_inicial}
                    />
                    <Box>
                      <Button
                        onPress={
                          handleSubmit as unknown as (
                            event: GestureResponderEvent,
                          ) => void
                        }
                      >
                        <ButtonText>Buscar</ButtonText>
                      </Button>
                    </Box>
                  </Box>
                )}
                {values.tipo === 'status' && (
                  <Box>
                    <FormControl
                      isInvalid={errors.busca ? true : false}
                      size={'md'}
                      isDisabled={false}
                      isRequired={true}
                    >
                      <FormControlLabel>
                        <FormControlLabelText>Selecione o status:</FormControlLabelText>
                      </FormControlLabel>

                      <Select
                        isInvalid={errors.busca ? true : false}
                        isDisabled={false}
                        initialLabel=""
                        selectedValue={values.busca === 'pago' ? "Pago" : values.busca === 'devendo' ? "Devendo" : ""}
                      >
                        <SelectTrigger size={'lg'} variant={'rounded'}>
                          <SelectInput placeholder="Selecione uma opcao" />
                          <SelectIcon
                            mr={'$3'}
                            ml={0}
                            as={ChevronDownIcon}
                          />
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
                          Selecione uma opcao para buscar
                        </FormControlHelperText>
                      </FormControlHelper>

                      <FormControlError>
                        <FormControlErrorIcon as={AlertCircleIcon} />
                        <FormControlErrorText>
                          {errors.busca}
                        </FormControlErrorText>
                      </FormControlError>
                    </FormControl>
                  </Box>
                )}
              </>
            );
          }}
        </Formik>
        <Button onPress={() => navigation?.navigate('cadastrar-venda')}>
          <ButtonText>Cadastrar Venda</ButtonText>
          <ButtonIcon ml="$5" as={AddIcon} />
        </Button>
      </Box>
      <Box w="$full" alignItems="center" gap="$5" my="$5">
        <Divider />
        <Text>Vendas</Text>
        <Divider />
      </Box>
      <FlatListVenda
        data={vendas}
        renderItem={ListRenderVenda}
        keyExtractor={(item) => String(item.id)}
        refreshing={loadingVendas}
        onRefresh={() => {
          setLoadingVendas(true);
          setTimeout(() => {
            setLoadingVendas(false);
          }, 2000);
        }}
      />
    </Box>
  );
};
export default View;
