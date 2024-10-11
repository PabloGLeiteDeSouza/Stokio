import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Update from './update';
import Create from './create';
import View from './view';
import Details from './view/details';
import SelectPessoa from '@/components/Custom/Screens/SelectPessoa';

const Stack = createNativeStackNavigator();

const ClienteScreens: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="visualizar-clientes"
        component={View}
        options={{ title: 'Visualizar Clientes' }}
      />
      <Stack.Screen
        name="cadastrar-cliente"
        component={Create}
        options={{ title: 'Cadastrar Cliente' }}
      />
      <Stack.Screen
        name="atualizar-cliente"
        component={Update}
        options={{ title: 'Editar Cliente' }}
      />
      <Stack.Screen
        name="detalhes-cliente"
        component={Details}
        options={{ title: 'Detalhes do cliente' }}
      />
      <Stack.Screen
        name="selecionar-pessoa"
        component={SelectPessoa}
        options={{ title: 'Selecione uma pessoa' }}
      />
    </Stack.Navigator>
  );
};

export default ClienteScreens;
