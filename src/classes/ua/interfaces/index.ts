export interface UnidadeDeArmazenamento {
  id: number;
  nome: string;
  descricao?: string;
  id_tipo_ua: number;
}

export interface UnidadeDeArmazenamentoObject extends Omit<UnidadeDeArmazenamento, 'id_tipo_ua'> {
  tipo_ua: TipoDeUnidadeDeArmazenamento;
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


