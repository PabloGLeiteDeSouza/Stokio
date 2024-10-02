import { createNativeStackNavigator } from "@react-navigation/native-stack";


const Stack = createNativeStackNavigator();

const ConfigScreens: React.FC = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="" />
            <Stack.Screen />
            <Stack.Screen />
            <Stack.Screen />
            <Stack.Screen />
        </Stack.Navigator>
    );
};

const ConfigScreen: React.FC = () => {
    return <></>;
}

export default ConfigScreens;
