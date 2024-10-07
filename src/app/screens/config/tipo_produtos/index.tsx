import { createNativeStackNavigator } from '@react-navigation/native-stack';
import View from './view';
import Create from './create';
import Update from './update';

const Stack = createNativeStackNavigator();

const ScreensTipoProduto: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="visualizar-tipo-produto"
        component={View}
        options={{ title: 'Visualizar Tipo de Produto' }}
      />
      <Stack.Screen
        name="cadastrar-tipo-produto"
        component={Create}
        options={{ title: 'Cadastrar Tipo de Produto' }}
      />
      <Stack.Screen
        name="atualizar-tipo-produto"
        component={Update}
        options={{ title: 'Atualizar Tipo de Produto' }}
      />
    </Stack.Navigator>
  );
};

export default ScreensTipoProduto;
