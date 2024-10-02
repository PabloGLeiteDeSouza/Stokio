import { createNativeStackNavigator } from '@react-navigation/native-stack';
import View from './view';
import Create from './create';
import Update from './update';

const Stack = createNativeStackNavigator();

const ScreensTipoProduto: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="visualizar-tipo-produto" component={View} />
      <Stack.Screen name="cadastrar-tipo-produto" component={Create} />
      <Stack.Screen name="editar-tipo-produto" component={Update} />
    </Stack.Navigator>
  );
};

export default ScreensTipoProduto;
