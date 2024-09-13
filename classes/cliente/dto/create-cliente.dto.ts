export class CreateClienteDto {
  id?: number;
  id_pessoa: number;
  limite: number;
  status: boolean;

  constructor(id_pessoa: number, limite: number, status: boolean, id?: number) {
    this.id = id;
    this.id_pessoa = id_pessoa;
    this.limite = limite;
    this.status = status;
  }
}
