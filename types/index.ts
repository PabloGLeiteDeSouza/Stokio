import { ParamListBase, RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
  'cadastrar-produtos'?: { code?: string; result?: boolean };
  'code-scanner'?: { screen: string; type: string };
  'listar-produtos'?: { code?: string };
  'listar-empresas'?: object;
  'listar-ua'?: object;
  'listar-tipo-ua'?: object;
  'listar-um'?: object;
  'listar-categoria'?: object;
  'listar-tipo'?: object;
  'listar-marca'?: object;
  'listar-vendas'?: object;
  'listar-clientes'?: object;
  'cadastrar-clientes'?: { nome?: string };
  'cadastrar-empresas'?: object;
  'cadastrar-categoria'?: object;
  'cadastrar-marca'?: object;
  'cadastrar-tipo-produto'?: object;
  'cadastrar-ua'?: object;
  'cadastrar-tipo-ua'?: object;
  'cadastrar-um'?: object;
  'editar-produtos'?: object;
  'editar-empresas'?: { empresa: UpdateEmpresaObject };
  'editar-ua'?: object;
  'editar-um'?: object;
  'editar-categoria'?: object;
  'editar-marca'?: object;
  'editar-tipo-produto'?: object;
  v;
  'editar-tipo-ua'?: object;
  'tab-bottom'?: object;
  'auth-screen'?: object;
};

export type UpdateEmpresaObject = {
  id: number;
  id_endereco: number;
  nome_completo?: string;
  data_de_nascimento?: string;
  cpf?: string;
  nome_fantasia?: string;
  razao_social?: string;
  cnpj?: string;
};

export type ScreensScanCode = 'cadastrar-produtos' | 'listar-produtos';

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
