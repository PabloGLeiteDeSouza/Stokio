export class CreateEmailDto {
  email: string;
  id_pessoa: number;

  constructor(email: string, id_pessoa: number) {
    this.email = email;
    this.id_pessoa = id_pessoa;
  }
}
