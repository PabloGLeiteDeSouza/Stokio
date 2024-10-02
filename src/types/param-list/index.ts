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
  'cadastrar-produtos'?: { code?: string; result?: boolean };
  'code-scanner'?: { screen: string; type: string };
  'listar-produtos'?: { code?: string; result?: boolean };
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
  'cadastrar-clientes'?: { nome?: string };
  'cadastrar-empresas'?: object;
  'cadastrar-categoria'?: object;
  'cadastrar-marca'?: object;
  'cadastrar-tipo-produto'?: object;
  'cadastrar-ua'?: object;
  'cadastrar-tipo-ua'?: object;
  'cadastrar-um'?: object;
  'cadastrar-ramo'?: object;
  'cadastrar-venda'?: object;
  'cadastrar-item-venda'?: object;
  'editar-produtos'?: object;
  'editar-empresas'?: { empresa: UpdateEmpresaObject };
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
  'app-screens'?: object;
  'auth-screen'?: object;
  'screens-config'?: object;
};

export type ParamList =
  | 'screens-produtos'
  | 'screens-tipos-produtos'
  | 'screens-categorias'
  | 'screens-empresas'
  | 'screens-marcas'
  | 'screens-uas'
  | 'screens-ums'
  | 'screens-vendas'
  | 'screens-tipos-uas'
  | 'screens-ramos'
  | 'item-venda-screens'
  | 'cadastrar-produtos'
  | 'code-scanner'
  | 'listar-produtos'
  | 'listar-empresas'
  | 'listar-ua'
  | 'listar-tipo-ua'
  | 'listar-um'
  | 'listar-categoria'
  | 'listar-tipo-produto'
  | 'listar-marca'
  | 'listar-vendas'
  | 'listar-clientes'
  | 'listar-ramos'
  | 'listar-venda'
  | 'listar-item-venda'
  | 'cadastrar-clientes'
  | 'cadastrar-empresas'
  | 'cadastrar-categoria'
  | 'cadastrar-marca'
  | 'cadastrar-tipo-produto'
  | 'cadastrar-ua'
  | 'cadastrar-tipo-ua'
  | 'cadastrar-um'
  | 'cadastrar-ramo'
  | 'cadastrar-venda'
  | 'cadastrar-item-venda'
  | 'editar-produtos'
  | 'editar-empresas'
  | 'editar-ua'
  | 'editar-um'
  | 'editar-categoria'
  | 'editar-marca'
  | 'editar-tipo-produto'
  | 'editar-tipo-ua'
  | 'editar-ramo'
  | 'editar-clientes'
  | 'editar-venda'
  | 'editar-venda-item'
  | 'app-screens'
  | 'auth-screen'
  | 'screens-config';

export type ParamListCodeScanner = 'cadastrar-produtos' | 'listar-produtos';
