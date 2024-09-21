export class CreateUmDto {
  nome: string;
  valor: string;
  descricao: string;

  constructor(nome: string, valor: string, descricao: string) {
    this.nome = nome;
    this.valor = valor;
    this.descricao = descricao;
  }
}
