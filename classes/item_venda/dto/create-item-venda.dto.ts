export class CreateItemVendaDto {
  quantidade: number;
  valor: number;
  id_produto: number;
  id_venda: number;
  constructor(
    quantidade: number,
    valor: number,
    id_produto: number,
    id_venda: number,
  ) {
    this.quantidade = quantidade;
    this.valor = valor;
    this.id_produto = id_produto;
    this.id_venda = id_venda;
  }
}
