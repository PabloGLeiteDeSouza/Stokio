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
import Empresas from './empresas.json';
import { SearchIcon } from '@gluestack-ui/themed';
import { Empresa, EmpresaFlatList } from '@/types/screens/empresa';
import { ListRenderItem } from 'react-native';
import { VisualizarEmpresaScreen } from '@/interfaces/empresa';

const View: React.FC<VisualizarEmpresaScreen> = ({ navigation }) => {
  const FlatListEmpresa = FlatList as EmpresaFlatList;
  const ListRenderEmpresa: ListRenderItem<Empresa> = ({ item }) => {
    return (
      <Card size="md" variant="elevated" m="$3">
        <HStack justifyContent="space-between">
          <Box w="$2/3">
            <Heading mb="$1" size="md">
              {item.nome_fantasia}
            </Heading>
            {item.cnpj ? (
              <Text mb="$1" size="sm">
                {item.cnpj}
              </Text>
            ) : (
              <Text mb="$1" size="sm">
                {item.cpf}
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
  const [empresas, setEmpresas] = React.useState<Array<Empresa>>(Empresas);

  return (
    <Box w="$full" h="$full" px="$8" py="$8">
      <Box gap="$5">
        <Formik
          initialValues={{
            busca: '',
            tipo: '',
          }}
        >
          {({ values, handleChange, setFieldValue }) => {
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
