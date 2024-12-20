import { ParamListBase, RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
  'screens-produtos'?: object;
  'screens-tipos-produtos'?: object;
  'screens-categorias'?: object;
  'screens-empresas'?: object;
  'screens-marcas'?: object;
  'screens-uas'?: object;
  'screens-ums'?: object;
  'screens-vendas'?: object;
  'screens-tipos-uas'?: object;
  'screens-ramos'?: object;
  'item-venda-screens'?: object;
  'code-scanner'?: { screen: string; type: string };
  'listar-produtos'?: { code?: string };
  'listar-empresas'?: object;
  'listar-ua'?: object;
  'listar-tipo-ua'?: object;
  'listar-um'?: object;
  'listar-categoria'?: object;
  'listar-tipo-produto'?: object;
  'listar-marca'?: object;
  'listar-vendas'?: object;
  'listar-clientes'?: object;
  'listar-ramos'?: object;
  'listar-venda'?: object;
  'listar-item-venda'?: object;
  'cadastrar-produtos'?: { code?: string; result?: boolean };
  'cadastrar-clientes'?: object;
  'cadastrar-empresas'?: object;
  'cadastrar-categoria'?: object;
  'cadastrar-marca'?: object;
  'cadastrar-tipo-produto'?: object;
  'cadastrar-ua'?: object;
  'cadastrar-tipo-ua'?: object;
  'cadastrar-um'?: object;
  'cadastrar-ramo'?: object;
  'cadastrar-venda'?: object;
  'cadastrar-item-venda'?: { code?: string; result?: boolean };
  'editar-produtos'?: object;
  'editar-empresas'?: { empresa: EmpresaCreateData };
  'editar-ua'?: object;
  'editar-um'?: { um: UpdateUmDto };
  'editar-categoria'?: { categoria: UpdateCategoriaDto };
  'editar-marca'?: object;
  'editar-tipo-produto'?: { tipo_de_produto: UpdateTipoDeProdutoDto };
  'editar-tipo-ua'?: object;
  'editar-ramo'?: { ramo: UpdateRamoDto };
  'editar-clientes'?: { cliente: ClientesObject };
  'editar-venda'?: object;
  'editar-venda-item'?: object;
  'tab-bottom'?: object;
  'auth-screen'?: object;
  configuracoes?: object;
};

export type UpdateEmpresaObject = {
  ramo: UpdateRamoDto;
  id: number;
  id_pessoa: number;
  id_ramo: number;
  nome_fantasia?: string;
  razao_social?: string;
  cnpj?: string;
};

export type ScreensScanCode =
  | 'cadastrar-produtos'
  | 'listar-produtos'
  | 'cadastrar-item-venda';

export type ScreenComponentType<
  ParamList extends ParamListBase,
  RouteName extends keyof ParamList,
> =
  | React.ComponentType<{
      route: RouteProp<ParamList, RouteName>;
      navigation: unknown;
    }>
  | React.ComponentType<object>;

export type TypeUpdateEmpresasObjectToScreen = object;
