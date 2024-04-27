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
    ButtonIcon,
} from "@gluestack-ui/themed";
import React from "react";
import { Box } from "@gluestack-ui/themed";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

// type CadastrarProdutosScreenProps = {
//     navigation: StackNavigationProp<any, "cadastro_de_produtos">;
//     route: RouteProp<any, "cadastro_de_produtos">;
// };

type CadastrarProdutosRouteParams = {
    barcode: string;
};
type CadastrarProdutosNavigationParams = {
    origin: string;
    type_request: string;
};
export type ParamListBaseRouteCadastrarProdutos = Record<
    string,
    CadastrarProdutosRouteParams | undefined
>;
export type ParamListBaseNavigationCadastrarProdutos = Record<
    string,
    CadastrarProdutosNavigationParams | undefined
>;
type CadastrarProdutosScreenProps = {
    navigation: StackNavigationProp<
        ParamListBaseNavigationCadastrarProdutos,
        "cadastro_de_produtos"
    >;
    route: RouteProp<
        ParamListBaseRouteCadastrarProdutos,
        "cadastro_de_produtos"
    >;
};
export default function CadastrarProdutosScreen({
    navigation,
    route,
}: CadastrarProdutosScreenProps) {
    const [Barcode, setBarcode] = React.useState<string>("");
    const [Medida, setMedida] = React.useState<string>("");
    const [Quantidade, setQuantidade] = React.useState<number>(1);
    const [TamanhoMedida, setTamanhoMedida] = React.useState<number>(1);
    if (
        route.params &&
        route.params.barcode &&
        route.params.barcode != Barcode
    ) {
        setBarcode(route.params.barcode);
    }
    return (
        <Box w='$full' h='$full' display='flex' alignItems='center'>
            <Box w='$3/4' flexDirection='column'>
                <Box my='$10'>
                    <Text textAlign='center' size='2xl'>
                        Insira os dados do produto:
                    </Text>
                </Box>
                <Box flexDirection='column' gap='$2.5'>
                    <FormControl
                        isInvalid={false}
                        size={"md"}
                        isDisabled={false}
                        isRequired={true}
                    >
                        <FormControlLabel>
                            <FormControlLabelText>
                                Código de Barras
                            </FormControlLabelText>
                        </FormControlLabel>
                        <Input>
                            <InputField
                                type='text'
                                value={Barcode}
                                placeholder='código de barras'
                                onChangeText={(text) =>
                                    setBarcode(text.replace(/\D/gim, ""))
                                }
                                keyboardType='numeric'
                            />
                            <Button
                                onPress={() =>
                                    navigation.navigate("codescanner", {
                                        origin: "cadastro_de_produtos",
                                        type_request: "search_product",
                                    })
                                }
                            >
                                <ButtonIcon
                                    as={() => <FontAwesome name='barcode' />}
                                />
                            </Button>
                        </Input>

                        <FormControlHelper>
                            <FormControlHelperText>
                                Leia o código de barras ou insira-o manualmente.
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
                        size={"lg"}
                        isDisabled={false}
                        isRequired={true}
                    >
                        <FormControlLabel>
                            <FormControlLabelText>
                                Nome do Produto
                            </FormControlLabelText>
                        </FormControlLabel>
                        <Input>
                            <InputField
                                type='text'
                                defaultValue=''
                                placeholder='Nome do Produto'
                            />
                        </Input>

                        <FormControlHelper>
                            <FormControlHelperText>
                                Informe o nome do produto.
                            </FormControlHelperText>
                        </FormControlHelper>
                        <FormControlError>
                            <FormControlErrorIcon as={AlertCircleIcon} />
                            <FormControlErrorText>
                                Esse campo é obrigatório.
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
                            <FormControlLabelText>
                                Quantidade
                            </FormControlLabelText>
                        </FormControlLabel>
                        <Input>
                            <Button
                                $dark-bgColor={"$blue500"}
                                $light-bgColor={"$blue700"}
                                onPress={() => setQuantidade(Quantidade + 1)}
                            >
                                <ButtonIcon
                                    as={() => (
                                        <FontAwesome
                                            name='plus'
                                            color={"white"}
                                        />
                                    )}
                                />
                            </Button>
                            <InputField
                                type='text'
                                keyboardType='numeric'
                                placeholder='Quantidade'
                                value={String(Quantidade)}
                                onChangeText={(text) =>
                                    setQuantidade(
                                        Number(text.replace(/\D/gim, ""))
                                    )
                                }
                            />
                            <Button
                                onPress={() => {
                                    if (Quantidade > 1) {
                                        setQuantidade(Quantidade - 1);
                                    }
                                }}
                                $dark-bgColor='$red500'
                                $light-bgColor='$red700'
                            >
                                <ButtonIcon
                                    as={() => (
                                        <FontAwesome
                                            name='minus-circle'
                                            color={"white"}
                                        />
                                    )}
                                />
                            </Button>
                        </Input>

                        <FormControlHelper>
                            <FormControlHelperText>
                                Informe a quantidade do produto.
                            </FormControlHelperText>
                        </FormControlHelper>

                        <FormControlError>
                            <FormControlErrorIcon as={AlertCircleIcon} />
                            <FormControlErrorText>
                                Esse campo é obrigatório.
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
                            <FormControlLabelText>
                                Medida
                            </FormControlLabelText>
                        </FormControlLabel>
                        <Input>
                            <InputField
                                type='text'
                                value={String(TamanhoMedida)}
                                placeholder='Medida'
                                onChangeText={(text) => {
                                    if(text.length === 0 || text.includes("")){
                                        setTamanhoMedida(0)
                                    } else {
                                        setTamanhoMedida(Number(text))
                                    }
                                }}
                            />
                            <Select w={200} selectedValue={Medida} onValueChange={(medida) => setMedida(medida)}>
                                <SelectTrigger variant="outline" size="md">
                                    <SelectInput placeholder="Selecione a medida" />
                                        <SelectIcon mr="$3">
                                            <Icon as={ChevronDownIcon} />
                                        </SelectIcon>
                                </SelectTrigger>
                                <SelectPortal>
                                    <SelectBackdrop />
                                    <SelectContent>
                                    <SelectDragIndicatorWrapper>
                                        <SelectDragIndicator />
                                    </SelectDragIndicatorWrapper>
                                        <SelectItem label="gramas" value="g" />
                                        <SelectItem label="mililitros" value="ml" />
                                        <SelectItem label="centimetros" value="cm" />
                                    </SelectContent>
                                </SelectPortal>
                            </Select>
                        </Input>

                        <FormControlHelper>
                            <FormControlHelperText>
                                Quantidade do produto sendo ele em g/ml/cm.
                            </FormControlHelperText>
                        </FormControlHelper>

                        <FormControlError>
                            <FormControlErrorIcon as={AlertCircleIcon} />
                            <FormControlErrorText>
                                Atleast 6 characters are required.
                            </FormControlErrorText>
                        </FormControlError>
                    </FormControl>
                </Box>
            </Box>
        </Box>
    );
}
