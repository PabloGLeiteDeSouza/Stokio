import React from "react";
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
  Text,
  Center,
  Icon,
  CircleIcon,
  CheckIcon,
  AlertCircleIcon,
  ChevronDownIcon,
} from "@gluestack-ui/themed";

import { ScrollView } from "@gluestack-ui/themed";
import { Box } from "@gluestack-ui/themed";
import { useThemeApp } from "$providers/theme";
import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import SelectEstado from "$components/SelectEstado";

const CadastrarClientesScreen: React.FC = () => {
    
    const {theme} = useThemeApp();

  return (
    <ScrollView>
        <Box
            my="$6"
            mx="$10"
            gap="$5"
        >
            <Text textAlign="center" size="xl" >Informe os dados do cliente</Text>
            <FormControl
                isInvalid={false}
                size={"md"}
                isDisabled={false}
                isRequired={true}
            >
                <FormControlLabel>
                <FormControlLabelText>Nome</FormControlLabelText>
                </FormControlLabel>
                <Input>
                <InputField
                    type="text"
                    placeholder="Nome do Cliente"
                />
                </Input>

                <FormControlHelper>
                <FormControlHelperText>
                    Informe o nome do cliente.
                </FormControlHelperText>
                </FormControlHelper>

                <FormControlError>
                <FormControlErrorIcon as={AlertCircleIcon} />
                <FormControlErrorText>
                    O nome é obrigatório.
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
                <FormControlLabelText>Sobrenome</FormControlLabelText>
                </FormControlLabel>
                <Input>
                <InputField
                    type="text"
                    placeholder="Sobrenome do cliente"
                />
                </Input>

                <FormControlHelper>
                <FormControlHelperText>
                    Informe o sobrenome do cliente.
                </FormControlHelperText>
                </FormControlHelper>

                <FormControlError>
                <FormControlErrorIcon as={AlertCircleIcon} />
                <FormControlErrorText>
                    O sobrenome é obrigatório.
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
                <FormControlLabelText>Data de nascimento</FormControlLabelText>
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
            <FormControl
                isInvalid={false}
                size={"md"}
                isDisabled={false}
                isRequired={true}
            >
                <FormControlLabel>
                <FormControlLabelText><FontAwesome6 name="whatsapp"/> Telefone</FormControlLabelText>
                </FormControlLabel>
                <Input>
                <InputField
                    type="text"
                    placeholder="(xx) xxxxx-xxxx"
                />
                </Input>

                <FormControlHelper>
                <FormControlHelperText>
                    Insira o número de telefone e whatsapp do cliente.
                </FormControlHelperText>
                </FormControlHelper>

                <FormControlError>
                <FormControlErrorIcon as={AlertCircleIcon} />
                <FormControlErrorText>
                    Atleast 6 characters are required.
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
                <FormControlLabelText><MaterialIcons name="email" /> Email</FormControlLabelText>
                </FormControlLabel>
                <Input>
                <InputField
                    type="text"
                    placeholder="Email"
                />
                </Input>

                <FormControlHelper>
                <FormControlHelperText>
                    Insira o email do cliente.
                </FormControlHelperText>
                </FormControlHelper>

                <FormControlError>
                <FormControlErrorIcon as={AlertCircleIcon} />
                <FormControlErrorText>
                    Atleast 6 characters are required.
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
                <FormControlLabelText>Cep</FormControlLabelText>
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
            <FormControl
                isInvalid={false}
                size={"md"}
                isDisabled={false}
                isRequired={true}
            >
                <FormControlLabel>
                <FormControlLabelText>Rua</FormControlLabelText>
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
            <FormControl
                isInvalid={false}
                size={"md"}
                isDisabled={false}
                isRequired={true}
            >
                <FormControlLabel>
                <FormControlLabelText>Número</FormControlLabelText>
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
            <FormControl
                isInvalid={false}
                size={"md"}
                isDisabled={false}
                isRequired={true}
            >
                <FormControlLabel>
                <FormControlLabelText>Bairro</FormControlLabelText>
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
            <FormControl
                isInvalid={false}
                size={"md"}
                isDisabled={false}
                isRequired={true}
            >
                <FormControlLabel>
                <FormControlLabelText>Cidade</FormControlLabelText>
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
            <SelectEstado/>
            <FormControl
                isInvalid={false}
                size={"md"}
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
            <FormControl
                isInvalid={false}
                size={"md"}
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
            <FormControl
                isInvalid={false}
                size={"md"}
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
            <FormControl
                isInvalid={false}
                size={"md"}
                isDisabled={false}
                isRequired={true}
            >
                <FormControlLabel>
                <FormControlLabelText>Limite de compra</FormControlLabelText>
                </FormControlLabel>
                <Input>
                <InputField
                    type="text"
                    placeholder="Limite de compra por cliente"
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
            <Box>
                <Button
                    $active-bgColor={theme === "dark" ? "$purple700" : "$purple500"}
                    $dark-backgroundColor="$purple500"
                    $light-backgroundColor="$purple700"
                >
                    <ButtonText>
                        Cadastrar
                    </ButtonText>
                </Button>
            </Box>
        </Box>
    </ScrollView>
  );
};
export default CadastrarClientesScreen;
