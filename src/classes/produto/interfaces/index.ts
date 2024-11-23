import { Empresa, EmpresaCustomSimpleRequest } from "@/classes/empresa/types";
import { UnidadeDeArmazenamento } from "@/classes/ua/interfaces";

export interface UnidadeDeMedida {
  id: number;
  nome: string;
  valor: string;
}

export interface TipoProduto {
  id: number;
  nome: string;
}

export interface Marca {
  id: number;
  nome: string;
}

export interface Produto {
  id: number;
  codigo_de_barras: string;
  data_de_validade: string;
  nome: string;
  descricao: string | null;
  valor: number;
  quantidade: number;
  tamanho: number;
  id_empresa: number;
  id_marca: number;
  id_tipo_produto: number;
  id_um: number;
  id_ua: number;
}

export interface ProdutoObjectRequestAll { 
  id: number; 
  nome: string; 
  data_de_validade: string; 
  tipo: string; 
  marca: string;
  quantidade: number;
}

export interface ProdutoObjectComplete extends Omit<Produto, 'id_empresa' | 'id_marca' | 'id_tipo_produto' | 'id_um' | 'id_ua'> {
  empresa: EmpresaCustomSimpleRequest;
  marca: Marca;
  tipo_produto: TipoProduto;
  unidade_de_medida: UnidadeDeMedida;
  unidade_de_armazenamento: UnidadeDeArmazenamento;
}


export interface ProdutoVendaRequest {
  id: number;
  codigo_de_barras: string;
  nome: string;
  data_validade: string;
  marca: string;
  tipo: string;
  valor_unitario: number;
  empresa: string;
  quantidade: number;
}

export interface ProdutoCompraRequest {
  id: number;
  codigo_de_barras: string;
  nome: string;
  data_validade: string;
  marca: string;
  tipo: string;
  valor_unitario: number;
  empresa: string;
  quantidade: number;
}