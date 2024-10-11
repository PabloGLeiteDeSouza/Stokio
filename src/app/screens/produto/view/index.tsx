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
import { Produto, ProdutoFlatList } from '@/types/screens/produto';
import { Alert, ListRenderItem } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
const View: React.FC<VisualizarProdutoScreen> = ({ navigation }) => {
  const tipos_busca: Array<{
    label: string;
    value: string;
  }> = BuscasTipos;
  const [produtos, setProdutos] = React.useState<Array<Produto>>(Produtos);
  const FlatListProduto = FlatList as ProdutoFlatList;
  const ListRenderProduto: ListRenderItem<Produto> = ({ item }) => {
    return (
      <Card size="md" variant="elevated" m="$3">
        <HStack justifyContent="space-between">
          <Box w="$2/3" gap="$1">
            <Heading mb="$1" size="md">
              {item.nome}
            </Heading>
            <Text size="md">{item.data_validade}</Text>
            <Text size="md">{item.tipo}</Text>
            <Text size="md">{item.marca}</Text>
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
  const onCadastrarProduto = () => {
    // if (true) {
    //   Alert.alert('Erro', 'Não existem empresas cadastradas!');
    //   navigation?.navigate('screens-empresas');
    // } else if (true) {
    //   Alert.alert('Erro', 'Não existem marcas cadastradas!');
    //   navigation?.navigate('screens-empresas');
    // } else if (true) {
    //   Alert.alert('Erro', 'Não existem tipos de produtos cadastrados!');
    //   navigation?.navigate('screens-empresas');
    // } else {
    //   navigation?.navigate('cadastrar-produto');
    // }
    navigation?.navigate('cadastrar-produto');
  };
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
            tipo: 'nome',
          }}
          onSubmit={() => {}}
        >
          {({ values, handleChange, setFieldValue, errors }) => {
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
                      Selecione o tipo de busca da Produto
                    </FormControlLabelText>
                  </FormControlLabel>
                  <Select
                    onValueChange={(text) => {
                      setFieldValue('tipo', text);
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
                          />
                          <Button>
                            <ButtonIcon
                              as={(props: object) => (
                                <FontAwesome5 name="barcode" {...props} />
                              )}
                            />
                          </Button>
                        </Input>
                        <Button>
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
                        <FormControlErrorText>
                          Atleast 6 characters are required.
                        </FormControlErrorText>
                      </FormControlError>
                    </FormControl>
                  </>
                )}
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
