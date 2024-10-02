import { createNativeStackNavigator } from '@react-navigation/native-stack';
import View from './view';
import Create from './create';
import Update from './update';

const Stack = createNativeStackNavigator();

const ScreensMarca: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="visualizar-marca" component={View} />
      <Stack.Screen name="cadastrar-marca" component={Create} />
      <Stack.Screen name="editar-marca" component={Update} />
    </Stack.Navigator>
  );
};

export default ScreensMarca;
