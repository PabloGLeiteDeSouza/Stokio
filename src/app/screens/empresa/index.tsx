import { createNativeStackNavigator } from '@react-navigation/native-stack';
import View from './view';
import Create from './create';
import Update from './update';
import Details from './view/details';
import SelectPessoa from '@/components/Custom/Screens/SelectPessoa';
import SelectRamo from '@/components/Custom/Screens/SelectRamo';

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
        name="cadastrar-empresa"
        component={Create}
        options={{ title: 'Cadastrar Empresa' }}
      />
      <Stack.Screen
        name="atualizar-empresa"
        component={Update}
        options={{ title: 'Atualizar Empresa' }}
      />
      <Stack.Screen
        name="detalhes-empresa"
        component={Details}
        options={{ title: 'Detalhes da Empresa' }}
      />
      <Stack.Screen
        name="selecionar-pessoa"
        component={SelectPessoa}
        options={{ title: 'Selecione uma pessoa' }}
      />
      <Stack.Screen
        name="selecionar-ramo"
        component={SelectRamo}
        options={{ title: 'Selecione uma ramo' }}
      />
    </Stack.Navigator>
  );
};

export default EmpresasScreens;
