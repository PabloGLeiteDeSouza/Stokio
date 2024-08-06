import { createNativeStackNavigator } from '@react-navigation/native-stack';
import View from './View';
import Create from './Create';
import Update from './Update';

const Stack = createNativeStackNavigator();

const ScreensCategoria: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="listar-categoria"
        component={View}
        options={{ title: 'Visualizar Categorias' }}
      />
      <Stack.Screen
        name="cadastrar-categoria"
        component={Create}
        options={{ title: 'Cadastrar Categorias' }}
      />
      <Stack.Screen
        name="editar-categoria"
        component={Update}
        options={{ title: 'Atualizar Categorias' }}
      />
    </Stack.Navigator>
  );
};

export default ScreensCategoria;
