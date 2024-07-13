export class CreateEnderecoDto {
  id?: number;
  logradouro: string;
  numero: number;
  cep: string;
  complemento: string;
  bairro: string;
  cidade: string;
  UF: string;

  constructor(
    logradouro: string,
    numero: number,
    cep: string,
    complemento: string,
    bairro: string,
    cidade: string,
    UF: string,
    id?: number,
  ) {
    this.id = id;
    this.logradouro = logradouro;
    this.numero = numero;
    this.cep = cep;
    this.complemento = complemento;
    this.bairro = bairro;
    this.cidade = cidade;
    this.UF = UF;
  }
}
