import { Cliente, Pessoa } from '../screens/cliente';
import { Empresa } from '../screens/empresa';
import { Marca } from '../screens/marca';
import { Produto } from '../screens/produto';
import { Ramo } from '../screens/ramo';
import { TipoProduto } from '../screens/tipo-produto';
import { TipoUa } from '../screens/tipo-ua';
import { Ua } from '../screens/ua';
import { Um } from '../screens/um';
import { Venda } from '../screens/venda';

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
  'cadastrar-cliente'?: { pessoa: Pessoa };
  'cadastrar-empresa'?: object;
  'cadastrar-categoria'?: object;
  'cadastrar-marca'?: object;
  'cadastrar-tipo-produto'?: object;
  'cadastrar-ua'?: object;
  'cadastrar-tipo-ua'?: object;
  'cadastrar-um'?: object;
  'cadastrar-ramo'?: object;
  'cadastrar-venda'?: { cliente?: Cliente; produto?: Produto };
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

export type ProdutosStackParamList = {
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
  'cadastrar-produto'?: {
    code?: string;
    result?: boolean;
    marca?: Marca;
    tipo_produto?: TipoProduto;
    ua?: Ua;
    um?: Um;
    empresa?: Empresa;
  };
  'detalhes-produto'?: { id: number | string };
  'atualizar-produto'?: { id: number | string };
  'selecionar-marca'?: { screen: 'cadastrar-produto' };
  'selecionar-tipo-produto'?: { screen: 'cadastrar-produto' };
  'selecionar-ua'?: { screen: 'cadastrar-produto' };
  'selecionar-um'?: { screen: 'cadastrar-produto' };
  'selecionar-empresa'?: { screen: 'cadastrar-produto' };
};

export type EmpresasStackParamList = {
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
  'visualizar-empresas'?: object;
  'cadastrar-empresa'?: { pessoa: Pessoa };
  'detalhes-empresa'?: { id: number | string };
  'atualizar-empresa'?: { id: number | string };
  'selecionar-pessoa'?: {
    screen: 'cadastrar-empresa';
    pessoas: Array<Pessoa>;
    pessoaSelecionada?: Pessoa;
  };
  'selecionar-ramo'?: { screen: 'cadastrar-empresa' };
};

export type ClientesStackParamList = {
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
  'cadastrar-cliente'?: { pessoa: Pessoa };
  'atualizar-cliente'?: { id: number | string };
  'selecionar-pessoa'?: {
    screen: 'cadastrar-cliente';
    pessoas: Array<Pessoa>;
    pessoaSelecionada?: Pessoa;
  };
  'visualizar-clientes'?: object;
  'detalhes-cliente'?: { id: number | string };
};

export type SelecionarPessoaStackParamList = {
  'selecionar-pessoa'?: { screen: 'cadastrar-cliente' | 'cadastrar-empresa' };
  'cadastrar-cliente'?: { pessoa?: Pessoa };
  'cadastrar-empresa'?: { pessoa?: Pessoa };
};

export type SelecionarMarcaStackParamList = {
  'selecionar-marca'?: { screen: 'cadastrar-produto' };
  'cadastrar-produto'?: { marca: Marca };
};

export type SelecionarRamoStackParamList = {
  'selecionar-ramo'?: { screen: 'cadastrar-empresa' };
  'cadastrar-empresa'?: { ramo: Ramo };
};

export type SelecionarProdutoStackParamList = {
  'selecionar-produto'?: { screen: 'cadastrar-venda' };
  'cadastrar-venda'?: { produto: Produto; quantidade: string };
};

export type SelecionarTipoProdutoStackParamList = {
  'selecionar-tipo-produto'?: { screen: 'cadastrar-produto' };
  'cadastrar-produto'?: { tipo_produto: TipoProduto };
};

export type SelecionarUaStackParamList = {
  'selecionar-ua'?: { screen: 'cadastrar-produto' };
  'cadastrar-produto'?: { ua: Ua };
};

export type SelecionarTipoUaStackParamList = {
  'selecionar-tipo-ua'?: { screen: 'cadastrar-ua' };
  'cadastrar-ua'?: { tipo_ua: TipoUa };
};

export type SelecionarUmStackParamList = {
  'selecionar-um'?: { screen: 'cadastrar-produto' };
  'cadastrar-produto'?: { um: Um };
};

export type SelecionarClienteStackParamList = {
  'selecionar-cliente'?: { screen: 'cadastrar-venda' };
  'cadastrar-venda'?: { cliente: Cliente };
};

export type SelecionarEmpresaStackParamList = {
  'selecionar-empresa'?: { screen: 'cadastrar-produto' };
  'cadastrar-produto'?: { empresa: Empresa };
};

export type PessoasStackParamList = {
  'selecionar-pessoa'?: {
    screen: 'cadastrar-cliente' | 'cadastrar-empresa';
    pessoas: Array<Pessoa>;
    pessoaSelecionada: Pessoa;
  };
  'cadastrar-cliente'?: { pessoa?: Pessoa };
  'cadastrar-empresa'?: { pessoa?: Pessoa };
};

export type VendasStackParamList = {
  'code-scanner'?: { screen: ParamListCodeScanner };
  'detalhes-venda'?: { id: number | string };
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
  'cadastrar-venda'?: { cliente?: Cliente; produto?: Produto };
  'atualizar-venda'?: { venda?: Venda };
  'selecionar-cliente'?: { screen: 'cadastrar-venda' };
};

export type UasStackParamList = {
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
  'cadastrar-ua'?: { tipo_ua?: TipoUa };
  'visualizar-uas'?: object;
  'detalhes-ua'?: { id: number | string };
  'atualizar-ua'?: { id: number | string };
  'selecionar-tipo-ua'?: { screen: 'cadastrar-ua' };
};
