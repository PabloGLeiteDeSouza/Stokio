export type ClienteObject = {
  id: string;
  limite: string;
  id_endereco: string;
};

export type EnderecoObject = {
  id: string;
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
};

export type TelefoneObject = {
  id: string;
  numero: string;
};

export type EmailObject = {
  id: string;
  endereco: string;
};

export type PessoaObject = {
  id: string;
  nome: string;
  data_de_nascimento: string;
  cpf: string;
};

export type PessoaClienteObject = {
  id: string;
  id_pessoa: string;
  id_cliente: string;
};

export type ClienteEmailObject = {
  id: string;
  id_cliente: string;
  id_email: string;
};

export type ClienteTelefoneObject = {
  id: string;
  id_cliente: string;
  id_telefone: string;
};
