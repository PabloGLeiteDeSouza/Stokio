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
  Icon,
  AlertCircleIcon,
  ChevronDownIcon,
} from '@gluestack-ui/themed';
import { IInputTextProps } from './interfaces';
import { SearchIcon } from '@gluestack-ui/themed';
import { mask, unmask } from '@/utils/mask';
const InputText: React.FC<IInputTextProps> = ({
  inputType,
  onChangeValue,
  onSubmitedValues,
  customType,
  value,
  error,
  isDisabled,
  isInvalid,
  isRequired,
}) => {
  const [data, setData] = React.useState(value ? value : '');
  const [telefoneType, setTelefoneType] = React.useState<'fixo' | 'movel'>(
    'movel',
  );
  switch (inputType) {
    case 'cep':
      return (
        <>
          <FormControl
            isInvalid={isInvalid}
            isDisabled={isDisabled}
            isRequired={isRequired}
            size={'md'}
          >
            <FormControlLabel>
              <FormControlLabelText>cep</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                type="text"
                placeholder="11.111-111"
                keyboardType="number-pad"
                value={mask(data, 'cep')}
                onChangeText={(text) => {
                  setData(unmask(mask(text, 'cep')));
                  if (onChangeValue) {
                    onChangeValue(unmask(mask(text, 'cep')));
                  }
                }}
              />
              {customType === 'search_input' && (
                <Box>
                  <Button
                    onPress={() => {
                      if (onSubmitedValues) {
                        onSubmitedValues(unmask(data));
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
              <FormControlErrorText>{error}</FormControlErrorText>
            </FormControlError>
          </FormControl>
        </>
      );
    case 'cnpj':
      return (
        <>
          <FormControl
            isInvalid={isInvalid}
            isDisabled={isDisabled}
            isRequired={isRequired}
            size={'md'}
          >
            <FormControlLabel>
              <FormControlLabelText>cnpj</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                type="text"
                placeholder="99.999.999/0001-99"
                keyboardType="number-pad"
                value={mask(data, 'cnpj')}
                onChangeText={(text) => {
                  setData(unmask(mask(text, 'cnpj')));
                  if (onChangeValue) {
                    onChangeValue(unmask(mask(text, 'cnpj')));
                  }
                }}
              />
              {customType === 'search_input' && (
                <Box>
                  <Button
                    onPress={() => {
                      if (onSubmitedValues) {
                        onSubmitedValues(data);
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
              <FormControlErrorText>{error}</FormControlErrorText>
            </FormControlError>
          </FormControl>
        </>
      );
    case 'cpf':
      return (
        <>
          <FormControl
            isInvalid={isInvalid}
            isDisabled={isDisabled}
            isRequired={isRequired}
            size={'md'}
          >
            <FormControlLabel>
              <FormControlLabelText>Cpf</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                type="text"
                placeholder="123.123.123-12"
                keyboardType="number-pad"
                value={mask(data, 'cpf')}
                onChangeText={(text) => {
                  setData(unmask(mask(text, 'cpf')));
                  if (onChangeValue) {
                    onChangeValue(unmask(mask(text, 'cpf')));
                  }
                }}
              />
              {customType === 'search_input' && (
                <Box>
                  <Button
                    onPress={() => {
                      if (onSubmitedValues) {
                        onSubmitedValues(unmask(data));
                      }
                    }}
                  >
                    <Icon as={SearchIcon} />
                  </Button>
                </Box>
              )}
            </Input>

            <FormControlHelper>
              <FormControlHelperText>
                Must be atleast 6 characters.
              </FormControlHelperText>
            </FormControlHelper>

            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>{error}</FormControlErrorText>
            </FormControlError>
          </FormControl>
        </>
      );
      break;
    case 'telefone':
      return (
        <Box gap="$5">
          <FormControl
            isInvalid={isInvalid}
            isDisabled={isDisabled}
            isRequired={isRequired}
            size={'md'}
          >
            <FormControlLabel>
              <FormControlLabelText>Tipo de Telefone</FormControlLabelText>
            </FormControlLabel>
            <Select
              onValueChange={(text) =>
                setTelefoneType(text as 'fixo' | 'movel')
              }
              isInvalid={isInvalid}
              isDisabled={isDisabled}
              isRequired={isRequired}
              selectedValue={
                telefoneType === 'fixo' ? 'Residencial' : 'Celular'
              }
            >
              <SelectTrigger size={'lg'} variant={'rounded'}>
                <SelectInput placeholder="Select option" />
                <SelectIcon mr={'$3'} ml={0} as={ChevronDownIcon} />
              </SelectTrigger>
              <SelectPortal>
                <SelectBackdrop />
                <SelectContent>
                  <SelectDragIndicatorWrapper>
                    <SelectDragIndicator />
                  </SelectDragIndicatorWrapper>
                  <SelectItem
                    label="Residencial"
                    value="fixo"
                    isPressed={telefoneType === 'fixo'}
                  />
                  <SelectItem
                    label="Celular"
                    value="movel"
                    isPressed={telefoneType === 'movel'}
                  />
                </SelectContent>
              </SelectPortal>
            </Select>

            <FormControlHelper>
              <FormControlHelperText>
                Must be atleast 6 characters.
              </FormControlHelperText>
            </FormControlHelper>

            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>{error}</FormControlErrorText>
            </FormControlError>
          </FormControl>
          <FormControl
            isInvalid={isInvalid}
            isDisabled={isDisabled}
            isRequired={isRequired}
            size={'md'}
          >
            <FormControlLabel>
              <FormControlLabelText>Telefone</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                type="text"
                placeholder="+551199999-9999"
                keyboardType="number-pad"
                value={mask(data, 'telefone', telefoneType)}
                onChangeText={(text) => {
                  setData(unmask(mask(text, 'telefone', telefoneType)));
                  if (onChangeValue) {
                    onChangeValue(unmask(mask(text, 'telefone', telefoneType)));
                  }
                }}
              />
              {customType === 'search_input' && (
                <Box>
                  <Button
                    onPress={() => {
                      if (onSubmitedValues) {
                        onSubmitedValues(unmask(data));
                      }
                    }}
                  >
                    <Icon as={SearchIcon} />
                  </Button>
                </Box>
              )}
            </Input>

            <FormControlHelper>
              <FormControlHelperText>
                Must be atleast 6 characters.
              </FormControlHelperText>
            </FormControlHelper>

            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>{error}</FormControlErrorText>
            </FormControlError>
          </FormControl>
        </Box>
      );
    case 'money':
      return (
        <>
          <FormControl
            isInvalid={isInvalid}
            isDisabled={isDisabled}
            isRequired={isRequired}
            size={'md'}
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
            isInvalid={isInvalid}
            isDisabled={isDisabled}
            isRequired={isRequired}
            size={'md'}
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
              <FormControlErrorText>{error}</FormControlErrorText>
            </FormControlError>
          </FormControl>
        </>
      );
  }
};
export default InputText;
