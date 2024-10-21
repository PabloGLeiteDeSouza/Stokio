// Tipos relacionados ao cadastro e atualização de empresas
export type EmpresaCreateData = {
  pessoa: {
    id?: string;
    nome?: string;
    data_nascimento?: Date;
    cpf?: string;
  };
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
  ramo: RamoData;
  telefones: TelefoneData[];
  emails: EmailData[];
};

export type EmpresaSimpleData = {
  id: string;
  nome_fantasia: string;
  razao_social: string;
  cpf: string;
  cnpj?: string;
};

export type EmpresaSimpleDataResult = {
  id: string;
  nome_fantasia: string;
  razao_social: string;
  cpf: string;
  cnpj?: string;
  id_endereco: string;
  id_pessoa: string;
  id_ramo: string;
};

export type PessoaDataResult = {
  id: string;
  nome: string;
  data_nascimento: string;
  cpf: string;
};

export type EnderecoDataResult = {
  id: string;
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
};

export type EmpresaUpdateData = {
  id: string;
  nome: string;
  nome_fantasia: string;
  razao_social: string;
  cnpj: string;
  pessoa: PessoaDataResult;
  ramo: RamoDataUpdate;
  telefones: TelefoneDataUpdate[];
  emails: EmailDataUpdate[];
  endereco: EnderecoDataUpdate;
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
  id?: string;
  nome?: string;
};

export type RamoDataUpdate = {
  id: string;
  nome: string;
};

// Tipo de dados de telefone
export type TelefoneData = {
  numero: string;
};

export type TelefoneDataUpdate = {
  id: string;
  numero: string;
};

// Tipo de dados de email
export type EmailData = {
  endereco: string;
};

// Tipo de dados de email
export type EmailDataUpdate = {
  id: string;
  endereco: string;
};

// Tipo de dados de endereço
export type EnderecoData = {
  cep: string;
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  uf: string;
};

// Tipo de dados de endereço Update
export type EnderecoDataUpdate = {
  id: string;
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
  id: string;
  nome_fantasia: string;
  razao_social: string;
  cnpj: string;
  id_ramo: string;
  id_pessoa: string;
  id_endereco: string;
};
