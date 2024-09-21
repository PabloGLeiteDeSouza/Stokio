import { createNativeStackNavigator } from '@react-navigation/native-stack';
import View from './view';
import Create from './create';
import Update from './update';

const Stack = createNativeStackNavigator();

const ScreensRamo: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="listar-ramos"
        component={View}
        options={{ title: 'Listar Ramos' }}
      />
      <Stack.Screen
        name="cadastrar-ramos"
        component={Create}
        options={{ title: 'Cadastrar Ramo' }}
      />
      <Stack.Screen
        name="editar-ramos"
        component={Update}
        options={{ title: 'Atualizar Ramo' }}
      />
    </Stack.Navigator>
  );
};

export default ScreensRamo;
