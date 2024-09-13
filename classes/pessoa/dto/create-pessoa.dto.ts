export class CreatePessoaDto {
  nome: string;
  data_de_nascimento: Date;
  cpf: string;

  constructor(nome: string, data_de_nascimento: Date, cpf: string) {
    this.nome = nome;
    this.data_de_nascimento = data_de_nascimento;
    this.cpf = cpf;
  }
}
