import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Create from './create';
import View from './view';
import Update from './update';
import Details from './view/details';
import SelectTipoUA from '@/components/Custom/Screens/SelectTipoUa';

const Stack = createNativeStackNavigator();

const UaScreens: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="visualizar-uas"
        component={View}
        options={{ title: 'Visualizar Unidades de Armazenamento' }}
      />
      <Stack.Screen
        name="cadastrar-ua"
        component={Create}
        options={{ title: 'Cadastrar Unidade de Armazenamento' }}
      />
      <Stack.Screen
        name="atualizar-ua"
        component={Update}
        options={{ title: 'Editar Unidade de Armazenamento' }}
      />
      <Stack.Screen
        name="detalhes-ua"
        component={Details}
        options={{ title: 'Detalhes da Unidade de Armazenamento' }}
      />
      <Stack.Screen
        name="selecionar-tipo-ua"
        component={SelectTipoUA}
        options={{ title: 'Selecionar Tipo de Unidade de Armazenamento' }}
      />
    </Stack.Navigator>
  );
};

export default UaScreens;
