import { createNativeStackNavigator } from '@react-navigation/native-stack';
import View from './View';
import Create from './Create';
import Update from './Update';

const Stack = createNativeStackNavigator();

const ScreensUm: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="visualizar-ua" component={View} />
      <Stack.Screen name="cadastrar-ua" component={Create} />
      <Stack.Screen name="atualizar-ua" component={Update} />
    </Stack.Navigator>
  );
};

export default ScreensUm;
