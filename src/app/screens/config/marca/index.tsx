import { createNativeStackNavigator } from '@react-navigation/native-stack';
import View from './view';
import Create from './create';
import Update from './update';

const Stack = createNativeStackNavigator();

const ScreensMarca: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="visualizar-marca"
        component={View}
        options={{ title: 'Viusualizar Marca' }}
      />
      <Stack.Screen
        name="cadastrar-marca"
        component={Create}
        options={{ title: 'Cadadastrar Marca' }}
      />
      <Stack.Screen
        name="editar-marca"
        component={Update}
        options={{ title: 'Atualizar Marca' }}
      />
    </Stack.Navigator>
  );
};

export default ScreensMarca;
