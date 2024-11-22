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
              tipo: '',
              data_inicio: '',
              data_fim: '',
            }}
            onSubmit={async () => {}}
          >
            {({ values, errors, handleChange, handleBlur, handleSubmit }) => {
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
                          <SelectItem label="UX Research" value="UX Research" />
                          <SelectItem
                            label="Web Development"
                            value="Web Development"
                          />
                          <SelectItem
                            label="Cross Platform Development Process"
                            value="Cross Platform Development Process"
                          />
                          <SelectItem
                            label="UI Designing"
                            value="UI Designing"
                            isDisabled={true}
                          />
                          <SelectItem
                            label="Backend Development"
                            value="Backend Development"
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
                        placeholder="Busca...."
                        onChangeText={handleChange('busca')}
                      />
                      <Button onPress={handleSubmit as unknown as (event: GestureResponderEvent) => void}>
                        <ButtonIcon as={SearchIcon} />
                      </Button>
                    </Input>

                    <FormControlHelper>
                      <FormControlHelperText>
                        Insira o que deve ser buscado.
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
