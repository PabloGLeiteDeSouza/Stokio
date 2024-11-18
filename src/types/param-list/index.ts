import { UmUpdate } from '@/classes/um/interfaces';
import { Cliente, Pessoa } from '../screens/cliente';
import { Pessoa as pessoa } from '@/classes/empresa/types';
import { Empresa } from '../screens/empresa';
import { Marca } from '../screens/marca';
import { Produto } from '../screens/produto';
import { Ramo } from '../screens/ramo';
import { TipoProduto } from '../screens/tipo-produto';
import { TipoUa } from '../screens/tipo-ua';
import { Ua } from '../screens/ua';
import { Um } from '../screens/um';
import { TipoUaUpdate } from '@/classes/tipo_ua/interfaces';

export type RootStackParamList = {
  'code-scanner'?: { screen: ParamListCodeScanner };
  'screens-produtos'?: object;
  'screens-comprar'?: object;
  'screens-tipos-produtos'?: object;
  'screens-clientes'?: object;
  'screens-empresas'?: object;
  'screens-marcas'?: object;
  'screens-uas'?: object;
  'screens-ums'?: object;
  'screens-vendas'?: object;
  'screens-tipos-uas'?: object;
  'screens-ramos'?: object;
  'screens-itens-venda'?: object;
  'visualizar-produtos'?: { code?: string; };
  'visualizar-empresas'?: object;
  'visualizar-uas'?: object;
  'visualizar-tipo-uas'?: object;
  'visualizar-ums'?: object;
  'visualizar-categorias'?: object;
  'visualizar-tipo-produtos'?: object;
  'visualizar-marcas'?: object;
  'visualizar-vendas'?: object;
  'visualizar-compras'?: object;
  'visualizar-clientes'?: object;
  'visualizar-ramos'?: object;
  'detalhes-cliente'?: { id: number };
  'detalhes-empresa'?: { id: number };
  'detalhes-produto'?: { id: number };
  'detalhes-venda'?: { id: number };
  'detalhes-ua'?: { id: number };
  'cadastrar-produto'?: { code?: string; };
  'cadastrar-cliente'?: { pessoa: Pessoa };
  'cadastrar-empresa'?: object;
  'cadastrar-categoria'?: object;
  'cadastrar-marca'?: object;
  'cadastrar-tipo-produto'?: object;
  'cadastrar-ua'?: object;
  'cadastrar-tipo-ua'?: object;
  'cadastrar-um'?: object;
  'cadastrar-ramo'?: object;
  'cadastrar-venda'?: { cliente?: Cliente; produto?: Produto; code?: string };
  'cadastrar-item-venda'?: object;
  'cadastrar-compra'?: { code?: string; };
  'atualizar-produto'?: { id: number };
  'atualizar-empresa'?: { id: number };
  'atualizar-ua'?: { id: number };
  'atualizar-um'?: { um: UmUpdate };
  'atualizar-marca'?: { id: number };
  'atualizar-tipo-produto'?: { id: number };
  'atualizar-tipo-ua'?: { id: number };
  'atualizar-ramo'?: { ramo: Ramo };
  'atualizar-cliente'?: { id: number };
  'atualizar-venda'?: { id: number };
  'atualizar-venda-item'?: { id: number };
  'atualizar-compra'?: object;
  'app-screens'?: object;
  'auth-screen'?: object;
  'screens-config'?: object;
  configuracoes?: object;
};

export type ParamList =
  | 'screens-comprar'
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
  | 'cadastrar-produto'
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
  | 'cadastrar-cliente'
  | 'cadastrar-empresa'
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
  | 'cadastrar-venda'
  | 'cadastrar-compra';

