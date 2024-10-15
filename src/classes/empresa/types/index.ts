// Tipos relacionados ao cadastro e atualização de empresas
export type EmpresaCreateData = {
  nome: string;
  nome_fantasia?: string;
  razao_social?: string;
  cnpj: string;
  ramo?: RamoData;
  telefones: TelefoneData[];
  emails: EmailData[];
  endereco: EnderecoData;
};

export type EmpresaUpdateData = {
  id: string;
  nome: string;
  nome_fantasia?: string;
  razao_social?: string;
  cnpj: string;
  ramo?: RamoData;
  telefones: TelefoneData[];
  emails: EmailData[];
  endereco: EnderecoData;
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
  nome: string;
};

// Tipo de dados de telefone
export type TelefoneData = {
  numero: string;
};

// Tipo de dados de email
export type EmailData = {
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
