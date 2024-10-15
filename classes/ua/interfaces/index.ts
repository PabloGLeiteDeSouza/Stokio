export interface UnidadeDeArmazenamento {
  id: number;
  nome: string;
  descricao?: string;
  idTipoDeUnidadeDeArmazenamento: number;
}

export interface TipoDeUnidadeDeArmazenamento {
  id: number;
  nome: string;
  descricao?: string;
}
