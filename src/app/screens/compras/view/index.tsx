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
} from '@gluestack-ui/themed';
import LoadingScreen from '@/components/LoadingScreen';
import { VisualizarCompraScreen } from '@/interfaces/compra';
import { ScrollView } from '@gluestack-ui/themed';
import { Button } from '@gluestack-ui/themed';
import { Box, ButtonText, Heading } from '@gluestack-ui/themed';
import { Formik } from 'formik';
import React from 'react';
import { Alert, ListRenderItem } from 'react-native';
const View: React.FC<VisualizarCompraScreen> = ({ navigation, route }) => {
  const [compras, setCompras] = React.useState<unknown[]>([{
    id: 1,
    
  }]);
  const [isLoading, setIsLoading] = React.useState(true);
  // async function start() {
  //   try {
  //     if (!isLoading) {
  //       setIsLoading(true);
  //     }
  //     setCompras([]);
  //     setIsLoading(false);
  //   } catch (error) {
  //     Alert.alert('Error', (error as Error).message);
  //     setIsLoading(false);
  //     throw error;
  //   }
  // }
  // React.useEffect(() => {
  //   start();
  // }, []);
  // if (isLoading) {
  //   return <LoadingScreen />;
  // }

  const ListRenderCompra: ListRenderItem<Compra> = ({ item }) => {
    return (
      <Card size="md" variant="elevated" m="$3">
        <HStack justifyContent="space-between">
          <Box gap="$2.5" w="$2/3">
            <Heading size="lg">{item.nome}</Heading>
            <Text size="md">{item.valor}</Text>
            <Text color={item.status === 'devendo' ? '$red600' : ''} size="md">
              {item.status}
            </Text>
          </Box>
          <Box gap="$5">
            <Button
              onPress={() =>
                navigation?.navigate('detalhes-venda', { id: String(item.id) })
              }
            >
              <ButtonIcon as={EyeIcon} />
            </Button>
          </Box>
        </HStack>
      </Card>
    );
  };



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
                      <FormControlErrorText>
                        {errors.tipo}
                      </FormControlErrorText>
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
                      <Button onPress={() => {}}>
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
        </Box>
      </Box>
      <ScrollView>
        <Box gap="$5"></Box>
      </ScrollView>
    </Box>
  );
};
export default View;
