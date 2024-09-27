export class CreateEmpresaClienteDto {
  id_empresa: number;
  id_cliente: number;

  constructor(id_empresa: number, id_cliente: number) {
    this.id_empresa = id_empresa;
    this.id_cliente = id_cliente;
  }
}
