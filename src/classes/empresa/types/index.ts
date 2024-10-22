// Tipos relacionados ao cadastro e atualização de empresas
export type Empresa = {
  id: number;
  razao_social: string;
  nome_fantasia: string;
  cnpj?: string;
  cep: string;
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  uf: string;
  id_ramo: number;
  id_pessoa: number;
};

export type Pessoa = {
  id: number;
  nome: string;
  data_nascimento: Date;
  cpf: string;
};

export type Ramo = {
  id: number;
  nome: string;
};

export type Telefone = {
  id: number;
  numero: string;
};

export type Email = {
  id: number;
  endereco: string;
};

export type PessoaCreate = Omit<Pessoa, 'id'> & {
  id: string;
};

export type RamoCreate = Omit<Ramo, 'id'> & {
  id: string;
};

export type TelefoneCreate = Omit<Telefone, 'id'> & {
  id: string;
};

export type EmailCreate = Omit<Email, 'id'> & {
  id: string;
};

export type EmpresaCreate = Omit<Empresa, 'id' | 'id_ramo' | 'id_pessoa'> & {
  pessoa: Partial<PessoaCreate>;
  ramo: Partial<RamoCreate>;
  telefones: Array<Omit<Telefone, 'id'>>;
  emails: Array<Omit<Email, 'id'>>;
};

export type EmpresaUpdate = Omit<Empresa, 'id_pessoa' | 'id_ramo'> & {
  pessoa: Pessoa;
  ramo: Ramo;
  telefones: Array<Telefone>;
  emails: Array<Email>;
};

export type EmpresaSearchRelatinalPessoa = {
  id: number;
  nome_fantasia: string;
  razao_social: string;
  cpf: string;
  cnpj?: string;
};

export type EmpresaSimpleDataResult = {
  id: number;
  nome_fantasia: string;
  razao_social: string;
  cpf: string;
  cnpj?: string;
  id_endereco: number;
  id_pessoa: number;
  id_ramo: number;
};

export type EnderecoDataResult = {
  id: number;
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
};

// Tipos de critério de busca de empresa
export type EmpresaSearchCriteria = {
  cpf?: string;
  cnpj?: string;
  nome?: string;
  nome_fantasia?: string;
  razao_social?: string;
};

// Tipo de dados de um ramo
export type RamoData = {
  id?: number;
  nome?: string;
};

export type RamoDataUpdate = {
  id: number;
  nome: string;
};

// Tipo de dados de telefone
export type TelefoneData = {
  numero: string;
};

export type TelefoneDataUpdate = {
  id: number;
  numero: string;
};

// Tipo de dados de email
export type EmailData = {
  endereco: string;
};

// Tipo de dados de email
export type EmailDataUpdate = {
  id: number;
  endereco: string;
};

// Tipo de dados de endereço
export type EnderecoData = {
  cep: number;
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  uf: string;
};

// Tipo de dados de endereço Update
export type EnderecoDataUpdate = {
  id: number;
  cep: string;
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  uf: string;
};

// Objetos de resposta do banco de dados
export type EmpresaObject = {
  id: number;
  nome: string;
  nome_fantasia?: string;
  razao_social?: string;
  cnpj: string;
  id_ramo?: number;
  id_pessoa?: number;
};

export type RamoObject = {
  id: number;
  nome: string;
};

export type EmailObject = {
  id: number;
  endereco: string;
};

export type TelefoneObject = {
  id: number;
  numero: string;
};

export type EnderecoObject = {
  id: number;
  cep: string;
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  uf: string;
};

export type SeachParamsEmpresa = {
  $cpf?: string;
  $cnpj?: string;
  $nome?: string;
  $nome_fantasia?: string;
  $razao_social?: string;
};

export type EmpresaDataTableResult = {
  id: number;
  nome_fantasia: string;
  razao_social: string;
  cnpj?: string;
  cep: string;
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  uf: string;
  id_ramo: number;
  id_pessoa: number;
  id_endereco: number;
};
