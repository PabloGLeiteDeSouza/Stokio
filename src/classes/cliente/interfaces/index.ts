export interface IClienteCreate {
  nome: string;
  dataDeNascimento: string;
  cpf: string;
  endereco: IEndereco;
  limite: number;
  emails: IEmail[];
  telefones: ITelefone[];
}

export interface IClienteUpdate {
  id: number;
  idPessoa: number;
  nome: string;
  dataDeNascimento: string;
  cpf: string;
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
