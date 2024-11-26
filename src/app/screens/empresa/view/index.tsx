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
import { SearchIcon } from '@gluestack-ui/themed';
import { EmpresaFlatList } from '@/types/screens/empresa';
import { Alert, GestureResponderEvent, ListRenderItem } from 'react-native';
import { VisualizarEmpresaScreen } from '@/interfaces/empresa';
import { EmpresaService } from '@/classes/empresa/empresa.service';
import { useSQLiteContext } from 'expo-sqlite';
import { useIsFocused } from '@react-navigation/native';
import { mask } from '@/utils/mask';
import { EmpresaSearchRelatinalPessoa } from '@/classes/empresa/types';
import InputText from '@/components/Input';

const View: React.FC<VisualizarEmpresaScreen> = ({ navigation }) => {
  const focused = useIsFocused();
  const FlatListEmpresa = FlatList as EmpresaFlatList;
  const ListRenderEmpresa: ListRenderItem<EmpresaSearchRelatinalPessoa> = ({
    item,
  }) => {
    return (
      <Card size="md" variant="elevated" m="$3">
        <HStack justifyContent="space-between">
          <Box w="$2/3">
            {item.cnpj ? (
              <>
                <Heading mb="$1" size="md">
                  {item.nome_fantasia}
                </Heading>
                <Heading mb="$1" size="md">
                  {item.razao_social}
                </Heading>
              </>
            ) : (
              <Heading mb="$1" size="md">
                {item.nome_fantasia}
              </Heading>
            )}

            {item.cnpj ? (
              <Text mb="$1" size="sm">
                {mask(item.cnpj, 'cnpj')}
              </Text>
            ) : (
              <Text mb="$1" size="sm">
                {mask(item.cpf, 'cpf')}
              </Text>
            )}
          </Box>
          <Box gap="$5">
            <Button
              onPress={() =>
                navigation?.navigate('detalhes-empresa', { id: item.id })
              }
            >
              <ButtonIcon as={EyeIcon} />
            </Button>
          </Box>
        </HStack>
      </Card>
    );
  };
  const [empresas, setEmpresas] = React.useState<
    Array<EmpresaSearchRelatinalPessoa>
  >([]);
  const db = useSQLiteContext();

  async function start() {
    try {
      const emps = await new EmpresaService(db).getAllEmpresas();
      setEmpresas([...emps]);
    } catch (error) {
      Alert.alert('ERRO', (error as Error).message);
      throw error;
    }
  }

  React.useEffect(() => {
    if (focused) {
      start();
    }
  }, [focused]);

  return empresas.length < 1 ? (
    <Box h="$full" w="$full" alignItems="center" justifyContent="center">
      <Box gap="$5">
        <Heading textAlign="center">Empresas não encontradas</Heading>
        <Box>
          <Button onPress={() => navigation?.navigate('cadastrar-empresa')}>
            <ButtonText>Cadastrar Empresa</ButtonText>
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
            tipo: 'cpf' as 'cpf' | 'cnpj' | 'nome_pessoa' | 'nome_fantasia' | 'razao_social',
          }}
          onSubmit={async (value) => {
            try {
              const resut = await new EmpresaService(db).search(value.tipo, value.busca);
              setEmpresas(result);
            } catch (error) {
              Alert.alert("Erro", (error as Error).message);
            }
          }}
        >
          {({ values, errors, handleChange, handleSubmit, setFieldValue }) => {
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
                      Selecione o tipo de busca da empresa
                    </FormControlLabelText>
                  </FormControlLabel>
                  <Select
                    onValueChange={(text) => {
                      setFieldValue('tipo', text);
                    }}
                    initialLabel={'CPF'}
                    selectedValue={
                      values.tipo === 'cnpj' ? 
                        'CNPJ' : 
                        values.tipo === 'cpf' ? 
                          'CPF' : 
                          values.tipo === 'nome_fantasia' ? 
                            'Nome Fantasia' : 
                              values.tipo === 'nome_pessoa' ? 
                                'Nome Pessoa' : 
                                'Razão Social'
                    }
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
                          label="CPF"
                          value="cpf"
                          isPressed={values.tipo === 'cpf'}
                        />
                        <SelectItem
                          label="CNPJ"
                          value="cnpj"
                          isPressed={values.tipo === 'cnpj'}
                        />
                        <SelectItem
                          label="Nome da Pessoa"
                          value="nome_pessoa"
                          isPressed={values.tipo === 'nome_pessoa'}
                        />
                        <SelectItem
                          label="Nome Fantasia"
                          value="nome_fantasia"
                          isPressed={values.tipo === 'nome_fantasia'}
                        />
                        <SelectItem
                          label="Razão Social"
                          value="razao_social"
                          isPressed={values.tipo === 'razao_social'}
                        />
                      </SelectContent>
                    </SelectPortal>
                  </Select>

                  <FormControlHelper>
                    <FormControlHelperText>
                      Informe o tipo de pesquisa para de empresa.
                    </FormControlHelperText>
                  </FormControlHelper>

                  <FormControlError>
                    <FormControlErrorIcon as={AlertCircleIcon} />
                    <FormControlErrorText>
                      {errors.tipo}
                    </FormControlErrorText>
                  </FormControlError>
                </FormControl>
                {values.tipo === 'cnpj' || values.tipo === 'cpf' ? (
                  <>
                    <InputText
                      customType='search_input'
                      inputType={values.tipo}
                      onSubmitedValues={async (text) => { await setFieldValue('busca', text); handleSubmit(); }}
                      onChangeValue={handleChange('busca')}
                      error={errors.busca}
                      value={values.busca}
                    />
                  </>
                ) : (
                  <>
                    <FormControl
                      isInvalid={false}
                      size={'md'}
                      isDisabled={false}
                      isRequired={true}
                    >
                      <FormControlLabel>
                        <FormControlLabelText>{values.tipo === "nome_fantasia" ? "Nome Fantasia" : values.tipo === "nome_pessoa" ? "Nome" : "Razão Social"}</FormControlLabelText>
                      </FormControlLabel>
                      <Input>
                        <InputField
                          type="text"
                          value={values.busca}
                          placeholder={values.tipo === "nome_fantasia" ? "Nome Fantasia" : values.tipo === "nome_pessoa" ? "Nome" : "Razão Social"}
                          onChangeText={handleChange('busca')}
                        />
                        <Button onPress={handleSubmit as unknown as (event: GestureResponderEvent) => void}>
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
        <Button onPress={() => navigation?.navigate('cadastrar-empresa')}>
          <ButtonText>Cadastrar Empresas</ButtonText>
          <ButtonIcon ml="$5" as={AddIcon} />
        </Button>
      </Box>
      <Box w="$full" alignItems="center" gap="$5" my="$5">
        <Divider />
        <Text>Empresas</Text>
        <Divider />
      </Box>
      <FlatListEmpresa
        data={empresas}
        renderItem={ListRenderEmpresa}
        keyExtractor={(item) => String(item.id)}
      />
    </Box>
  );
};
export default View;
