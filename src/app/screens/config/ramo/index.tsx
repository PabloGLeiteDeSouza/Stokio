import { createNativeStackNavigator } from '@react-navigation/native-stack';
import View from './view';
import Create from './create';
import Update from './update';

const Stack = createNativeStackNavigator();

const ScreensRamo: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="visualizar-ramo" component={View} />
      <Stack.Screen name="cadastrar-ramo" component={Create} />
      <Stack.Screen name="editar-ramo" component={Update} />
    </Stack.Navigator>
  );
};

export default ScreensRamo;
