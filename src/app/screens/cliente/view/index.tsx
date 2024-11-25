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
} from '@gluestack-ui/themed';
import { Box } from '@gluestack-ui/themed';
import { Formik } from 'formik';
import { Card } from '@gluestack-ui/themed';
import { SearchIcon } from '@gluestack-ui/themed';
import { VisualizarClienteScreen } from '@/interfaces/cliente';
import { FlatList } from '@gluestack-ui/themed';
import { Alert, ListRenderItem } from 'react-native';
import { ClientFlatList } from './types';
import { useSQLiteContext } from 'expo-sqlite';
import { ClienteService } from '@/classes/cliente/cliente.service';
import { useIsFocused } from '@react-navigation/native';
import LoadingScreen from '@/components/LoadingScreen';
import { IClienteSimpleRequest } from '@/classes/cliente/interfaces';
import { mask } from '@/utils/mask';
import { getDateFromString } from '@/utils';

const View: React.FC<VisualizarClienteScreen> = ({ navigation, route }) => {
  const [clientes, setClientes] = React.useState<Array<IClienteSimpleRequest>>(
    [],
  );
  const [isLoading, setIsLoading] = React.useState(true);
  const db = useSQLiteContext();
  const focused = useIsFocused();

  const FlatListClient = FlatList as ClientFlatList;

  React.useEffect(() => {
    async function start() {
      try {
        const clientes = await new ClienteService(db).findAllClientes();
        setClientes([...clientes]);
        setIsLoading(false);
      } catch (error) {
        Alert.alert('Erro', (error as Error).message);
        setIsLoading(false);
      }
    }
    start();
  }, [focused]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  const ListRenderCliente: ListRenderItem<IClienteSimpleRequest> = ({
    item,
  }) => {
    return (
      <Card size="md" variant="elevated" m="$3">
        <HStack justifyContent="space-between">
          <Box w="$2/3" gap="$1.5">
            <Heading size="md">Nome</Heading>
            <Text size="sm">{item.nome}</Text>
            <Heading>Data de nascimento</Heading>
            <Text size="sm">
              {Intl.DateTimeFormat('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              }).format(item.data_nascimento)}
            </Text>
            <Heading size="md">CPF</Heading>
            <Text size="sm">{mask(item.cpf, 'cpf')}</Text>
            <Heading size="md" >Saldo</Heading>
            <Text color={ Number(item.saldo) < 100 ? '$red600' : '$green600' } size="sm">{mask(item.saldo.toString(), 'money')}</Text>
          </Box>
          <Box gap="$5">
            <Button
              onPress={() =>
                navigation?.navigate('detalhes-cliente', { id: item.id })
              }
            >
              <ButtonIcon as={EyeIcon} />
            </Button>
          </Box>
        </HStack>
      </Card>
    );
  };

  return clientes.length < 1 ? (
    <Box 
      h="$full" 
      w="$full" 
      alignItems="center" 
      justifyContent="center"
    >
      <Box gap="$5">
        <Heading textAlign="center">Clientes não encontrados</Heading>
        <Box>
          <Button onPress={() => navigation?.navigate('cadastrar-cliente')}>
            <ButtonText>Cadastrar Cliente</ButtonText>
            <ButtonIcon as={AddIcon} />
          </Button>
        </Box>
      </Box>
    </Box>
  ) : (
    <Box 
      w="$full" 
      h="$full" 
      px="$8" 
      py="$8"
    >
      <Box 
        gap="$5"
      >
        <Formik
          initialValues={{
            busca: '',
            tipo: '',
          }}
          onSubmit={async (values) => {
            try {
              
            } catch (error) {
              
            }
          }}
        >
          {({ values, errors, handleChange, setFieldValue }) => {
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
                      Selecione o tipo de busca do cliente
                    </FormControlLabelText>
                  </FormControlLabel>
                  <Select
                    selectedValue={values.tipo === 'cpf' ? 'CPF' : values.tipo === 'nome' ? 'NOME' : ''}
                    onValueChange={(text) => {
                      setFieldValue('tipo', text);
                    }}
                    initialLabel={values.tipo === 'cpf' ? 'CPF' : values.tipo === 'nome' ? 'NOME' : ''}
                    isInvalid={false}
                    isDisabled={false}
                  >
                    <SelectTrigger size="lg" variant={'rounded'}>
                      <SelectInput placeholder="Selecione uma opção" />
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
                          label="NOME"
                          value="nome"
                          isPressed={values.tipo === 'nome'}
                        />
                      </SelectContent>
                    </SelectPortal>
                  </Select>

                  <FormControlHelper>
                    <FormControlHelperText>
                      Selecione um tipo de busca para o cliente.
                    </FormControlHelperText>
                  </FormControlHelper>

                  <FormControlError>
                    <FormControlErrorIcon as={AlertCircleIcon} />
                    <FormControlErrorText>
                      {errors.tipo}
                    </FormControlErrorText>
                  </FormControlError>
                </FormControl>
                {values.tipo !== '' && (
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
                      <Button>
                        <ButtonIcon as={SearchIcon} />
                      </Button>
                    </Input>

                    <FormControlHelper>
                      <FormControlHelperText>
                        informe a forma de busca de acordo com o {values.tipo}.
                      </FormControlHelperText>
                    </FormControlHelper>

                    <FormControlError>
                      <FormControlErrorIcon as={AlertCircleIcon} />
                      <FormControlErrorText>
                        {errors.busca}
                      </FormControlErrorText>
                    </FormControlError>
                  </FormControl>
                )}
              </>
            );
          }}
        </Formik>
        <Button onPress={() => navigation?.navigate('cadastrar-cliente')}>
          <ButtonText>Cadastrar Cliente</ButtonText>
          <ButtonIcon ml="$5" as={AddIcon} />
        </Button>
      </Box>
      <Box w="$full" alignItems="center" gap="$5" my="$5">
        <Divider />
        <Text>Clientes</Text>
        <Divider />
      </Box>
      <FlatListClient
        data={clientes}
        renderItem={ListRenderCliente}
        keyExtractor={(vl, i) => i.toString()}
      />
    </Box>
  );
};
export default View;
