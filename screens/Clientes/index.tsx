import { Box, Button, ButtonIcon, ButtonText, ScrollView, Text } from "@gluestack-ui/themed";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import CadastrarClientesScreen from "./Cadastrar";
import { Ionicons } from "@expo/vector-icons";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types";
import { useThemeApp } from "$providers/theme";
import View from "./view";
import Create from "./create";


const Stack = createNativeStackNavigator();

const ClientesScreens: React.FC = () => {
    return(
        <Stack.Navigator initialRouteName="listar-clientes" >
            <Stack.Screen name="listar-clientes" component={View} options={{title: "Listar Clientes"}} />
            <Stack.Screen name="cadastrar-clientes" component={Create} options={{title: "Cadastrar Clientes"}} />
        </Stack.Navigator>
    )
}



export default ClientesScreens;