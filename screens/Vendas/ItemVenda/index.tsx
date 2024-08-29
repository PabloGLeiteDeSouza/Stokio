import { createStackNavigator } from '@react-navigation/stack';
import View from './view';
import Create from './create';
import Update from './update';

const Stack = createStackNavigator();

const ScreensItemVenda: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="visualizar-item-venda" component={View} options={{ title: "Visualizar Itens da Venda" }} />
      <Stack.Screen name="cadastrar-item-venda" component={Create} opt />
      <Stack.Screen name="editar-item-venda" component={Update} />
    </Stack.Navigator>
  );
};

export default ScreensItemVenda;
