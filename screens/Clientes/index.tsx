import { Box, Button, ButtonIcon, ButtonText, ScrollView, Text } from "@gluestack-ui/themed";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import CadastrarClientesScreen from "./Cadastrar";
import { Ionicons } from "@expo/vector-icons";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types";
import { useThemeApp } from "$providers/theme";

const Stack = createNativeStackNavigator();

const ClientesScreens: React.FC = () => {
    return(
        <Stack.Navigator initialRouteName="listar-clientes" >
            <Stack.Screen name="listar-clientes" component={ListarClientesScreen} options={{title: "Listar Clientes"}} />
            <Stack.Screen name="cadastrar-clientes" component={CadastrarClientesScreen} options={{title: "Cadastrar Clientes"}} />
        </Stack.Navigator>
    )
}

type ListarClientesScreenNavigationProp = StackNavigationProp<RootStackParamList, "listar-clientes">;
type ListarClientesScreenRouteProp = RouteProp<RootStackParamList, "listar-clientes">;

interface ListarClientesScreenProps {
  navigation?: ListarClientesScreenNavigationProp;
  route?: ListarClientesScreenRouteProp;
}

const ListarClientesScreen: React.FC<ListarClientesScreenProps> = ({navigation, route}) => {

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
                    Não há Clientes cadastradas
                </Text>
                <Button
                    $active-bgColor={theme === "dark" ? "$purple700" : "$purple500"}
                    $dark-backgroundColor="$purple500"
                    $light-backgroundColor="$purple700"
                    gap={10}
                    onPress={() => navigation?.navigate("cadastrar-clientes")}
                    >
                    <ButtonText>Cadastrar Clientes</ButtonText>
                    <ButtonIcon
                        color="$white"
                        as={() => <Ionicons name="add-circle" size={15} color="white" />}
                    />
                </Button>
            </Box>
        </Box>
    )
}

export default ClientesScreens;