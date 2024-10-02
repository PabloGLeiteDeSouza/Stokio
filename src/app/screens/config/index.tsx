import { createNativeStackNavigator } from "@react-navigation/native-stack";


const Stack = createNativeStackNavigator();

const ConfigScreens: React.FC = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="screens-ramo" />
            <Stack.Screen name="screens-marca" />
            <Stack.Screen name="screens-tipo-ua" />
            <Stack.Screen name="screens-um" />
            <Stack.Screen name="screens-ua" />
            <Stack.Screen name="configuracoes" />
        </Stack.Navigator>
    );
};

const ConfigScreen: React.FC = () => {
    return <></>;
}

export default ConfigScreens;
