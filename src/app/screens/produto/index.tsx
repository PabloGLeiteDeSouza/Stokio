import { createNativeStackNavigator } from '@react-navigation/native-stack';
import View from './view';
import Create from './create';
import Update from './update';
import Details from './view/details';

const Stack = createNativeStackNavigator();

const ProdutoScreens: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="visualizar-produto"
        component={View}
        options={{ title: 'Visualizar Produtos' }}
      />
      <Stack.Screen
        name="cadastrar-produto"
        component={Create}
        options={{ title: 'Cadastrar Produtos' }}
      />
      <Stack.Screen
        name="atualizar-produto"
        component={Update}
        options={{ title: 'Atualizar Produto' }}
      />
      <Stack.Screen
        name="detalhes-produto"
        component={Details}
        options={{ title: 'Detalhes do Produto' }}
      />
    </Stack.Navigator>
  );
};

export default ProdutoScreens;
