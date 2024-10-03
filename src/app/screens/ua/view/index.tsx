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
const View: React.FC = () => {
  return (
    <ScrollView>
      <Box>
        <Box>
          {/* <Formik
            initialValues={{
              busca: '',
            }}
            onSubmit={() => {}}
          >
            {({ values, handleChange }) => {
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
                        Buscar Unidade de Armazenamento
                      </FormControlLabelText>
                    </FormControlLabel>
                    <Input>
                      <InputField
                        type="text"
                        value={values.busca}
                        onChangeText={handleChange('busca')}
                        placeholder="Nome da unidade de medida"
                      />
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
          </Formik> */}
        </Box>
        <Box></Box>
      </Box>
    </ScrollView>
  );
};
export default View;
