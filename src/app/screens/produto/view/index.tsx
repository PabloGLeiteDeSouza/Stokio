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
import Produtos from './produtos.json';
import { SearchIcon } from '@gluestack-ui/themed';
import BuscasTipos from './busca_tipos_vendas.json';
import { VisualizarProdutoScreen } from '@/interfaces/produto';
import { ProdutoFlatList } from '@/types/screens/produto';
import { Alert, GestureResponderEvent, ListRenderItem } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useSQLiteContext } from 'expo-sqlite';
import { ProdutoService } from '@/classes/produto/produto.service';
import { Produto, ProdutoObjectRequestAll } from '@/classes/produto/interfaces';
import LoadingScreen from '@/components/LoadingScreen';
import { useIsFocused } from '@react-navigation/native';
import { getDateFromString } from '@/utils';
import InputDatePicker from '@/components/Custom/Inputs/DatePicker';
const View: React.FC<VisualizarProdutoScreen> = ({ navigation, route }) => {
  const tipos_busca: Array<{
    label: string;
    value: string;
  }> = BuscasTipos;
  const [produtos, setProdutos] = React.useState<Array<ProdutoObjectRequestAll>>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const isFocused = useIsFocused();
  const FlatListProduto = FlatList as ProdutoFlatList;
  const ListRenderProduto: ListRenderItem<ProdutoObjectRequestAll> = ({ item }) => {
    return (
      <Card size="md" variant="elevated" m="$3">
        <HStack justifyContent="space-between">
          <Box w="$2/3" gap="$1">
            <Box>
              <Heading>Nome</Heading>
              <Text size="md">{item.nome}</Text>
            </Box>
            <Box>
              <Heading>QTD</Heading>
              <Text size="md">{item.quantidade}</Text>
            </Box>
            <Box>
              <Heading>Data de validade</Heading>
              <Text size="md">{new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(getDateFromString(item.data_de_validade))}</Text>
            </Box>
            <Box>
              <Heading>Tipo do produto</Heading>
              <Text size="md">{item.tipo}</Text>
            </Box>
            <Box>
              <Heading>Marca do produto</Heading>
              <Text size="md">{item.marca}</Text>
            </Box>
          </Box>
          <Box gap="$5">
            <Button
              action="primary"
              onPress={() =>
                navigation?.navigate('detalhes-produto', {
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

  const db = useSQLiteContext();

  const StartScreen = async () => {
    try {
      const prodts = await new ProdutoService(db).getAllProdutosList();
      setProdutos(prodts);
      setIsLoading(false);
    } catch (err) {
      setProdutos([]);
      setIsLoading(false);
    }
  }

  React.useEffect(() => {
    if (isFocused) {
      StartScreen();
    }
  }, [isFocused])

  const onCadastrarProduto = () => {
    navigation?.navigate('cadastrar-produto');
  };

  if (isLoading) {
    return <LoadingScreen />
  }


  return produtos.length < 1 ? (
    <Box h="$full" w="$full" alignItems="center" justifyContent="center">
      <Box gap="$5">
        <Heading textAlign="center">Produtos não encontrados</Heading>
        <Box>
          <Button onPress={onCadastrarProduto}>
            <ButtonText>Cadastrar Produto</ButtonText>
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
            data_inicio: new Date(),
            data_fim: new Date(),
            tipo: 'nome' as 'nome' | 'tipo' | 'data_validade' | 'ua' | 'marca' | 'codigo_de_barras',
          }}
          onSubmit={async ({ busca, data_fim, data_inicio, tipo }) => {
            try{
              if(tipo === "data_validade"){
                const dados = await new ProdutoService(db).search(data_inicio, tipo, data_fim);
                setProdutos([...dados])
              } else {
                const dados = await new ProdutoService(db).search(busca, tipo);
                setProdutos([...dados]);
              }
            } catch(error) {
              Alert.alert('Error', (error as Error).message);
            }
          }}
        >
          {({ values, handleChange, handleSubmit, setFieldValue, errors }) => {
            React.useEffect(() => {
              if(route && route.params && route.params.code){
                setFieldValue('busca', route?.params?.code);
              }
            }, [route?.params?.code])
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
                      Selecione o tipo de busca da Produto
                    </FormControlLabelText>
                  </FormControlLabel>
                  <Select
                    onValueChange={(text) => {
                      setFieldValue('tipo', text);
                      setFieldValue('busca', '');
                      setFieldValue('data_inicio', new Date());
                      setFieldValue('data_fim', new Date());
                    }}
                    isInvalid={false}
                    isDisabled={false}
                    selectedValue={
                      tipos_busca.find((vl) => vl.value === values.tipo)?.label
                    }
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
                              key={`select-opcao-${i}`}
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
                      Selecione um tipo.
                    </FormControlHelperText>
                  </FormControlHelper>

                  <FormControlError>
                    <FormControlErrorIcon as={AlertCircleIcon} />
                    <FormControlErrorText>
                      {errors.tipo}
                    </FormControlErrorText>
                  </FormControlError>
                </FormControl>
                {values.tipo === "data_validade" &&(
                  <>
                    <InputDatePicker
                      title='Data de Inicio'
                      value={values.data_inicio}
                      onChangeDate={(date) => setFieldValue('data_inicio', date)}
                      error={errors.data_inicio}
                    />
                    <InputDatePicker
                      title='Data de Fim'
                      value={values.data_fim}
                      onChangeDate={(date) => setFieldValue('data_fim', date)}
                      error={errors.data_fim}
                    />
                    <Box>
                      <Button onPress={handleSubmit as unknown as (event: GestureResponderEvent) => void}>
                        <ButtonText>
                          Buscar
                        </ButtonText>
                      </Button>
                    </Box>
                  </>
                )}
                {values.tipo === 'codigo_de_barras' && (
                  <>
                    <FormControl
                      isInvalid={false}
                      size={'md'}
                      isDisabled={false}
                      isRequired={true}
                    >
                      <FormControlLabel>
                        <FormControlLabelText>
                          Buscar por codigo de barras
                        </FormControlLabelText>
                      </FormControlLabel>
                      <HStack space="sm">
                        <Input w="$4/5">
                          <InputField
                            type="text"
                            placeholder="codigo de barras"
                            value={values.busca}
                            onChangeText={handleChange('busca')}
                          />
                          <Button onPress={() => navigation?.navigate('code-scanner', { screen: 'visualizar-produtos' })}>
                            <ButtonIcon
                              as={(props: object) => (
                                <FontAwesome5 name="barcode" {...props} />
                              )}
                            />
                          </Button>
                        </Input>
                        <Button onPress={handleSubmit as unknown as (event: GestureResponderEvent) => void}>
                          <ButtonIcon as={SearchIcon} />
                        </Button>
                      </HStack>

                      <FormControlHelper>
                        <FormControlHelperText>
                          Informe um codigo de barras.
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
                {values.tipo === 'nome' || values.tipo === 'marca' || values.tipo === "ua" || values.tipo == "tipo" ? (
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
                          { values.tipo === "nome" ? "Infrome o nome do produto" : values.tipo === "marca" ? "Informe a marca do produto" : values.tipo === "ua" ? "Informe a o nome da unidade de armazenamento do produto" : "Informe o tipo do produto"}
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
                ) : (<></>)}
              </>
            );
          }}
        </Formik>
        <Button onPress={onCadastrarProduto}>
          <ButtonText>Cadastrar Produto</ButtonText>
          <ButtonIcon ml="$5" as={AddIcon} />
        </Button>
      </Box>
      <Box w="$full" alignItems="center" gap="$5" my="$5">
        <Divider />
        <Text>Produtos</Text>
        <Divider />
      </Box>
      <FlatListProduto
        data={produtos}
        renderItem={ListRenderProduto}
        keyExtractor={(v) => String(v.id)}
      />
    </Box>
  );
};
export default View;
