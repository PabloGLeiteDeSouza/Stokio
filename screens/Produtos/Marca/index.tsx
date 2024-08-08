import { createNativeStackNavigator } from '@react-navigation/native-stack';
import View from './View';
import Create from './Create';
import Update from './Update';

const Stack = createNativeStackNavigator();

const ScreensMarca: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="visualizar-marca"
        component={View}
        options={{ title: 'Visualizar Marcas' }}
      />
      <Stack.Screen
        name="cadastrar-marca"
        component={Create}
        options={{ title: 'Cadastrar Marcas' }}
      />
      <Stack.Screen
        name="atualizar-marca"
        component={Update}
        options={{ title: 'Atualizar Marcas' }}
      />
    </Stack.Navigator>
  );
};

export default ScreensMarca;
