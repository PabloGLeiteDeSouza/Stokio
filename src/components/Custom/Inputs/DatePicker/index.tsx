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
  Button,
  AlertCircleIcon,
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
  maximumDate,
  minimumDate,
  minuteInterval,
  isInvalid,
  size,
  isDisabled,
  isRequired,
  isReadOnly,
  ...props
}) => {
  const startPicker = () => {
    DateTimePickerAndroid.open({
      minuteInterval,
      minimumDate,
      maximumDate,
      value: value ? new Date(value) : new Date(),
      onChange: (event, selectedDate) => {
        if (event.type === 'set') {
          if (selectedDate) {
            onChangeDate(String(selectedDate));
          }
        }
      },
      mode: 'date',
      ...props,
    });
  };
  return (
    <>
      <FormControl
        isInvalid={isInvalid}
        size={size}
        isDisabled={isDisabled}
        isRequired={isRequired}
        isReadOnly={isReadOnly}
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
            value={new Intl.DateTimeFormat('pt-BR', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            }).format(new Date(value))}
          />
          <Button onPress={startPicker}>
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
          <FormControlErrorText>{String(error)}</FormControlErrorText>
        </FormControlError>
      </FormControl>
    </>
  );
};

export default InputDatePicker;
