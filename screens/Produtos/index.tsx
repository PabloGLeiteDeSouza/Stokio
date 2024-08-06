import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import * as SplashScreen from 'expo-splash-screen';
import View from './View';
import Update from './Update';
import Create from './Create';
import ScreensCategoria from './Categoria';
import ScreensMarca from './Marca';
import ScreensTipo from './Tipo';

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
      <Stack.Screen
        name="screens-categorias"
        component={ScreensCategoria}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="screens-marcas"
        component={ScreensMarca}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="scrrens-tipo-produto"
        component={ScreensTipo}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default ProdutosScreens;
