import React from 'react';
import Estados from '@/assets/data/Estados.json';
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlHelper,
  FormControlHelperText,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  Box,
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
  AlertCircleIcon,
  ChevronDownIcon,
  ScrollView,
} from '@gluestack-ui/themed';

import { ISelectEstados } from './interfaces';
import { formatValue } from '@/utils/calc';
const SelectEstados: React.FC<ISelectEstados> = ({
  value,
  onChangeValue,
  label,
  error,
  isDisabled,
  isInvalid,
  isRequired,
  isReadOnly,
}) => {
  const [valor, setValor] = React.useState(value);
  return (
    <>
      <FormControl
        size={'md'}
        isInvalid={isInvalid}
        isDisabled={isDisabled}
        isRequired={isRequired}
        isReadOnly={isReadOnly}
      >
        <FormControlLabel>
          <FormControlLabelText>{label ? label : 'UF'}</FormControlLabelText>
        </FormControlLabel>
        <Select
          onValueChange={(text) => {
            setValor(text);
            if (onChangeValue) {
              onChangeValue(text);
            }
          }}
          selectedValue={Estados.find((e) => e.sigla === value)?.nome}
          isInvalid={false}
          isDisabled={false}
        >
          <SelectTrigger size={'md'} variant={'rounded'}>
            <SelectInput placeholder="Selecione uma UF" />
            <SelectIcon mr={'$3'} ml={0} as={ChevronDownIcon} />
          </SelectTrigger>
          <SelectPortal>
            <SelectBackdrop />
            <SelectContent>
              <SelectDragIndicatorWrapper>
                <SelectDragIndicator />
              </SelectDragIndicatorWrapper>
              <ScrollView w="$full">
                <Box gap="$2.5">
                  {Estados.map((estado) => (
                    <SelectItem
                      key={estado.id}
                      value={estado.sigla}
                      label={estado.nome}
                      isPressed={valor === estado.sigla}
                    />
                  ))}
                </Box>
              </ScrollView>
            </SelectContent>
          </SelectPortal>
        </Select>

        <FormControlHelper>
          <FormControlHelperText>Selecione um estado.</FormControlHelperText>
        </FormControlHelper>

        <FormControlError>
          <FormControlErrorIcon as={AlertCircleIcon} />
          <FormControlErrorText>{error}</FormControlErrorText>
        </FormControlError>
      </FormControl>
    </>
  );
};
export default SelectEstados;
