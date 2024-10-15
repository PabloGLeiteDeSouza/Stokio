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
  codigoDeBarras: string;
  dataDeValidade: string;
  nome: string;
  descricao?: string;
  valor: number;
  quantidade: number;
  idMarca: number;
  idTipoProduto: number;
  idUnidadeDeMedida: number;
  tamanho: number;
  idUnidadeDeArmazenamento: number;
}
