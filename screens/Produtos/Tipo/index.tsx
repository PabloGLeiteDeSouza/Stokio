import { createNativeStackNavigator } from '@react-navigation/native-stack';
import View from './View';
import Create from './Create';
import Update from './Update';

const Stack = createNativeStackNavigator();

const ScreensTipo: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="listar-tipo-produto"
        component={View}
        options={{ title: 'Visualizar Tipos de Produtos' }}
      />
      <Stack.Screen
        name="cadastrar-tipo"
        component={Create}
        options={{ title: 'Cadastrar Tipo de Produto' }}
      />
      <Stack.Screen
        name="atualizar-tipo"
        component={Update}
        options={{ title: 'Atualizar Tipo de Produto' }}
      />
    </Stack.Navigator>
  );
};

export default ScreensTipo;
