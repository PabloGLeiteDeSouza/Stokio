export class CreateEnderecoDto {
  logradouro: string;
  numero: number;
  cep: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
  id_pessoa: number;

  constructor(
    logradouro: string,
    numero: number,
    cep: string,
    complemento: string,
    bairro: string,
    cidade: string,
    uf: string,
    id_pessoa: number,
  ) {
    this.logradouro = logradouro;
    this.numero = numero;
    this.cep = cep;
    this.complemento = complemento;
    this.bairro = bairro;
    this.cidade = cidade;
    this.uf = uf;
    this.id_pessoa = id_pessoa;
  }
}
