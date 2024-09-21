import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import View from './view';
import Create from './create';
import Update from './update';
import ScreensRamo from './Ramo';

const Stack = createNativeStackNavigator();

const EmpresasScreens: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="listar-empresas">
      <Stack.Screen
        name="listar-empresas"
        component={View}
        options={{
          title: 'Listar Empresas',
        }}
      />
      <Stack.Screen
        name="cadastrar-empresas"
        component={Create}
        options={{
          title: 'Cadastrar Empresas',
        }}
      />
      <Stack.Screen
        name="editar-empresas"
        component={Update}
        options={{
          title: 'Editar Empresas',
        }}
      />
      <Stack.Screen
        name="screens-ramos"
        component={ScreensRamo}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default EmpresasScreens;
