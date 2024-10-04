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
import Ramos from './pessoas.json';
import { SearchIcon } from '@gluestack-ui/themed';

const View: React.FC = () => {
  type Ramo = {
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

  const [ramos, setRamos] = React.useState<Array<Ramo>>(Ramos);

  return (
    <Box w="$full" px="$8" py="$8">
      <Box gap="$5">
        <Formik
          initialValues={{
            busca: '',
            tipo: '',
          }}
          onSubmit={() => {}}
        >
          {({ values, handleChange, errors }) => {
            return (
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
                      Informe o nome do Ramo que deseja buscar.
                    </FormControlHelperText>
                  </FormControlHelper>

                  <FormControlError>
                    <FormControlErrorIcon as={AlertCircleIcon} />
                    <FormControlErrorText>{errors.busca}</FormControlErrorText>
                  </FormControlError>
                </FormControl>
              </>
            );
          }}
        </Formik>
        <Button>
          <ButtonText>Cadastrar Ramos</ButtonText>
          <ButtonIcon ml="$5" as={AddIcon} />
        </Button>
      </Box>
      <Box w="$full" alignItems="center" gap="$5" my="$5">
        <Divider />
        <Text>Ramos</Text>
        <Divider />
      </Box>
      <ScrollView w="$full">
        <Box w="$full" mb={220}>
          {ramos.map((ramo, index) => (
            <Card key={index} size="md" variant="elevated" m="$3">
              <HStack justifyContent="space-between">
                <Box w="$2/3">
                  <Heading mb="$1" size="md">
                    {ramo.nome}
                  </Heading>
                  <Text size="sm">{ramo.data_nasc}</Text>
                  <Text size="sm">{ramo.cpf}</Text>
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
