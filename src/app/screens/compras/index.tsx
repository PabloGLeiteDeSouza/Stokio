import { createNativeStackNavigator } from '@react-navigation/native-stack';
import View from './view';
import Create from './create';
import Update from './update';
import Details from './view/details';
import SelectProduto from '@/components/Custom/Screens/SelectProduto';
import SelectEmpresa from '@/components/Custom/Screens/SelectEmpresa';

const Stack = createNativeStackNavigator();

const ComprasScreens: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="visualizar-compras"
        component={View}
        options={{ title: 'Visualizar Compras' }}
      />
      <Stack.Screen
        name="cadastrar-compra"
        component={Create}
        options={{ title: 'Cadastrar Compra' }}
      />
      <Stack.Screen
        name="atualizar-compra"
        component={Update}
        options={{ title: 'Atualizar Compra' }}
      />
      <Stack.Screen
        name="detalhes-compra"
        component={Details}
        options={{ title: 'Detalhes da Compra' }}
      />
      <Stack.Screen
        name="selecionar-empresa"
        component={SelectEmpresa}
        options={{ title: 'Selecionar Empresa' }}
      />
      <Stack.Screen
        name="selecionar-produto"
        component={SelectProduto}
        options={{ title: 'Selecionar Produto' }}
      />
    </Stack.Navigator>
  );
};

export default ComprasScreens;
