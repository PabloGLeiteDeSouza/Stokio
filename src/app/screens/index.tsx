import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import VendasScreens from './vendas';
import UaScreens from './ua';
import EmpresasScreens from './empresa';
import ConfigScreens from './config';
import ClienteScreens from './cliente';
import { FontAwesome6, Ionicons } from '@expo/vector-icons';

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
        }}
      />
      <Tab.Screen
        name="empresa-screens"
        component={EmpresasScreens}
        options={{
          tabBarIcon: (props) => <FontAwesome6 name="building" {...props} />,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="venda-screens"
        component={VendasScreens}
        options={{
          tabBarIcon: (props) => (
            <FontAwesome6 name="bag-shopping" {...props} />
          ),
          headerShown: false,
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
        }}
      />
      <Tab.Screen
        name="screens-config"
        component={ConfigScreens}
        options={{
          tabBarIcon: (props) => <Ionicons name="settings" {...props} />,
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default Screens;
