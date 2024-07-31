import { createNativeStackNavigator } from '@react-navigation/native-stack';
import View from './View';
import Create from './Create';
import Update from './Update';

const Stack = createNativeStackNavigator();

const ScreensTipo: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="visualizar-tipo" component={View} />
      <Stack.Screen name="cadastrar-tipo" component={Create} />
      <Stack.Screen name="atualizar-tipo" component={Update} />
    </Stack.Navigator>
  );
};

export default ScreensTipo;
