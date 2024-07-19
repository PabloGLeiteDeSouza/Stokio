export class CreateEnderecoDto {
  id?: number;
  logradouro: string;
  numero: number;
  cep: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;

  constructor(
    logradouro: string,
    numero: number,
    cep: string,
    complemento: string,
    bairro: string,
    cidade: string,
    uf: string,
    id?: number,
  ) {
    this.id = id;
    this.logradouro = logradouro;
    this.numero = numero;
    this.cep = cep;
    this.complemento = complemento;
    this.bairro = bairro;
    this.cidade = cidade;
    this.uf = uf;
  }
}
