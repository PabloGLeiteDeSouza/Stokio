import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import View from './view';
import Create from './create';
import Update from './update';

const Stack = createNativeStackNavigator();

const ClientesScreens: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="listar-clientes">
      <Stack.Screen
        name="listar-clientes"
        component={View}
        options={{ title: 'Listar Clientes' }}
      />
      <Stack.Screen
        name="cadastrar-clientes"
        component={Create}
        options={{ title: 'Cadastrar Clientes' }}
      />
      <Stack.Screen
        name="editar-clientes"
        component={Update}
        options={{ title: 'Editar Clientes' }}
      />
    </Stack.Navigator>
  );
};

export default ClientesScreens;
