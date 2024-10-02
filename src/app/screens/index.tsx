import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import VendasScreens from './vendas';
import UaScreens from './ua';
import EmpresasScreens from './empresa';
import ConfigScreens from './config';
import ClienteScreens from './cliente';
import { FontAwesome6, Ionicons } from '@expo/vector-icons';
import ProdutoScreens from './produto';

const Tab = createBottomTabNavigator();

const Screens: React.FC = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="screens-clientes"
        component={ClienteScreens}
        options={{
          tabBarIcon: (props) => <FontAwesome6 name="user" {...props} />,
          headerShown: false,
          title: 'Clientes',
        }}
      />
      <Tab.Screen
        name="empresa-screens"
        component={EmpresasScreens}
        options={{
          tabBarIcon: (props) => <FontAwesome6 name="building" {...props} />,
          headerShown: false,
          title: 'Empresas',
        }}
      />
      <Tab.Screen
        name="produto-screens"
        component={ProdutoScreens}
        options={{
          tabBarIcon: (props) => (
            <FontAwesome6 name="bag-shopping" {...props} />
          ),
          headerShown: false,
          title: 'Produtos'
        }}
      />
      <Tab.Screen
        name="venda-screens"
        component={VendasScreens}
        options={{
          tabBarIcon: (props) => (
            <FontAwesome6 name="cart-shopping" {...props} />
          ),
          headerShown: false,
          title: 'Vendas'
        }}
      />
      <Tab.Screen
        name="ua-screens"
        component={UaScreens}
        options={{
          tabBarIcon: (props) => (
            <FontAwesome6 name="boxes-stacked" {...props} />
          ),
          headerShown: false,
          title: 'Ua'
        }}
      />
      <Tab.Screen
        name="screens-config"
        component={ConfigScreens}
        options={{
          tabBarIcon: (props) => <Ionicons name="settings" {...props} />,
          headerShown: false,
          title: 'Configurações',
        }}
      />
    </Tab.Navigator>
  );
};

export default Screens;
