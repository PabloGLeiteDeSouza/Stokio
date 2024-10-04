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
} from '@gluestack-ui/themed';
import { Box, ScrollView } from '@gluestack-ui/themed';
import { Formik } from 'formik';
import { Card } from '@gluestack-ui/themed';
import { EditIcon } from '@gluestack-ui/themed';
import Uas from './pessoas.json';
import { SearchIcon } from '@gluestack-ui/themed';

const View: React.FC = () => {
  type Ua = {
    nome: string;
    idade: number;
    cpf: string;
    rg: string;
    data_nasc: string;
    sexo: string;
    signo: string;
    mae: string;
    pai: string;
    email: string;
    senha: string;
    cep: string;
    endereco: string;
    numero: number;
    bairro: string;
    cidade: string;
    estado: string;
    telefone_fixo: string;
    celular: string;
    altura: string;
    peso: number;
    tipo_sanguineo: string;
    cor: string;
  };

  const [uas, setUas] = React.useState<Array<Ua>>(Uas);

  return (
    <Box w="$full" px="$8" py="$8">
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
        <Button>
          <ButtonText>Cadastrar UAs</ButtonText>
          <ButtonIcon ml="$5" as={AddIcon} />
        </Button>
      </Box>
      <Box w="$full" alignItems="center" gap="$5" my="$5">
        <Divider />
        <Text>UAs</Text>
        <Divider />
      </Box>
      <ScrollView w="$full">
        <Box w="$full" mb={330}>
          {uas.map((ua, index) => (
            <Card key={index} size="md" variant="elevated" m="$3">
              <HStack justifyContent="space-between">
                <Box w="$2/3">
                  <Heading mb="$1" size="md">
                    {ua.nome}
                  </Heading>
                  <Text size="sm">{ua.data_nasc}</Text>
                  <Text size="sm">{ua.cpf}</Text>
                </Box>
                <Box gap="$5">
                  <Button action="negative">
                    <ButtonIcon as={TrashIcon} />
                  </Button>
                  <Button>
                    <ButtonIcon as={EditIcon} />
                  </Button>
                </Box>
              </HStack>
            </Card>
          ))}
        </Box>
      </ScrollView>
    </Box>
  );
};
export default View;
