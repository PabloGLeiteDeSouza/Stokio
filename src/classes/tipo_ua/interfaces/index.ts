export interface TipoUaUpdate {
  id: number;
  nome: string;
  descricao: string;
}

export interface TipoUaCreate extends Omit<TipoUaUpdate, 'id'> {}
