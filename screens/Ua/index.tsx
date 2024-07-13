import { View } from '@gluestack-ui/themed';
import { createStackNavigator } from '@react-navigation/stack';
import { Create } from './create';
import { Update } from './update';

const Stack = createStackNavigator();

export const UaScreens: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="visuzalizar-ua" component={View} />
      <Stack.Screen name="cadastrar-ua" component={Create} />
      <Stack.Screen name="atualizar-ua" component={Update} />
    </Stack.Navigator>
  );
};
