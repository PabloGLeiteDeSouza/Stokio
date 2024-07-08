export class CreateEmpresaDto {
  id?: number;
  nome_completo?: string;
  data_de_nascimento?: Date;
  cpf?: string;
  nome_fantasia?: string;
  razao_social?: string;
  cnpj?: string;
  id_endereco: number;

  constructor(id_endereco: number, id?: number) {
    this.id_endereco = id_endereco;
    this.id = id;
  }

  public get_id() {
    return this.id;
  }

  public set_id(id: number) {
    this.id = id;
  }

  public set_nome_completo(nome_completo: string) {
    this.nome_completo = nome_completo;
  }

  public get_nome_completo() {
    return this.nome_completo;
  }

  public set_data_de_nascimento(data_de_nascimento: Date) {
    this.data_de_nascimento = data_de_nascimento;
  }

  public get_data_de_nascimento() {
    return this.data_de_nascimento;
  }

  public set_cpf(cpf: string) {
    this.cpf = cpf;
  }

  public get_cpf() {
    return this.cpf;
  }

  public set_nome_fantasia(nome_fantasia: string) {
    this.nome_fantasia = nome_fantasia;
  }

  public get_nome_fantasia() {
    return this.nome_fantasia;
  }

  public set_razao_social(razao_social: string) {
    this.razao_social = razao_social;
  }

  public get_razao_social() {
    return this.razao_social;
  }

  public set_cnpj(cnpj: string) {
    this.cnpj = cnpj;
  }

  public get_cnpj() {
    return this.cnpj;
  }
}
