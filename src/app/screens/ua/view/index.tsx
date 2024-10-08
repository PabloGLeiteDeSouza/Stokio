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
import { ListRenderItem } from 'react-native';
import { VisualizarUaScreen } from '@/interfaces/ua';

const View: React.FC<VisualizarUaScreen> = ({ navigation }) => {
  const FlatListUa = FlatList as UaFlatList;

  const [uas, setUas] = React.useState<Array<Ua>>(Uas);

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
            tipo: '',
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
                      Selecione o tipo de busca da uas
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
                          onChangeText={handleChange('buscar')}
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
                        <FormControlLabelText>Password</FormControlLabelText>
                      </FormControlLabel>
                      <Select isInvalid={false} isDisabled={false}>
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
                              label="UX Research"
                              value="UX Research"
                            />
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
                    <Box>
                      <Button>
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
