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
  Box,
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
  ButtonIcon,
  CalendarDaysIcon,
} from '@gluestack-ui/themed';
import { IInputDatePicker } from './interfaces';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

const InputDatePicker: React.FC<IInputDatePicker> = ({
  title,
  value,
  onChangeDate,
  error,
}) => {
  return (
    <>
      <FormControl
        isInvalid={false}
        size={'md'}
        isDisabled={false}
        isRequired={true}
      >
        <FormControlLabel>
          <FormControlLabelText>{title}</FormControlLabelText>
        </FormControlLabel>
        <Input>
          <InputField
            readOnly={true}
            editable={false}
            type="text"
            placeholder="01/01/1999"
            value={new Date(value).toLocaleDateString()}
          />
          <Button
            onPress={() => {
              DateTimePickerAndroid.open({
                value: new Date(value),
                onChange: (event, selectedDate) => {
                  if (selectedDate) {
                    onChangeDate(String(selectedDate));
                  }
                },
                mode: 'date',
              });
            }}
          >
            <ButtonIcon as={CalendarDaysIcon} />
          </Button>
        </Input>

        <FormControlHelper>
          <FormControlHelperText>
            Selecione uma data válida.
          </FormControlHelperText>
        </FormControlHelper>

        <FormControlError>
          <FormControlErrorIcon as={AlertCircleIcon} />
          <FormControlErrorText>{error}</FormControlErrorText>
        </FormControlError>
      </FormControl>
    </>
  );
};

export default InputDatePicker;
