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
import { Alert } from 'react-native';
import { getDateFromString, getMinDateFor18YearsOld } from '@/utils';

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
  const [ajustDate, setAjustDate] = React.useState(false);
  const [data, setData] = React.useState(value ? `${value.getDate()+1}/${value.getMonth()}/${value.getFullYear()}` : '');
  const startPicker = () => {
    DateTimePickerAndroid.open({
      minuteInterval,
      minimumDate,
      maximumDate,
      value: value ? value : maximumDate ? maximumDate : new Date(),
      onChange: (event, selectedDate) => {
        if (event.type === 'set') {
          if (selectedDate) {
            onChangeDate(selectedDate);
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
            type="text"
            placeholder={'01/01/1999' + ` ${placeholder}`}
            value={ajustDate ? data : new Intl.DateTimeFormat('pt-BR', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            }).format(value ? value : maximumDate ? maximumDate : new Date())}
            onChangeText={(text) => {
              try {
                setAjustDate(true);
                if (text.length === 2) {
                  return setData(text+"/");
                } else if (text.length === 5) {
                  return setData(text+"/");
                }
                setData(text);
              } catch (error) {
                const err = error as Error;
                Alert.alert('Erro', err.message);
              }
            }}
            keyboardType='number-pad'
            onBlur={() => {
              try{
                if (!data.includes('/')) {
                  throw new Error("Data invalida!");
                }
                setAjustDate(false);
                onChangeDate(getDateFromString(data));
              } catch (error) {
                const err = error as Error;
                Alert.alert("Erro", err.message);
              }
            }}
          />
          <Button onPress={startPicker}>
            <ButtonIcon as={CalendarDaysIcon} />
          </Button>
        </Input>

        <FormControlHelper>
          <FormControlHelperText>
            Selecione uma data válida, a data deve ser informada por completo caso nao seja a ultima data correta inserida sera considerada.
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
