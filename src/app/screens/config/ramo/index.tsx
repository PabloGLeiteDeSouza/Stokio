import { createNativeStackNavigator } from '@react-navigation/native-stack';
import View from './view';
import Create from './create';
import Update from './update';

const Stack = createNativeStackNavigator();

const ScreensRamo: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="visualizar-ramos"
        component={View}
        options={{ title: 'Visualizar Ramos' }}
      />
      <Stack.Screen
        name="cadastrar-ramo"
        component={Create}
        options={{ title: 'Cadastrar Ramos' }}
      />
      <Stack.Screen
        name="editar-ramo"
        component={Update}
        options={{ title: 'Atualizar Ramos' }}
      />
    </Stack.Navigator>
  );
};

export default ScreensRamo;
