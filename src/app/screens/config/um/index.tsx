import View from './view';
import Create from './create';
import Update from './update';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const ScreensUM: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="visualizar-um" component={View} />
      <Stack.Screen name="cadastrar-um" component={Create} />
      <Stack.Screen name="editar-um" component={Update} />
    </Stack.Navigator>
  );
};

export default ScreensUM;
