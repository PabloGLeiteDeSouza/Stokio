import { createStackNavigator } from '@react-navigation/stack';
import View from './view';
import Create from './create';
import Update from './update';

const Stack = createStackNavigator();

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
