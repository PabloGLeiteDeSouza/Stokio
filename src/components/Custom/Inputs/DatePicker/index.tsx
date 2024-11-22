import React, { useState, useCallback, useEffect } from 'react';
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
  ButtonIcon,
  CalendarDaysIcon,
  AlertCircleIcon,
} from '@gluestack-ui/themed';
import { IInputDatePicker } from './interfaces';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { Alert } from 'react-native';
import { getDateFromString, getStringFromDate } from '@/utils';

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
  placeholder,
  ...props
}) => {
  // Formatar a data no formato DD/MM/AAAA para exibição
  const formatDate = (date: Date | string | undefined): string => {
    if (!date) return '';
    const dateObj = new Date(date);
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const [data, setData] = useState<string>(value ? formatDate(value) : '');

  const handleDateChange = useCallback(
    (selectedDate: Date) => {
      if (selectedDate) {
        onChangeDate(selectedDate);
        setData(formatDate(selectedDate));
      }
    },
    [onChangeDate]
  );

  const startPicker = useCallback(() => {
    DateTimePickerAndroid.open({
      minuteInterval,
      minimumDate,
      maximumDate,
      value: value || maximumDate || new Date(),
      onChange: (event, selectedDate) => {
        if (event.type === 'set' && selectedDate) {
          handleDateChange(selectedDate);
        }
      },
      mode: 'date',
      ...props,
    });
  }, [handleDateChange, maximumDate, minimumDate, minuteInterval, value, props]);

  const handleInputChange = (text: string) => {
    try {
      // Atualiza o texto enquanto mantém o formato DD/MM/AAAA
      if (text.length === 2 || text.length === 5) {
        setData((prev) => prev + '/');
      } else {
        setData(text);
      }

      // Quando a data estiver completa e validada (DD/MM/AAAA)
      if (text.length === 10 && /^(\d{2})\/(\d{2})\/(\d{4})$/.test(text)) {
        onChangeDate(getDateFromString(text)); // Converte para o formato de data AAAA-MM-DD
      }
    } catch (error) {
      Alert.alert('Erro', (error as Error).message);
    }
  };

  const handleBlur = () => {
    try {
      // Verifica se a data inserida está no formato correto
      if (!data.includes('/')) throw new Error('Data inválida!');
      onChangeDate(getDateFromString(data));
    } catch (error) {
      Alert.alert('Erro', (error as Error).message);
    }
  };

  return (
    <FormControl isInvalid={isInvalid} size={size} isDisabled={isDisabled} isRequired={isRequired} isReadOnly={isReadOnly}>
      <FormControlLabel>
        <FormControlLabelText>{title}</FormControlLabelText>
      </FormControlLabel>

      <Input>
        <InputField
          type="text"
          placeholder={placeholder || 'DD/MM/AAAA'}
          value={data}
          onChangeText={handleInputChange}
          keyboardType="number-pad"
          onBlur={handleBlur}
        />
        <Button onPress={startPicker}>
          <ButtonIcon as={CalendarDaysIcon} />
        </Button>
      </Input>

      <FormControlHelper>
        <FormControlHelperText>
          Selecione uma data válida. A data deve ser informada por completo; caso contrário, a última data correta será considerada.
        </FormControlHelperText>
      </FormControlHelper>

      {error && (
        <FormControlError>
          <FormControlErrorIcon as={AlertCircleIcon} />
          <FormControlErrorText>{String(error)}</FormControlErrorText>
        </FormControlError>
      )}
    </FormControl>
  );
};

export default InputDatePicker;
