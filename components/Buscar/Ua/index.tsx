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
} from '@gluestack-ui/themed';
import { BuscarUaProps } from './interfaces';

const BuscarUa: React.FC<BuscarUaProps> = ({
  value,
  onChangeValue,
  tipo,
  itens,
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
          <FormControlLabelText>
            Buscar Unidades de Armazenamento
          </FormControlLabelText>
        </FormControlLabel>
        {tipo === 'nome' ? (
          <>
            <Input>
              <InputField
                type="text"
                placeholder="Nome Unidade de Armazenamento"
                value={value}
                onChangeText={onChangeValue}
              />
            </Input>
          </>
        ) : tipo === 'tipo_ua' && itens ? (
          <>
            <Select
              onValueChange={onChangeValue}
              isInvalid={false}
              isDisabled={false}
            >
              <SelectTrigger size={'lg'} variant={'outline'}>
                <SelectInput placeholder="Select option" />
                <SelectIcon mr={'$3'} ml={0} as={ChevronDownIcon} />
              </SelectTrigger>
              <SelectPortal>
                <SelectBackdrop />
                <SelectContent>
                  <SelectDragIndicatorWrapper>
                    <SelectDragIndicator />
                  </SelectDragIndicatorWrapper>
                  {itens.map((item, index) => (
                    <SelectItem
                      key={index}
                      label={item.nome}
                      value={String(item.id)}
                      isPressed={value === String(item.id)}
                    />
                  ))}
                </SelectContent>
              </SelectPortal>
            </Select>
          </>
        ) : (
          <></>
        )}

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
};

export default BuscarUa;
