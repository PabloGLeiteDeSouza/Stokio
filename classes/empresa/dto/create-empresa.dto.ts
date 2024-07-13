export class CreateEmpresaDto {
  id?: number;
  nome_completo?: string;
  data_de_nascimento?: Date;
  cpf?: string;
  nome_fantasia?: string;
  razao_social?: string;
  cnpj?: string;
  id_endereco: number;

  constructor(
    id_endereco: number,
    nome_completo?: string,
    data_de_nascimento?: Date,
    cpf?: string,
    nome_fantasia?: string,
    razao_social?: string,
    cnpj?: string,
    id?: number,
  ) {
    this.id_endereco = id_endereco;
    this.id = id;
    this.nome_completo = nome_completo;
    this.data_de_nascimento = data_de_nascimento;
    this.cpf = cpf;
    this.nome_fantasia = nome_fantasia;
    this.razao_social = razao_social;
    this.cnpj = cnpj;
  }
}
