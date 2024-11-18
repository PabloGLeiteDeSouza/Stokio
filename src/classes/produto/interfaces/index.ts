export interface UnidadeDeMedida {
  id: number;
  nome: string;
  valor: string;
  descricao?: string;
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
  id_empresa: number;
  id_marca: number;
  id_tipo_produto: number;
  id_um: number;
  tamanho: number;
  id_ua: number;
}
