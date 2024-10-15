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
import { IInputTextProps } from './interfaces';
import { SearchIcon } from '@gluestack-ui/themed';
import { mask } from 'react-native-mask-text';
const InputText: React.FC<IInputTextProps> = ({
  inputType,
  onChangeValue,
  onSubmitedValues,
  customType,
}) => {
  const [value, setValue] = React.useState('');

  switch (inputType) {
    case 'cep':
      return (
        <>
          <FormControl
            isInvalid={false}
            size={'md'}
            isDisabled={false}
            isRequired={true}
          >
            <FormControlLabel>
              <FormControlLabelText>cep</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                type="text"
                placeholder="11.111-111"
                value={value}
                onChangeText={(text) => {
                  setValue(mask(text, '99.999-999'));
                  if (onChangeValue) {
                    onChangeValue(mask(text, '99.999-999'));
                  }
                }}
              />
              {customType === 'search_input' && (
                <Box>
                  <Button
                    onPress={() => {
                      if (onSubmitedValues) {
                        onSubmitedValues(value);
                      }
                    }}
                  >
                    <Icon as={SearchIcon} />
                  </Button>
                </Box>
              )}
            </Input>

            <FormControlHelper>
              <FormControlHelperText>Informe um Cep.</FormControlHelperText>
            </FormControlHelper>

            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>
                {errors}
              </FormControlErrorText>
            </FormControlError>
          </FormControl>
        </>
      );
    case 'cnpj':
      return (
        <>
          <FormControl
            isInvalid={false}
            size={'md'}
            isDisabled={false}
            isRequired={true}
          >
            <FormControlLabel>
              <FormControlLabelText>cnpj</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                type="text"
                placeholder="99.999.999/0001-99"
                value={value}
                onChangeText={(text) => {
                  setValue(mask(text, '99.999.999/0001-99'));
                  if (onChangeValue) {
                    onChangeValue(mask(text, '99.999.999/0001-99'));
                  }
                }}
              />
              {customType === 'search_input' && (
                <Box>
                  <Button
                    onPress={() => {
                      if (onSubmitedValues) {
                        onSubmitedValues(value);
                      }
                    }}
                  >
                    <Icon as={SearchIcon} />
                  </Button>
                </Box>
              )}
            </Input>

            <FormControlHelper>
              <FormControlHelperText>Informe um cnpj.</FormControlHelperText>
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
    case 'cpf':
      return (
        <>
          <FormControl
            isInvalid={false}
            size={'md'}
            isDisabled={false}
            isRequired={true}
          >
            <FormControlLabel>
              <FormControlLabelText>Cpf</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                type="password"
                defaultValue="12345"
                placeholder="password"
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
      break;
    case 'telefone':
      return (
        <>
          <FormControl
            isInvalid={false}
            size={'md'}
            isDisabled={false}
            isRequired={true}
          >
            <FormControlLabel>
              <FormControlLabelText>Telefone</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                type="password"
                defaultValue="12345"
                placeholder="password"
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
    case 'money':
      return (
        <>
          <FormControl
            isInvalid={false}
            size={'md'}
            isDisabled={false}
            isRequired={true}
          >
            <FormControlLabel>
              <FormControlLabelText>Password</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                type="password"
                defaultValue="12345"
                placeholder="password"
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
    default:
      return (
        <>
          <FormControl
            isInvalid={false}
            size={'md'}
            isDisabled={false}
            isRequired={true}
          >
            <FormControlLabel>
              <FormControlLabelText>Password</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                type="password"
                defaultValue="12345"
                placeholder="password"
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
  }
};
export default InputText;
