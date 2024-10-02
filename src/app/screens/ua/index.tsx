import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Create from './create';
import View from './view';
import Update from './update';

const Stack = createNativeStackNavigator();

const UaScreens: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="visualizar-uas"
        component={View}
        options={{ title: 'Visualizar Unidade de Armazenamento' }}
      />
      <Stack.Screen
        name="cadastrar-ua"
        component={Create}
        options={{ title: 'Cadastrar Unidades de Armazenamento' }}
      />
      <Stack.Screen
        name="editar-ua"
        component={Update}
        options={{ title: 'Editar Unidades de Armazenamento' }}
      />
    </Stack.Navigator>
  );
};

export default UaScreens;
