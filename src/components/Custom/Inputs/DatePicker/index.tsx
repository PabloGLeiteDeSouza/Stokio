import React, { useState, useCallback } from 'react';
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
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { Alert } from 'react-native';
import { FormikErrors } from 'formik';

interface IInputDatePicker {
  title: string;
  value?: Date;
  onChangeDate: (date: Date) => void;
  error?: FormikErrors<Date> | undefined;
  maximumDate?: Date;
  minimumDate?: Date;
  isInvalid?: boolean;
  size?: "sm" | "md" | "lg" | undefined;
  isDisabled?: boolean;
  isRequired?: boolean;
  isReadOnly?: boolean;
  placeholder?: string;
}

const InputDatePicker: React.FC<IInputDatePicker> = ({
  title,
  value,
  onChangeDate,
  error,
  maximumDate,
  minimumDate,
  isInvalid,
  size,
  isDisabled,
  isRequired,
  isReadOnly,
  placeholder,
}) => {
  const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const parseDate = (dateString: string): Date | null => {
    const [day, month, year] = dateString.split('/').map(Number);
    if (!day || !month || !year) return null;

    const date = new Date(year, month - 1, day);
    return date.getDate() === day && date.getMonth() === month - 1 && date.getFullYear() === year
      ? date
      : null;
  };

  const [inputValue, setInputValue] = useState<string>(value ? formatDate(value) : '');

  const handleDateChange = useCallback(
    (selectedDate: Date) => {
      if (selectedDate) {
        onChangeDate(selectedDate);
        setInputValue(formatDate(selectedDate));
      }
    },
    [onChangeDate]
  );

  const startPicker = useCallback(() => {
    DateTimePickerAndroid.open({
      mode: 'date',
      value: value || new Date(),
      maximumDate,
      minimumDate,
      onChange: (_, selectedDate) => {
        if (selectedDate) handleDateChange(selectedDate);
      },
    });
  }, [handleDateChange, maximumDate, minimumDate, value]);

  const handleInputChange = (text: string) => {
    let formattedText = text
      .replace(/[^0-9]/g, '')
      .slice(0, 8) // Limita o tamanho ao necessário para DD/MM/AAAA
      .replace(/(\d{2})(\d)/, '$1/$2')
      .replace(/(\d{2})\/(\d{2})(\d)/, '$1/$2/$3');

    setInputValue(formattedText);

    // Verifica se está no formato DD/MM/AAAA completo
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(formattedText)) {
      const parsedDate = parseDate(formattedText);
      if (parsedDate) {
        onChangeDate(parsedDate);
      } else {
        Alert.alert('Erro', 'Data inválida. Por favor, insira uma data válida.');
      }
    }
  };

  const handleBlur = () => {
    if (inputValue && !/^\d{2}\/\d{2}\/\d{4}$/.test(inputValue)) {
      Alert.alert('Erro', 'Formato de data inválido. Use DD/MM/AAAA.');
      setInputValue(value ? formatDate(value) : '');
    }
  };

  return (
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
          placeholder={placeholder || 'DD/MM/AAAA'}
          value={inputValue}
          onChangeText={handleInputChange}
          keyboardType="number-pad"
          onBlur={handleBlur}
          editable={!isReadOnly && !isDisabled}
        />
        <Button onPress={startPicker} disabled={isReadOnly || isDisabled}>
          <ButtonIcon as={CalendarDaysIcon} />
        </Button>
      </Input>

      <FormControlHelper>
        <FormControlHelperText>
          Insira uma data no formato DD/MM/AAAA ou utilize o seletor de data.
        </FormControlHelperText>
      </FormControlHelper>

      {error && (
        <FormControlError>
          <FormControlErrorIcon as={AlertCircleIcon} />
          <FormControlErrorText>{error as string}</FormControlErrorText>
        </FormControlError>
      )}
    </FormControl>
  );
};

export default InputDatePicker;
