import { createNativeStackNavigator } from '@react-navigation/native-stack';
import View from './view';
import Create from './create';
import Update from './update';
import Details from './view/details';
import SelectEmpresa from '@/components/Custom/Screens/SelectEmpresa';
import SelectMarca from '@/components/Custom/Screens/SelectMarca';
import SelectTipoProduto from '@/components/Custom/Screens/SelectTipoProduto';
import SelectUm from '@/components/Custom/Screens/SelectUm';
import SelectUa from '@/components/Custom/Screens/SelectUa';

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
      <Stack.Screen
        name="selecionar-empresa"
        component={SelectEmpresa}
        options={{ title: 'Selecione uma Empresa' }}
      />
      <Stack.Screen
        name="selecionar-marca"
        component={SelectMarca}
        options={{ title: 'Selecione uma Marca' }}
      />
      <Stack.Screen
        name="selecionar-tipo-produto"
        component={SelectTipoProduto}
        options={{ title: 'Selecione uma Tipo de Produto' }}
      />
      <Stack.Screen
        name="selecionar-um"
        component={SelectUm}
        options={{ title: 'Selecione uma Unidade de Medida' }}
      />
      <Stack.Screen
        name="selecionar-ua"
        component={SelectUa}
        options={{ title: 'Selecione uma Unidade de Armazenamento' }}
      />
    </Stack.Navigator>
  );
};

export default ProdutoScreens;
