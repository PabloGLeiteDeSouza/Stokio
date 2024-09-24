import { CreateEnderecoDto } from './create-endereco.dto';

export class UpdateEnderecoDto extends CreateEnderecoDto {
  id: number;

  constructor(
    id: number,
    logradouro: string,
    numero: number,
    cep: string,
    complemento: string,
    bairro: string,
    cidade: string,
    uf: string,
    id_pessoa: number,
  ) {
    super(logradouro, numero, cep, complemento, bairro, cidade, uf, id_pessoa);
    this.id = id;
  }
}
