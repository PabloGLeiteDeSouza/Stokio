import { createNativeStackNavigator } from '@react-navigation/native-stack';
import View from './view';
import Create from './create';
import Update from './update';

const Stack = createNativeStackNavigator();

const ScreensTipoUA: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="visualizar-tipo-uas"
        component={View}
        options={{ title: 'Visualizar Tipo de U.As' }}
      />
      <Stack.Screen
        name="cadastrar-tipo-ua"
        component={Create}
        options={{ title: 'Cadastrar Tipo de U.A' }}
      />
      <Stack.Screen
        name="atualizar-tipo-ua"
        component={Update}
        options={{ title: 'Atualizar Tipo de U.A' }}
      />
    </Stack.Navigator>
  );
};

export default ScreensTipoUA;
