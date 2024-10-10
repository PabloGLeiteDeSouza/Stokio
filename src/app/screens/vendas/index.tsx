import { createNativeStackNavigator } from '@react-navigation/native-stack';
import View from './view';
import Create from './create';
import Update from './update';
import Details from './view/details';
import SelectCliente from '@/components/Custom/Screens/SelectCliente';

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
        name="cadastrar-venda"
        component={Create}
        options={{ title: 'Criar Vendas' }}
      />
      <Stack.Screen
        name="atualizar-venda"
        component={Update}
        options={{ title: 'Atualizar Venda' }}
      />
      <Stack.Screen
        name="detalhes-venda"
        component={Details}
        options={{ title: 'Detalhes da Venda' }}
      />
      <Stack.Screen
        name="selecionar-cliente"
        component={SelectCliente}
        options={{ title: 'Selecionar Cliente' }}
      />
    </Stack.Navigator>
  );
};

export default VendasScreens;
