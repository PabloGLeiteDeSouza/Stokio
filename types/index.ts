import { ParamListBase, RouteProp } from "@react-navigation/native";

export type RootStackParamList = {
    "cadastrar-produtos"?: { code?: string, result?: boolean};
    "code-scanner"?: { screen: string, type: string };
    "listar-produtos"?: { code?: string; result?: boolean };
    "listar-empresas"?: {  };
    "listar-clientes"?: {  };
    "cadastrar-clientes"?: {};
    "cadastrar-empresas"?: {};
    "tab-bottom"?: {};
    "auth-screen"?: {};
};

export type ScreensScanCode = "cadastrar-produtos" | "listar-produtos";

export type ScreenComponentType<
  ParamList extends ParamListBase,
  RouteName extends keyof ParamList
> =
  | React.ComponentType<{
      route: RouteProp<ParamList, RouteName>;
      navigation: any;
    }>
  | React.ComponentType<{}>;