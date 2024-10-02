import { createNativeStackNavigator } from '@react-navigation/native-stack';
import View from './view';
import Create from './create';
import Update from './update';

const Stack = createNativeStackNavigator();

const EmpresasScreens: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="visualizar-empresas"
        component={View}
        options={{ title: 'Visualizar Empresas' }}
      />
      <Stack.Screen
        name="cadastrar-empresas"
        component={Create}
        options={{ title: 'Cadastrar Empresas' }}
      />
      <Stack.Screen
        name="editar-empresas"
        component={Update}
        options={{ title: 'Editar Empresas' }}
      />
    </Stack.Navigator>
  );
};

export default EmpresasScreens;
