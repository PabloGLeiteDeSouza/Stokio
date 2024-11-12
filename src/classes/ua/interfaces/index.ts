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

export interface UnidadeDeArmazenamentoCreate {
  nome: string;
  descricao?: string;
  tipo_ua: {
    id: number;
    nome: string;
    descricao?: string;
  }
}


