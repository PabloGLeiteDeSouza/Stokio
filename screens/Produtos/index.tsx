import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import * as SplashScreen from 'expo-splash-screen';
import View from './view';
import Update from './update';
import Create from './create';

const Stack = createNativeStackNavigator();

const ProdutosScreens: React.FC = () => {
  React.useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <Stack.Navigator initialRouteName="listar-produtos">
      <Stack.Screen
        name="cadastrar-produtos"
        component={Create}
        options={{ title: 'Cadastrar Produtos' }}
      />
      <Stack.Screen
        name="listar-produtos"
        component={View}
        options={{ title: 'Listar Produtos' }}
      />
      <Stack.Screen
        name="editar-produtos"
        component={Update}
        options={{ title: 'Editar Produtos' }}
      />
    </Stack.Navigator>
  );
};

export default ProdutosScreens;
