import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Create from './Create';
import Update from './Update';
import View from './View';

const Stack = createNativeStackNavigator();

const ScreensTiposDeUas: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="listar-tipo-ua" component={View} />
      <Stack.Screen name="cadastrar-tipo-ua" component={Create} />
      <Stack.Screen name="editar-tipo-ua" component={Update} />
    </Stack.Navigator>
  );
};

export default ScreensTiposDeUas;
