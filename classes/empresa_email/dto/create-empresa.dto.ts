export class CreateEmpresaDto {
  id_pessoa: number;
  id_ramo: number;
  nome_fantasia?: string;
  razao_social?: string;
  cnpj?: string;

  constructor(
    id_ramo: number,
    id_pessoa: number,
    nome_fantasia?: string,
    razao_social?: string,
    cnpj?: string,
  ) {
    this.id_ramo = id_ramo;
    this.id_pessoa = id_pessoa;
    this.nome_fantasia = nome_fantasia;
    this.razao_social = razao_social;
    this.cnpj = cnpj;
  }
}
