import { createNativeStackNavigator } from '@react-navigation/native-stack';
import View from './view';
import Create from './create';
import Update from './update';

const Stack = createNativeStackNavigator();

const ScreensTipoUA: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="visualizar-tipo-ua" component={View} />
      <Stack.Screen name="cadastrar-tipo-ua" component={Create} />
      <Stack.Screen name="editar-tipo-ua" component={Update} />
    </Stack.Navigator>
  );
};

export default ScreensTipoUA;
