export class CreateTelefoneDto {
  id?: number;
  telefone: string;
  id_empresa: number;

  constructor(telefone: string, id_empresa: number, id?: number) {
    this.id = id;
    this.telefone = telefone;
    this.id_empresa = id_empresa;
  }
}
