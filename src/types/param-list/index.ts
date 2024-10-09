export type RootStackParamList = {
  'code-scanner'?: { screen: ParamListCodeScanner };
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
  'screens-itens-venda'?: object;
  'visualizar-produtos'?: { code?: string; result?: boolean };
  'visualizar-empresas'?: object;
  'visualizar-uas'?: object;
  'visualizar-tipo-uas'?: object;
  'visualizar-ums'?: object;
  'visualizar-categorias'?: object;
  'visualizar-tipo-produtos'?: object;
  'visualizar-marcas'?: object;
  'visualizar-vendas'?: object;
  'visualizar-clientes'?: object;
  'visualizar-ramos'?: object;
  'visualizar-itens-vendas'?: object;
  'detalhes-cliente'?: { id: number | string };
  'detalhes-empresa'?: { id: number | string };
  'detalhes-produto'?: { id: number | string };
  'detalhes-venda'?: { id: number | string };
  'detalhes-ua'?: { id: number | string };
  'cadastrar-produto'?: { code?: string; result?: boolean };
  'cadastrar-cliente'?: { nome?: string };
  'cadastrar-empresa'?: object;
  'cadastrar-categoria'?: object;
  'cadastrar-marca'?: object;
  'cadastrar-tipo-produto'?: object;
  'cadastrar-ua'?: object;
  'cadastrar-tipo-ua'?: object;
  'cadastrar-um'?: object;
  'cadastrar-ramo'?: object;
  'cadastrar-venda'?: object;
  'cadastrar-item-venda'?: object;
  'atualizar-produto'?: { id: number | string };
  'atualizar-empresa'?: { id: number | string };
  'atualizar-ua'?: { id: number | string };
  'atualizar-um'?: { id: number | string };
  'atualizar-marca'?: { id: number | string };
  'atualizar-tipo-produto'?: { id: number | string };
  'atualizar-tipo-ua'?: { id: number | string };
  'atualizar-ramo'?: { id: number | string };
  'atualizar-cliente'?: { id: number | string };
  'atualizar-venda'?: { id: number | string };
  'atualizar-venda-item'?: { id: number | string };
  'app-screens'?: object;
  'auth-screen'?: object;
  'screens-config'?: object;
  configuracoes?: object;
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
  | 'visualizar-produtos'
  | 'visualizar-empresas'
  | 'visualizar-ua'
  | 'visualizar-tipo-ua'
  | 'visualizar-um'
  | 'visualizar-categoria'
  | 'visualizar-tipo-produto'
  | 'visualizar-marca'
  | 'visualizar-vendas'
  | 'visualizar-clientes'
  | 'visualizar-ramos'
  | 'visualizar-venda'
  | 'visualizar-item-venda'
  | 'detalhes-cliente'
  | 'detalhes-empresa'
  | 'detalhes-produto'
  | 'detalhes-venda'
  | 'detalhes-ua'
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
  | 'atualizar-produtos'
  | 'atualizar-empresas'
  | 'atualizar-ua'
  | 'atualizar-um'
  | 'atualizar-categoria'
  | 'atualizar-marca'
  | 'atualizar-tipo-produto'
  | 'atualizar-tipo-ua'
  | 'atualizar-ramo'
  | 'atualizar-clientes'
  | 'atualizar-venda'
  | 'atualizar-venda-item'
  | 'app-screens'
  | 'auth-screen'
  | 'screens-config'
  | 'configuracoes';

export type ParamListCodeScanner =
  | 'cadastrar-produto'
  | 'visualizar-produtos'
  | 'cadastrar-venda';
