export interface UnidadeDeArmazenamento {
  id: number;
  nome: string;
  descricao: string | null;
  id_tipo_ua: number;
}

export interface UnidadeDeArmazenamentoListView {
  id: number;
  nome: string;
  tipo: string;
}

export interface UnidadeDeArmazenamentoObject extends Omit<UnidadeDeArmazenamento, 'id_tipo_ua'> {
  tipo_ua: TipoDeUnidadeDeArmazenamento;
}

export interface TipoDeUnidadeDeArmazenamento {
  id: number;
  nome: string;
  descricao: string | null;
}

export interface UnidadeDeArmazenamentoCreate {
  nome: string;
  descricao: string | null;
  tipo_ua: {
    id: number;
    nome: string;
    descricao?: string;
  }
}

export interface UnidadeDeArmazenamentoUpdate {
  id: number;
  nome: string;
  descricao: string | null;
  tipo_ua: {
    id: number;
    nome: string;
    descricao: string | null;
  }
}


