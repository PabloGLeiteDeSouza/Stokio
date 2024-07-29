
import { createStackNavigator } from '@react-navigation/stack';
import Create from './create';
import Update from './update';
import View from './view';

const Stack = createStackNavigator();

export const UaScreens: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="visuzalizar-ua" options={{ title: "Listar Unidades de Armazenamento" }} component={View} />
      <Stack.Screen name="cadastrar-ua" options={{ title: "Cadastrar Unidades de Armazenamento" }} component={Create} />
      <Stack.Screen name="atualizar-ua" options={{ title: "Atualizar Unidades de Armazenamento" }} component={Update} />
    </Stack.Navigator>
  );
};
