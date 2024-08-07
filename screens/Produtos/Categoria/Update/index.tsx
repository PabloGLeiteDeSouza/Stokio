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
  Center,
  Icon,
  CircleIcon,
  CheckIcon,
  AlertCircleIcon,
  ChevronDownIcon,
} from '@gluestack-ui/themed';
import { RootStackParamList } from '$types/index';
import { Box, Text } from '@gluestack-ui/themed';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Formik } from 'formik';
import { GestureResponderEvent } from 'react-native';
type EditarCategoriasScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'editar-categoria'
>;
type EditarCategoriasScreenRouteProp = RouteProp<
  RootStackParamList,
  'editar-categoria'
>;
interface EditarCategoriasScreenProps {
  navigation?: EditarCategoriasScreenNavigationProp;
  route?: EditarCategoriasScreenRouteProp;
}
const Update: React.FC<EditarCategoriasScreenProps> = ({
  navigation,
  route,
}) => {
  if (!route || !route.params || !route.params?.categoria) {
    return navigation?.goBack();
  }
  const categoria = route.params.categoria;
  return (
    <Box>
      <Text>Atualize os dados da categoria</Text>
      <Box>
        <Formik
          initialValues={{
            ...categoria,
          }}
          onSubmit={() => {
            console.log('Form submitted');
          }}
        >
          {({ values, handleChange, handleSubmit, errors }) => {
            return (
              <>
                <FormControl
                  isInvalid={errors.nome ? true : false}
                  size={'md'}
                  isDisabled={false}
                  isRequired={true}
                >
                  <FormControlLabel>
                    <FormControlLabelText>Nome</FormControlLabelText>
                  </FormControlLabel>
                  <Input>
                    <InputField
                      type="text"
                      value={values.nome}
                      placeholder="Nome"
                      onChangeText={handleChange('nome')}
                    />
                  </Input>

                  <FormControlHelper>
                    <FormControlHelperText>
                      Informe o nome que deve ser usado.
                    </FormControlHelperText>
                  </FormControlHelper>

                  <FormControlError>
                    <FormControlErrorIcon as={AlertCircleIcon} />
                    <FormControlErrorText>{errors.nome}</FormControlErrorText>
                  </FormControlError>
                </FormControl>
                <FormControl
                  isInvalid={errors.descricao ? true : false}
                  size={'md'}
                  isDisabled={false}
                  isRequired={true}
                >
                  <FormControlLabel>
                    <FormControlLabelText>Descrição</FormControlLabelText>
                  </FormControlLabel>
                  <Textarea>
                    <TextareaInput
                      placeholder="Descrição da catgoria do produo desejado!"
                      type="text"
                      value={values.descricao}
                      onChangeText={handleChange('descricao')}
                    />
                  </Textarea>

                  <FormControlHelper>
                    <FormControlHelperText>
                      Informe a descrição da categoria do produto desejado.
                    </FormControlHelperText>
                  </FormControlHelper>

                  <FormControlError>
                    <FormControlErrorIcon as={AlertCircleIcon} />
                    <FormControlErrorText>
                      {errors.descricao}
                    </FormControlErrorText>
                  </FormControlError>
                </FormControl>
                <Box>
                  <Button
                    onPress={
                      handleSubmit as unknown as (
                        event: GestureResponderEvent,
                      ) => void
                    }
                  >
                    <ButtonText>Atualizar</ButtonText>
                  </Button>
                </Box>
              </>
            );
          }}
        </Formik>
      </Box>
    </Box>
  );
};
export default Update;
