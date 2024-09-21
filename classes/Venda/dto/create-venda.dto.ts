export class CreateVendaDto {
  valor: number;
  data: Date;
  id_cliente: number;

  constructor(valor: number, data: Date, id_cliente: number) {
    this.valor = valor;
    this.data = data;
    this.id_cliente = id_cliente;
  }
}
