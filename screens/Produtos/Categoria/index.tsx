import { createNativeStackNavigator } from '@react-navigation/native-stack';
import View from './View';
import Create from './Create';
import Update from './Update';

const Stack = createNativeStackNavigator();

const ScreensCategoria: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="visualizar-categoria" component={View} />
      <Stack.Screen name="cadastrar-categoria" component={Create} />
      <Stack.Screen name="atualizar-categoria" component={Update} />
    </Stack.Navigator>
  );
};

export default ScreensCategoria;
