export interface IPessoaCreate {
  id?: string;
  nome: string;
  cpf: string;
  data_nascimento: string;
}

export interface ISimpleCliente {
  id: string;
  id_pessoa: string;
  id_endereco: string;
  limite: string;
}

export interface IPessoaUpdate {
  id: string;
  nome: string;
  cpf: string;
  data_nascimento: string;
}

export interface IClienteSimpleRequest {
  id: string;
  pessoa: IPessoaCreate;
  limite: string;
}

export interface IClienteCreate {
  pessoa: IPessoaCreate;
  endereco: IEndereco;
  limite: string;
  emails: IEmail[];
  telefones: ITelefone[];
}

export interface IClienteUpdate {
  id: number;
  pessoa: IPessoaUpdate;
  endereco: IEnderecoUpdate;
  limite: number;
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
