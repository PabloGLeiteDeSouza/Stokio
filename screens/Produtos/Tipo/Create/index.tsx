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
} from '@gluestack-ui/themed';

import { Box, ScrollView } from '@gluestack-ui/themed';
import { Formik } from 'formik';
import { CadastrarTiposDeProdutosProp } from './interfaces';
import { criarTipo } from './functions';
import { useSQLiteContext } from 'expo-sqlite';
import { Alert } from 'react-native';
const Create: React.FC<CadastrarTiposDeProdutosProp> = ({navigation}) => {
  const db = useSQLiteContext();

  return (
    <ScrollView>
      <Box>
        <Formik
          initialValues={{
            nome: '',
            descricao: '',
          }}
          onSubmit={(values, formikHelpers) =>
            criarTipo(values, formikHelpers, db, navigation, Alert);
          }
        >
          {({ values, handleChange, handleBlur, handleSubmit }) => {
            return (
              <Box>
                <FormControl
                  isInvalid={false}
                  size={'md'}
                  isDisabled={false}
                  isRequired={true}
                >
                  <FormControlLabel>
                    <FormControlLabelText>Nome</FormControlLabelText>
                  </FormControlLabel>
                  <Input>
                    <InputField type="text" placeholder="password" />
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
              </Box>
            );
          }}
        </Formik>
      </Box>
    </ScrollView>
  );
};
export default Create;
