export class CreateItemVendaDto {
  id?: number;
  quantidade: number;
  id_produto: number;
  id_venda: number;
  constructor(
    quantidade: number,
    id_produto: number,
    id_venda: number,
    id?: number,
  ) {
    this.quantidade = quantidade;
    this.id_produto = id_produto;
    this.id_venda = id_venda;
    this.id = id;
  }
}
