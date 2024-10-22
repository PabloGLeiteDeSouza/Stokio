export interface TipoUaUpdate {
  id: number;
  nome: string;
}

export interface TipoUaCreate extends Omit<TipoUaUpdate, 'id'> {}
