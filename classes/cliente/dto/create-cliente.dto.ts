export class CreateClienteDto {
  id_pessoa: number;
  limite: number;
  status: boolean;

  constructor(id_pessoa: number, limite: number, status: boolean) {
    this.id_pessoa = id_pessoa;
    this.limite = limite;
    this.status = status;
  }
}
