import { UpdateEmpresaDto } from "$classes/empresa/dto/update-empresa.dto";
import { UpdateProdutoDto } from "$classes/produto/dto/update-produto.dto";
import { UpdateUnidadeDeArmazenamentoDto } from "$classes/ua/dto/update-ua.dto";
import { ParamListBase, RouteProp } from "@react-navigation/native";

export type RootStackParamList = {
    "cadastrar-produtos"?: { code?: string, result?: boolean};
    "code-scanner"?: { screen: string, type: string };
    "listar-produtos"?: { code?: string; result?: boolean };
    "listar-empresas"?: {  };
    "listar-ua"?: {  };
    "listar-clientes"?: {  };
    "cadastrar-clientes"?: {};
    "cadastrar-empresas"?: {};
    "cadastrar-ua"?: { ua: UpdateUnidadeDeArmazenamentoDto };
    "editar-produtos"?: { produto: {...UpdateProdutoDto} };
    "editar-empresas"?: { empresa: UpdateEmpresaDto };
    "editar-ua"?: {};
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