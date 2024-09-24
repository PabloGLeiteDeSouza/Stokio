export class CreateTelefoneDto {
  telefone: string;
  id_pessoa: number;

  constructor(telefone: string, id_pessoa: number) {
    this.telefone = telefone;
    this.id_pessoa = id_pessoa;
  }
}