export type ProdutosStackParamList = {
  'code-scanner'?: { screen: ParamListCodeScanner };
  'screens-produtos'?: object;
  'screens-comprar'?: object;
  'screens-tipos-produtos'?: object;
  'screens-config'?: object;
  'screens-empresas'?: object;
  'screens-marcas'?: object;
  'cadastrar-marca'?: object;
  'screens-uas'?: object;
  'screens-ums'?: object;
  'cadastrar-um'?: object;
  'screens-vendas'?: object;
  'screens-tipos-uas'?: object;
  'screens-ramos'?: object;
  'screens-itens-venda'?: object;
  'visualizar-produtos'?: { code?: string; };
  'cadastrar-produto'?: {
    code?: string;
    marca?: { id: number; nome: string };
    tipo_produto?: { id: number; nome: string };
    ua?: Ua;
    um?: Um;
    empresa?: Empresa;
  };
  'detalhes-produto'?: { id: number };
  'atualizar-produto'?: {
    id: number;
    code?: string;
    marca?: { id: number; nome: string };
    tipo_produto?: { id: number; nome: string };
    ua?: { id: number; nome: string };
    um?: { id: number; nome: string };
    empresa?: Empresa;
  };
  'selecionar-marca'?: {
    screen: 'cadastrar-produto';
    marcaSelecionada?: { id: number; nome: string };
  };
  'selecionar-tipo-produto'?: {
    screen: 'cadastrar-produto';
    tipoProdutoSelecionado: { id: number; nome: string };
  };
  'selecionar-ua'?: {
    screen: 'cadastrar-produto';
    uaSelecionada?: { id: number; nome: string };
  };
  'selecionar-um'?: {
    screen: 'cadastrar-produto';
    umSelecionado?: { id: number; nome: string };
  };
  'selecionar-empresa'?: {
    screen: 'cadastrar-produto';
    empresaSelecionada?: Empresa;
  };
};

export type EmpresasStackParamList = {
  'screens-comprar'?: object;
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
  'cadastrar-empresa'?: { pessoa?: Omit<pessoa, 'data_nascimento'> & { data_nascimento: string }; ramo?: Ramo };
  'detalhes-empresa'?: { id: number };
  'atualizar-empresa'?: { id: number; pessoa?: pessoa; ramo?: Ramo };
  'selecionar-pessoa'?: {
    screen: 'cadastrar-empresa';
    pessoas: Array<Omit<pessoa, 'data_nascimento'> & { data_nascimento: string }>;
    pessoaSelecionada?: Omit<pessoa, 'data_nascimento'> & { data_nascimento: string };
  };
  'selecionar-ramo'?: {
    screen: 'cadastrar-empresa' | 'atualizar-empresa';
    ramoSelecionado?: { id: number; nome: string };
  };
};

type PerssoaSelectType = Omit<Pessoa, 'data_nascimento'> & {
  data_nascimento: string;
};

export type ClientesStackParamList = {
  'screens-comprar'?: object;
  'screens-clientes'?: object;
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
  'cadastrar-cliente'?: { pessoa: PerssoaSelectType };
  'atualizar-cliente'?: { id: number };
  'selecionar-pessoa'?: {
    screen: 'cadastrar-cliente' | 'atualizar-cliente';
    pessoas: PerssoaSelectType[];
    pessoaSelecionada?: PerssoaSelectType;
  };
  'visualizar-clientes'?: object;
  'detalhes-cliente'?: { id: number };
};

export type SelecionarPessoaStackParamList = {
  'selecionar-pessoa'?: {
    screen: 'cadastrar-cliente' | 'cadastrar-empresa';
    pessoaSelecionada?: PerssoaSelectType;
  };
  'cadastrar-cliente'?: { pessoa?: PerssoaSelectType };
  'cadastrar-empresa'?: { pessoa?: PerssoaSelectType };
};

export type SelecionarMarcaStackParamList = {
  'selecionar-marca'?: {
    screen: 'cadastrar-produto';
    marcaSelecionada?: Marca;
  };
  'cadastrar-produto'?: { marca: Marca };
};

export type SelecionarRamoStackParamList = {
  'selecionar-ramo'?: { screen: 'cadastrar-empresa'; ramoSelecionado?: Ramo };
  'cadastrar-empresa'?: { ramo: Ramo };
};

export type SelecionarProdutoStackParamList = {
  'selecionar-produto'?: {
    screen: 'cadastrar-venda';
    indexUpdated?: number;
    type: 'update' | 'create';
    selectedsProdutos?: Array<Produto>;
  };
  'cadastrar-venda'?: {
    produto: Produto;
    indexUpdated: number;
    type: 'update' | 'create';
  };
};

export type SelecionarTipoProdutoStackParamList = {
  'selecionar-tipo-produto'?: {
    screen: 'cadastrar-produto';
    tipoProdutoSelecionado?: TipoProduto;
  };
  'cadastrar-produto'?: { tipo_produto: TipoProduto };
};

