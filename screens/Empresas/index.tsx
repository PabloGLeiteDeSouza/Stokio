import { Box, Button, ButtonIcon, ButtonText, ScrollView, Text } from "@gluestack-ui/themed";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import CadastrarEmpresasScreen from "./Cadastrar";
import { Ionicons } from "@expo/vector-icons";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types";
import { useThemeApp } from "$providers/theme";

const Stack = createNativeStackNavigator();

const EmpresasScreens: React.FC = () => {
    return(
        <Stack.Navigator initialRouteName="listar-empresas" >
            <Stack.Screen name="listar-empreas" component={ListarEmpresasScreen} options={{title: "Listar Empresas"}} />
            <Stack.Screen name="cadastrar-empresas" component={CadastrarEmpresasScreen} options={{title: "Cadastrar Empresas"}} />
        </Stack.Navigator>
    )
}

type ListarEmpresasScreenNavigationProp = StackNavigationProp<RootStackParamList, "listar-empresas">;
type ListarEmpresasScreenRouteProp = RouteProp<RootStackParamList, "listar-empresas">;

interface ListarEmpresasScreenProps {
  navigation?: ListarEmpresasScreenNavigationProp;
  route?: ListarEmpresasScreenRouteProp;
}

const ListarEmpresasScreen: React.FC<ListarEmpresasScreenProps> = ({navigation, route}) => {

    const [haveClients, setHaveClients] = React.useState(false);
    const { theme } = useThemeApp();

    return haveClients ? (
        <ScrollView>
            <Box></Box>
        </ScrollView>
    ) : (
        <Box w="$full" h="$full" alignItems="center" justifyContent="center">
            <Box gap={10}>
                <Text size="xl" textAlign="center">
                    Não há Empresas cadastradas
                </Text>
                <Button
                    $active-bgColor={theme === "dark" ? "$purple700" : "$purple500"}
                    $dark-backgroundColor="$purple500"
                    $light-backgroundColor="$purple700"
                    gap={10}
                    onPress={() => navigation?.navigate("cadastrar-empresas")}
                    >
                    <ButtonText>Cadastrar Empresas</ButtonText>
                    <ButtonIcon
                        color="$white"
                        as={() => <Ionicons name="add-circle" size={15} color="white" />}
                    />
                </Button>
            </Box>
        </Box>
    )
}

export default EmpresasScreens;