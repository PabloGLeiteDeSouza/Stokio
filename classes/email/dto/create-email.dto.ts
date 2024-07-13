export class CreateEmailDto {
  id?: number;
  email: string;
  id_empresa: number;

  constructor(email: string, id_empresa: number, id?: number) {
    this.email = email;
    this.id_empresa = id_empresa;
    this.id = id;
  }
}
