import { createStackNavigator } from '@react-navigation/stack';
import View from './View';
import Update from './Update';
import Create from './Create';
import ScreensItemVenda from './ItemVenda';

const Stack = createStackNavigator();

const VendasScreens: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="visualizar-vendas"
        component={View}
        options={{ title: 'Visualizar Vendas' }}
      />
      <Stack.Screen
        name="cadastrar-vendas"
        component={Create}
        options={{ title: 'Cadastrar Vendas' }}
      />
      <Stack.Screen
        name="editar-vendas"
        component={Update}
        options={{ title: 'Atualizar Vendas' }}
      />
      <Stack.Screen
        name="screens-item-venda"
        component={ScreensItemVenda}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default VendasScreens;
