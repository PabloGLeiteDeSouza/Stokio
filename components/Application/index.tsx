import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CodeScannerScreen from "../CodeScannerScreen";
import ProdutosScreens from "../../screens/Produtos";
import { FontAwesome, FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import {
  NavigationContainer,
  RouteProp,
  ThemeProvider,
} from "@react-navigation/native";
import ClientesScreens from "$screens/Clientes";
import EmpresasScreens from "$screens/Empresas";
import { useThemeApp } from "$providers/theme";
import { ConfigTheme } from "../../constants/colors";
import ToggleTheme from "$components/ToggleTheme";
import React from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "$types/index";
import { AuthScreen } from "$screens/Auth";
import * as SplashScreen from "expo-splash-screen";
import { Auth } from "../../functions/Auth";

const TabBottom = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

type ActionApplicationType = {
  type: "change_auth" | "change_load" | "change_all";
  isLoad?: boolean;
  isAuth?: boolean;
};

type StateApplicationType = {
  isLoad: boolean;
  isAuth: boolean;
};

const Application: React.FC = () => {
  const reducer = (
    state: StateApplicationType,
    action: ActionApplicationType
  ): StateApplicationType => {
    switch (action.type) {
      case "change_auth":
        return {
          isLoad: state.isLoad,
          isAuth: Boolean(action.isAuth),
        };
      case "change_load":
        return {
          isLoad: Boolean(action.isLoad),
          isAuth: state.isAuth,
        };
      case "change_all":
        return {
          isLoad: Boolean(action.isLoad),
          isAuth: Boolean(action.isAuth),
        }
      default:
        throw new Error("Erro ao atualizar o estado");
    }
  };

  const { theme } = useThemeApp();
  const [state, dispatch] = React.useReducer<
    React.Reducer<StateApplicationType, ActionApplicationType>
  >(reducer, { isLoad: true, isAuth: false });

  React.useEffect(() => {
    async function Start() {
      const res = await Auth();
      if (res) {
        dispatch({ type: 'change_all', isAuth: true, isLoad: false});
        await SplashScreen.hideAsync();
      } else {
        dispatch({ type: 'change_load', isLoad: false })
        await SplashScreen.hideAsync();
      }
    }
    Start();
  }, []);

  if (state.isLoad) {
    return null;
  }

  return (
    <NavigationContainer
      theme={theme === "dark" ? ConfigTheme.dark : ConfigTheme.light}
    >
      <Stack.Navigator initialRouteName={state.isAuth ? "tab-bottom" : "auth-screen"}>
        <Stack.Screen
          name="tab-bottom"
          component={TabBottomScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="code-scanner"
          component={CodeScannerScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="auth-screen"
          component={AuthScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
      <ToggleTheme />
    </NavigationContainer>
  );
};

type TabBottomScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "tab-bottom"
>;
type TabBottomScreenRouteProp = RouteProp<RootStackParamList, "tab-bottom">;

interface TabBottomScreenProps {
  navigation?: TabBottomScreenNavigationProp;
  route?: TabBottomScreenRouteProp;
}

const TabBottomScreen: React.FC<TabBottomScreenProps> = ({
  navigation,
  route,
}) => {
  return (
    <TabBottom.Navigator>
      <TabBottom.Screen
        name="produtos-screens"
        component={ProdutosScreens}
        options={{
          headerShown: false,
          title: "Produtos",
          tabBarIcon: (props) => <FontAwesome name="shopping-bag" {...props} />,
        }}
      />
      <TabBottom.Screen
        name="empresas-screens"
        component={EmpresasScreens}
        options={{
          title: "Empresas",
          headerShown: false,
          tabBarIcon: (props) => <FontAwesome6 name="building" {...props} />,
        }}
      />
      <TabBottom.Screen
        name="clientes-screens"
        component={ClientesScreens}
        options={{
          title: "Clientes",
          headerShown: false,
          tabBarIcon: (props) => <FontAwesome6 name="person" {...props} />,
        }}
      />
    </TabBottom.Navigator>
  );
};

export default Application;
