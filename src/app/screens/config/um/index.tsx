import View from './view';
import Create from './create';
import Update from './update';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const ScreensUM: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="visualizar-um"
        component={View}
        options={{ title: 'Visualizar Unidade de Medida' }}
      />
      <Stack.Screen
        name="cadastrar-um"
        component={Create}
        options={{ title: 'Cadastrar Unidade de Medida' }}
      />
      <Stack.Screen
        name="editar-um"
        component={Update}
        options={{ title: 'Atualizar Unidade de Medida' }}
      />
    </Stack.Navigator>
  );
};

export default ScreensUM;
