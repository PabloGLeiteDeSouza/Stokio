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
  Center,
  Icon,
  CircleIcon,
  CheckIcon,
  AlertCircleIcon,
  ChevronDownIcon,
} from "@gluestack-ui/themed";
import { Box, ScrollView, Text } from "@gluestack-ui/themed";
import React from "react";
import RNDateTimePicker, {
  AndroidNativeProps,
  DateTimePickerAndroid,
  IOSNativeProps,
  WindowsNativeProps,
} from "@react-native-community/datetimepicker";
import { useThemeApp } from "$providers/theme";
import { CalendarDaysIcon } from "@gluestack-ui/themed";
import { ButtonIcon } from "@gluestack-ui/themed";
const CadastrarEmpresasScreen: React.FC = () => {
  let selectIconSize = "";
  const [date, setDate] = React.useState<Date>(new Date());
  const [tipoEmpresa, setTipoEmpresa] = React.useState<"pj" | "pf">("pj");
  const {theme} = useThemeApp();


  const dateFormat = () => {
    const dia = date.getDate();
    const mes = date.getMonth() + 1;
    const ano = date.getFullYear();
    if (dia < 10) {
      if (mes < 10) {
        return `0${dia}/0${mes}/${ano}`;
      } else {
        return `0${dia}/${mes}/${ano}`;
      }
    } else {
      if (mes < 10) {
        return `${dia}/0${mes}/${ano}`;
      } else {
        return `${dia}/${mes}/${ano}`;
      }
    }
  };
  return (
    <ScrollView>
      <Box mx="$10" my="$5" gap="$5">
        <Text size="xl" textAlign="center">
          Informe os dados da empresa:
        </Text>
        <FormControl
          isInvalid={false}
          size={"md"}
          isDisabled={false}
          isRequired={true}
        >
          <FormControlLabel>
            <FormControlLabelText>Tipo de empresa</FormControlLabelText>
          </FormControlLabel>
          <Select
            defaultValue="Empresa Pessoa Juridica"
            onValueChange={(value) => setTipoEmpresa(value as "pf" | "pj")}
            isInvalid={false}
            isDisabled={false}
          >
            <SelectTrigger size={"md"} variant={"outline"}>
              <SelectInput placeholder="Select um tipo de empresa" />
              <SelectIcon mr={"$3"} ml={0} as={ChevronDownIcon} />
            </SelectTrigger>
            <SelectPortal>
              <SelectBackdrop />
              <SelectContent>
                <SelectDragIndicatorWrapper>
                  <SelectDragIndicator />
                </SelectDragIndicatorWrapper>
                <SelectItem label="Empresa Pessoa Juridica" value="pj" />
                <SelectItem
                  label="Empresa Pessoa Física (Autonomo)"
                  value="pf"
                />
              </SelectContent>
            </SelectPortal>
          </Select>
          <FormControlHelper>
            <FormControlHelperText>
              Selecione o tipo da empresa.
            </FormControlHelperText>
          </FormControlHelper>

          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>
              è necessário inserir o tipo da empresa para prosseguir.
            </FormControlErrorText>
          </FormControlError>
        </FormControl>
        <FormControl
          isInvalid={false}
          size={"md"}
          isDisabled={false}
          isRequired={true}
        >
          <FormControlLabel>
            <FormControlLabelText>Nome da empresa</FormControlLabelText>
          </FormControlLabel>
          <Input>
            <InputField type="text" placeholder="Nome da empresa" />
          </Input>

          <FormControlHelper>
            <FormControlHelperText>
              Informe o nome da empresa.
            </FormControlHelperText>
          </FormControlHelper>

          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>
              O nome da empresa é obrigatório.
            </FormControlErrorText>
          </FormControlError>
        </FormControl>
        {tipoEmpresa === "pj" ? (
          <>
            <FormControl
              isInvalid={false}
              size={"md"}
              isDisabled={false}
              isRequired={true}
            >
              <FormControlLabel>
                <FormControlLabelText>Nome Fantasia</FormControlLabelText>
              </FormControlLabel>
              <Input>
                <InputField type="text" placeholder="Nome fantasia" />
              </Input>

              <FormControlHelper>
                <FormControlHelperText>
                  Informe o nome fantasia de sua empresa.
                </FormControlHelperText>
              </FormControlHelper>

              <FormControlError>
                <FormControlErrorIcon as={AlertCircleIcon} />
                <FormControlErrorText>
                  O nome fantasia é obrigatório.
                </FormControlErrorText>
              </FormControlError>
            </FormControl>
            <FormControl
              isInvalid={false}
              size={"md"}
              isDisabled={false}
              isRequired={true}
            >
              <FormControlLabel>
                <FormControlLabelText>Razão Social</FormControlLabelText>
              </FormControlLabel>
              <Input>
                <InputField type="text" placeholder="Razão social" />
              </Input>

              <FormControlHelper>
                <FormControlHelperText>
                  Informe a sua razão social aqui.
                </FormControlHelperText>
              </FormControlHelper>

              <FormControlError>
                <FormControlErrorIcon as={AlertCircleIcon} />
                <FormControlErrorText>
                  A razão social é obrigatória.
                </FormControlErrorText>
              </FormControlError>
            </FormControl>
            <FormControl
              isInvalid={false}
              size={"md"}
              isDisabled={false}
              isRequired={true}
            >
              <FormControlLabel>
                <FormControlLabelText>Cnpj</FormControlLabelText>
              </FormControlLabel>
              <Input>
                <InputField keyboardType="number-pad" type="text" placeholder="Cnpj" />
              </Input>

              <FormControlHelper>
                <FormControlHelperText>
                  Insira o número do cnpj da empresa.
                </FormControlHelperText>
              </FormControlHelper>

              <FormControlError>
                <FormControlErrorIcon as={AlertCircleIcon} />
                <FormControlErrorText>
                  O cnpj é obrigatório.
                </FormControlErrorText>
              </FormControlError>
            </FormControl>
            <FormControl
              isInvalid={false}
              size={"md"}
              isDisabled={false}
              isRequired={true}
            >
              <FormControlLabel>
                <FormControlLabelText>Inscriçao Estadual</FormControlLabelText>
              </FormControlLabel>
              <Input>
                <InputField type="text" placeholder="Inscrição Estadual" />
              </Input>

              <FormControlHelper>
                <FormControlHelperText>
                  Informe o número da inscrição estadual da empresa.
                </FormControlHelperText>
              </FormControlHelper>

              <FormControlError>
                <FormControlErrorIcon as={AlertCircleIcon} />
                <FormControlErrorText>
                  A inscrição estadual é obrigatória
                </FormControlErrorText>
              </FormControlError>
            </FormControl>
            <FormControl
              isInvalid={false}
              size={"md"}
              isDisabled={false}
              isRequired={true}
            >
              <FormControlLabel>
                <FormControlLabelText>Inscrição Múnicipal</FormControlLabelText>
              </FormControlLabel>
              <Input>
                <InputField type="text" placeholder="Inscrição Municipal" />
              </Input>

              <FormControlHelper>
                <FormControlHelperText>
                  Informe o numero da inscrição municipal da empresa.
                </FormControlHelperText>
              </FormControlHelper>

              <FormControlError>
                <FormControlErrorIcon as={AlertCircleIcon} />
                <FormControlErrorText>
                  a inscrição múnicipal é obrigatória.
                </FormControlErrorText>
              </FormControlError>
            </FormControl>
          </>
          
        ) : (
          <>
            <FormControl
              isInvalid={false}
              size={"md"}
              isDisabled={false}
              isRequired={true}
            >
              <FormControlLabel>
                <FormControlLabelText>CPF</FormControlLabelText>
              </FormControlLabel>
              <Input>
                <InputField
                  type="text"
                  placeholder="CPF"
                />
              </Input>

              <FormControlHelper>
                <FormControlHelperText>
                  Informe o CPF do vendedor autonomo.
                </FormControlHelperText>
              </FormControlHelper>

              <FormControlError>
                <FormControlErrorIcon as={AlertCircleIcon} />
                <FormControlErrorText>
                  O cpf é obrigatório.
                </FormControlErrorText>
              </FormControlError>
            </FormControl>
          </>
        )}

        <FormControl
          isInvalid={false}
          size={"md"}
          isDisabled={false}
          isRequired={true}
        >
          <FormControlLabel>
            <FormControlLabelText>{tipoEmpresa === 'pj' ? "Data de criação" : "Data de nascimento"}</FormControlLabelText>

          </FormControlLabel>
          <Input>
            <InputField
              editable={false}
              readOnly={true}
              type="text"
              value={dateFormat()}
              placeholder="data"
            />
            <Button onPress={() => {
              DateTimePickerAndroid.open({
                value: new Date(),
                mode: "date",
                onChange: (event, date) => {
                  if (date) {
                    setDate(date);
                  }
                },
              });
            }} >
              <ButtonIcon as={CalendarDaysIcon} />
            </Button>
          </Input>

          <FormControlHelper>
            <FormControlHelperText>
              {tipoEmpresa === 'pj' ? "Deve ser informada a data de criação da empresa." : "Deve ser informada a data de nascimento."}
              
            </FormControlHelperText>
          </FormControlHelper>

          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>
              A data de criação é obrigatória.
            </FormControlErrorText>
          </FormControlError>
        </FormControl>
        <Box>
          <Button
            $active-bgColor={theme === "dark" ? "$purple700" : "$purple500"}
            $dark-backgroundColor="$purple500"
            $light-backgroundColor="$purple700"
          >
            <ButtonText>Enviar</ButtonText>
          </Button>
        </Box>
      </Box>
    </ScrollView>
  );
};
export default CadastrarEmpresasScreen;
