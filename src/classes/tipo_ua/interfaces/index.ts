export interface TipoUaUpdate {
  id: number;
  nome: string;
  descricao: string | null;;
}

export interface TipoUaCreate extends Omit<TipoUaUpdate, 'id'> {}
