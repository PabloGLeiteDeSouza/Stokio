import { createNativeStackNavigator } from '@react-navigation/native-stack';
import View from './view';
import Create from './create';
import Update from './update';

const Stack = createNativeStackNavigator();

const VendasScreens: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="visualizar-vendas"
        component={View}
        options={{ title: 'Visualizar Vendas' }}
      />
      <Stack.Screen
        name="criar-vendas"
        component={Create}
        options={{ title: 'Criar Vendas' }}
      />
      <Stack.Screen
        name="editar-vendas"
        component={Update}
        options={{ title: 'Editar Venda' }}
      />
    </Stack.Navigator>
  );
};

export default VendasScreens;