export type SelecionarUaStackParamList = {
  'selecionar-ua'?: { screen: 'cadastrar-produto'; uaSelecionada?: Ua };
  'cadastrar-produto'?: { ua: Ua };
};

export type SelecionarTipoUaStackParamList = {
  'selecionar-tipo-ua'?: { screen: 'cadastrar-ua'; tipo_ua?: TipoUaUpdate };
  'cadastrar-ua'?: { tipo_ua: { id: number; nome: string } };
};

export type SelecionarUmStackParamList = {
  'selecionar-um'?: { screen: 'cadastrar-produto'; umSelecionada?: Um };
  'cadastrar-produto'?: { um: { id: number; nome: string } };
};

export type SelecionarClienteStackParamList = {
  'selecionar-cliente'?: {
    screen: 'cadastrar-venda';
    clienteSelecionado?: Cliente;
  };
  'cadastrar-venda'?: { cliente: Cliente };
};

export type SelecionarEmpresaStackParamList = {
  'selecionar-empresa'?: {
    screen: 'cadastrar-produto' | 'cadastrar-compra';
    empresaSelecionada?: Empresa;
  };
  'cadastrar-produto'?: { empresa: Empresa };
  'cadastrar-compra'?: { empresa: Empresa };
};

export type PessoasStackParamList = {
  'selecionar-pessoa'?: {
    screen: 'cadastrar-cliente' | 'cadastrar-empresa';
    pessoas: Array<PerssoaSelectType>;
    pessoaSelecionada: PerssoaSelectType;
  };
  'cadastrar-cliente'?: { pessoa?: PerssoaSelectType };
  'cadastrar-empresa'?: { pessoa?: PerssoaSelectType };
};

export type VendasStackParamList = {
  'code-scanner'?: { screen: ParamListCodeScanner };
  'screens-comprar'?: object;
  'detalhes-venda'?: { id: number };
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
  'screens-clientes'?: object;
  'cadastrar-venda'?: {
    cliente?: {
      id: number;
      nome: string;
      cpf: string;
    };
    produto?: {
      id: number;
      codigo_de_barras: string;
      nome: string;
      data_validade: string;
      tipo: string;
      marca: string;
      empresa: string;
      quantidade: string;
      valor: string;
    };
    type?: 'update' | 'create';
    indexUpdated?: number;
  };
  'atualizar-venda'?: { id: number };
  'visualizar-vendas'?: object;
  'selecionar-cliente'?: {
    screen: 'cadastrar-venda';
    clienteSelecionado?: { id: number; nome: string; cpf: string };
  };
  'selecionar-produto'?: {
    screen: 'cadastrar-venda';
    type: 'update' | 'create';
    indexUpdated?: number;
    selectedsProdutos?: Array<Produto>;
  };
};

export type ComprasStackParamList = {
  'code-scanner'?: { screen: ParamListCodeScanner };
  'screens-comprar'?: object;
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
  'screens-clientes'?: object;
  'cadastrar-compra'?: {
    empresa?: {
      id: number;
      nome_fantasia: string;
      razao_social: string;
      cpf: string;
      cnpj?: string;
    };
    produto?: {
      id: number;
      codigo_de_barras: string;
      nome: string;
      data_validade: string;
      tipo: string;
      marca: string;
      empresa: string;
      quantidade: number;
      valor: number;
    };
    code?: string;
    type?: 'update' | 'create';
    indexUpdated?: number;
  };
  'atualizar-compra'?: { id: number };
  'visualizar-compras'?: object;
  'detalhes-compra'?: { id: number };
  'selecionar-empresa'?: {
    screen: 'cadastrar-compra';
    empresaSelecionada?: { id: number; };
  };
  'selecionar-produto'?: {
    screen: 'cadastrar-compra' | 'atualizar-compra';
    type: 'update' | 'create';
    indexUpdated?: number;
    selectedsProdutos?: Array<Produto>;
  };
};

export type UasStackParamList = {
  'screens-comprar'?: object;
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
  'detalhes-ua'?: { id: number };
  'atualizar-ua'?: { id: number };
  'selecionar-tipo-ua'?: { tipo_ua: TipoUaUpdate; screen: 'cadastrar-ua' | 'atualizar-ua' };
};
