export interface IPessoaCreate {
  id?: string;
  nome: string;
  cpf: string;
  data_nascimento: Date;
}

export interface ISimpleCliente extends IClienteUpdateOnly {
  id_pessoa: string;
  id_endereco: string;
}

export interface IPessoaUpdate {
  id: string;
  nome: string;
  cpf: string;
  data_nascimento: Date;
}

export interface IClienteSimpleRequest {
  id: string;
  nome: string;
  cpf: string;
  data_nascimento: Date;
  saldo: string;
  id_pessoa: string;
  id_endereco: string;
}

export interface IClienteCreateOnly {
  cep: string;
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  uf: string;
  saldo: string;
}

export interface IClienteUpdateOnly {
  id: string;
  cep: string;
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  uf: string;
  saldo: string;
}

export interface IClienteCreate extends IClienteCreateOnly {
  pessoa: IPessoaCreate;
  emails: IEmail[];
  telefones: ITelefone[];
}

export interface IClienteUpdate extends IClienteUpdateOnly {
  pessoa: IPessoaUpdate;
  emails: IEmailUpdate[];
  telefones: ITelefoneUpdate[];
}

export interface IEndereco {
  cep: string;
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  uf: string;
}

export interface IEnderecoUpdate extends IEndereco {
  id: number;
}

export interface IEmail {
  endereco: string;
}

export interface IEmailUpdate extends IEmail {
  id: number;
}

export interface ITelefone {
  numero: string;
}

export interface ITelefoneUpdate extends ITelefone {
  id: number;
}
