import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Update from './update';
import Create from './create';
import View from './view';

const Stack = createNativeStackNavigator();

const ClienteScreens: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="visualizar-cliente"
        component={View}
        options={{ title: 'Visualizar Clientes' }}
      />
      <Stack.Screen
        name="cadastrar-cliente"
        component={Create}
        options={{ title: 'Cadastrar Clientes' }}
      />
      <Stack.Screen
        name="atualizar-cliente"
        component={Update}
        options={{ title: 'Editar Clientes' }}
      />
    </Stack.Navigator>
  );
};

export default ClienteScreens;
