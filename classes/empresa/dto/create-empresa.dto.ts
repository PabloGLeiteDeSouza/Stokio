export class CreateEmpresaDto {
  id?: number;
  nome_completo?: string;
  data_de_nascimento?: Date | string;
  cpf?: string;
  nome_fantasia?: string;
  razao_social?: string;
  cnpj?: string;
  ramo: string;
  id_endereco: number;

  constructor(
    ramo: string,
    id_endereco: number,
    nome_completo?: string,
    data_de_nascimento?: Date | string,
    cpf?: string,
    nome_fantasia?: string,
    razao_social?: string,
    cnpj?: string,
    id?: number,
  ) {
    this.ramo = ramo;
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
