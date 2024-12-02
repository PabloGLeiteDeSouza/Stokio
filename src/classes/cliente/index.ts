import { SQLiteDatabase } from 'expo-sqlite';
import { ClienteCreateDataObject, ClienteUpdateDataObject } from './interfaces';
import {
  ClienteObject,
  EmailObject,
  EnderecoObject,
  PessoaObject,
  TelefoneObject,
} from './types';

export class Cliente {
  db: SQLiteDatabase;

  constructor(db: SQLiteDatabase) {
    this.db = db;
  }

  async create(dados: ClienteCreateDataObject) {
    try {
      // Verifica se já existe uma pessoa com o CPF informado
      const pessoaExistente = await this.db.getFirstAsync<PessoaObject>(
        'SELECT id FROM pessoa WHERE cpf = $cpf',
        { $cpf: dados.cpf },
      );

      let id_pessoa: number;

      if (pessoaExistente) {
        // Verifica se a pessoa já está vinculada como cliente
        const clienteExistente = await this.db.getFirstAsync<ClienteObject>(
          'SELECT cliente.id FROM cliente INNER JOIN pessoa_cliente ON pessoa_cliente.id_cliente = cliente.id WHERE pessoa_cliente.id_pessoa = $id_pessoa',
          { $id_pessoa: pessoaExistente.id },
        );

        if (clienteExistente) {
          throw new Error('Cliente já cadastrado!');
        }

        // Usa a pessoa existente para criar o vínculo com cliente
        id_pessoa = Number(pessoaExistente.id);
      } else {
        // Se não existir a pessoa, cria um novo registro de pessoa
        const res_pss = await this.db.runAsync(
          'INSERT INTO pessoa (nome, data_de_nascimento, cpf) VALUES ($nome, $data_de_nascimento, $cpf)',
          {
            $nome: dados.nome,
            $data_de_nascimento: String(dados.data_de_nascimento),
            $cpf: dados.cpf,
          },
        );
        if (res_pss.changes < 1) {
          throw new Error('Não foi possível criar a pessoa!');
        }
        id_pessoa = res_pss.lastInsertRowId;
      }

      // Inserção do endereço
      const { bairro, cep, cidade, logradouro, numero, uf, complemento } =
        dados.endereco;

      const res_end = await this.db.runAsync(
        'INSERT INTO endereco (cep, logradouro, numero, complemento, bairro, cidade, uf) VALUES ($cep, $logradouro, $numero, $complemento, $bairro, $cidade, $uf)',
        {
          $cep: cep,
          $logradouro: logradouro,
          $numero: numero,
          $complemento: String(complemento),
          $bairro: bairro,
          $cidade: cidade,
          $uf: uf,
        },
      );

      if (res_end.changes < 1) {
        throw new Error('Não foi possível criar o endereço!');
      }
      const id_endereco = res_end.lastInsertRowId;

      // Inserção do cliente
      const res_cli = await this.db.runAsync(
        'INSERT INTO cliente (limite, id_endereco) VALUES ($limite, $id_endereco)',
        { $limite: dados.limite, $id_endereco: id_endereco },
      );

      if (res_cli.changes < 1) {
        throw new Error('Não foi possível criar o cliente!');
      }

      const id_cliente = res_cli.lastInsertRowId;

      // Vincula a pessoa ao cliente
      const res_pss_cli = await this.db.runAsync(
        'INSERT INTO pessoa_cliente (id_pessoa, id_cliente) VALUES ($id_pessoa, $id_cliente)',
        {
          $id_pessoa: id_pessoa,
          $id_cliente: id_cliente,
        },
      );

      if (res_pss_cli.changes < 1) {
        throw new Error('Não foi possível vincular pessoa ao cliente!');
      }

      // Inserção dos e-mails
      await Promise.all(
        dados.emails.map(async (email) => {
          const res_email = await this.db.runAsync(
            'INSERT INTO email (endereco) VALUES ($endereco)',
            { $endereco: email.endereco },
          );
          if (res_email.changes < 1) {
            throw new Error('Não foi possível criar o e-mail!');
          }

          const id_email = res_email.lastInsertRowId;
          const res_cliente_email = await this.db.runAsync(
            'INSERT INTO cliente_email (id_cliente, id_email) VALUES ($id_cliente, $id_email)',
            { $id_cliente: id_cliente, $id_email: id_email },
          );
          if (res_cliente_email.changes < 1) {
            throw new Error('Não foi possível vincular o e-mail ao cliente!');
          }
        }),
      );

      // Inserção dos telefones
      await Promise.all(
        dados.telefones.map(async (telefone) => {
          const res_telefone = await this.db.runAsync(
            'INSERT INTO telefone (numero) VALUES ($numero)',
            { $numero: telefone.numero },
          );
          if (res_telefone.changes < 1) {
            throw new Error('Não foi possível criar o telefone!');
          }

          const id_telefone = res_telefone.lastInsertRowId;
          const res_cliente_telefone = await this.db.runAsync(
            'INSERT INTO cliente_telefone (id_cliente, id_telefone) VALUES ($id_cliente, $id_telefone)',
            { $id_cliente: id_cliente, $id_telefone: id_telefone },
          );
          if (res_cliente_telefone.changes < 1) {
            throw new Error('Não foi possível vincular o telefone ao cliente!');
          }
        }),
      );
    } catch (error) {
      throw error; // Lança o erro caso alguma etapa falhe
    }
  }

  async update(dados: ClienteUpdateDataObject) {
    try {
      const res_cliente = await this.db.runAsync(
        'UPDATE cliente SET limite = $limite, id_endereco = $id_endereco WHERE id = $id',
        {
          $id: String(dados.id),
          $limite: String(dados.limite),
          $id_endereco: String(Number(dados.endereco.id)),
        },
      );
      const res_pessoa = await this.db.runAsync(
        'UPDATE pessoa SET nome = $nome, data_de_nascimento = $data_de_nascimento, $cpf = $cpf WHERE id = $id',
        {
          $nome: dados.nome,
          $data_de_nascimento: dados.data_de_nascimento,
          $cpf: dados.cpf,
          $id: dados.id_pessoa,
        },
      );
      const res_end = await this.db.runAsync(
        'UPDATE endereco SET logradouro = $logradouro, $numero = $numero, $complemento = $complemento, bairro = $bairro, cidade = $cidade, uf = $uf WHERE id = $id',
        {
          $logradouro: dados.endereco.logradouro,
          $numero: dados.endereco.numero,
          $complemento: String(dados.endereco.complemento),
          $bairro: dados.endereco.bairro,
          $cidade: dados.endereco.cidade,
          $uf: dados.endereco.uf,
          $id: dados.endereco.id,
        },
      );
      if (res_pessoa.changes < 1) {
        throw new Error('Nao foi possivel atualizar a pessoa tente novamente!');
      }
      if (res_cliente.changes < 1) {
        throw new Error(
          'Nao foi possivel atualizar o cliente tente novamente!',
        );
      }
      if (res_end.changes < 1) {
        throw new Error(
          'Nao foi possivel atualizar o endereco tente novamente!',
        );
      }
      await Promise.all(
        dados.emails.map(async (email) => {
          try {
            const res_email = await this.db.runAsync(
              'UPDATE email SET endereco = $endereco WHERE id = $id',
              { $endereco: email.endereco, id: email.id },
            );
            if (res_email.changes < 1) {
              throw new Error(
                'Nao foi possivel atualizar o email tente novamente!',
              );
            }
          } catch (error) {
            throw error;
          }
        }),
      );
      await Promise.all(
        dados.telefones.map(async (telefone) => {
          try {
            const res_email = await this.db.runAsync(
              'UPDATE telefone SET numero = $numero WHERE id = $id',
              { $numero: telefone.numero, id: telefone.id },
            );
            if (res_email.changes < 1) {
              throw new Error(
                'Nao foi possivel atualizar o telefone tente novamente!',
              );
            }
          } catch (error) {
            throw error;
          }
        }),
      );
    } catch (error) {
      throw error;
    }
  }

  async findClienteToUpdate(
    id_cliente: number,
  ): Promise<ClienteUpdateDataObject> {
    try {
      // Buscar dados do cliente, incluindo o limite e o id_endereco
      const cliente = await this.db.getFirstAsync<ClienteObject>(
        `SELECT cliente.limite, cliente.id_endereco
         FROM cliente
         WHERE cliente.id = $id_cliente`,
        { $id_cliente: id_cliente },
      );

      if (!cliente) {
        throw new Error('Cliente não encontrado!');
      }

      // Buscar dados da pessoa relacionados ao cliente através da tabela pessoa_cliente
      const pessoa = await this.db.getFirstAsync<PessoaObject>(
        `SELECT pessoa.id as id_pessoa, pessoa.nome, pessoa.data_de_nascimento, pessoa.cpf
         FROM pessoa
         INNER JOIN pessoa_cliente ON pessoa.id = pessoa_cliente.id_pessoa
         WHERE pessoa_cliente.id_cliente = $id_cliente`,
        { $id_cliente: id_cliente },
      );

      if (!pessoa) {
        throw new Error('Dados da pessoa não encontrados!');
      }

      // Buscar dados do endereço
      const endereco = await this.db.getFirstAsync<EnderecoObject>(
        `SELECT id, cep, logradouro, numero, complemento, bairro, cidade, uf
         FROM endereco
         WHERE id = $id_endereco`,
        { $id_endereco: cliente.id_endereco },
      );

      if (!endereco) {
        throw new Error('Endereço não encontrado!');
      }

      // Buscar emails do cliente
      const emails = await this.db.getAllAsync<EmailObject>(
        `SELECT email.id, email.endereco
         FROM email
         INNER JOIN cliente_email ON email.id = cliente_email.id_email
         WHERE cliente_email.id_cliente = $id_cliente`,
        { $id_cliente: id_cliente },
      );

      if (!emails || emails.length === 0) {
        throw new Error('Emails não encontrados!');
      }

      // Buscar telefones do cliente
      const telefones = await this.db.getAllAsync<TelefoneObject>(
        `SELECT telefone.id, telefone.numero
         FROM telefone
         INNER JOIN cliente_telefone ON telefone.id = cliente_telefone.id_telefone
         WHERE cliente_telefone.id_cliente = $id_cliente`,
        { $id_cliente: id_cliente },
      );

      if (!telefones || telefones.length === 0) {
        throw new Error('Telefones não encontrados!');
      }

      // Retornar todos os dados necessários para atualização
      return {
        id_pessoa: String(pessoa.id),
        ...pessoa,
        ...cliente,
        endereco,
        emails,
        telefones,
      };
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<ClienteUpdateDataObject[]> {
    try {
      // Buscar todos os ids de clientes
      const clientes = await this.db.getAllAsync<ClienteObject>(
        `SELECT cliente.id, cliente.limite, cliente.id_endereco, pessoa.id as id_pessoa, pessoa.nome, pessoa.data_de_nascimento, pessoa.cpf
         FROM cliente
         INNER JOIN pessoa_cliente ON cliente.id = pessoa_cliente.id_cliente
         INNER JOIN pessoa ON pessoa_cliente.id_pessoa = pessoa.id`,
      );

      if (!clientes || clientes.length === 0) {
        throw new Error('Nenhum cliente encontrado!');
      }

      // Para cada cliente, buscar seus emails, telefones e endereço
      return await Promise.all(
        clientes.map(async (cliente) => {
          // Buscar dados pessoa
          const pessoa = await this.db.getFirstAsync<PessoaObject>(
            `SELECT pessoa.id as id_pessoa, pessoa.nome, pessoa.data_de_nascimento, pessoa.cpf
             FROM pessoa
             INNER JOIN pessoa_cliente ON pessoa.id = pessoa_cliente.id_pessoa
             WHERE pessoa_cliente.id_cliente = $id_cliente`,
            { $id_cliente: cliente.id },
          );

          if (!pessoa) {
            throw new Error('Dados da pessoa não encontrados!');
          }
          // Buscar dados do endereço
          const endereco = await this.db.getFirstAsync<EnderecoObject>(
            `SELECT id, cep, logradouro, numero, complemento, bairro, cidade, uf
             FROM endereco
             WHERE id = $id_endereco`,
            { $id_endereco: cliente.id_endereco },
          );

          if (!endereco) {
            throw new Error('Endereço não encontrado!');
          }

          // Buscar emails do cliente
          const emails = await this.db.getAllAsync<EmailObject>(
            `SELECT email.id, email.endereco
             FROM email
             INNER JOIN cliente_email ON email.id = cliente_email.id_email
             WHERE cliente_email.id_cliente = $id_cliente`,
            { $id_cliente: cliente.id },
          );

          if (!emails || emails.length === 0) {
            throw new Error('Emails não encontrados!');
          }

          // Buscar telefones do cliente
          const telefones = await this.db.getAllAsync<TelefoneObject>(
            `SELECT telefone.id, telefone.numero
             FROM telefone
             INNER JOIN cliente_telefone ON telefone.id = cliente_telefone.id_telefone
             WHERE cliente_telefone.id_cliente = $id_cliente`,
            { $id_cliente: cliente.id },
          );

          if (!telefones || telefones.length === 0) {
            throw new Error('Telefones não encontrados!');
          }

          return {
            ...pessoa,
            id_pessoa: String(pessoa.id),
            ...cliente,
            endereco,
            emails,
            telefones,
          };
        }),
      );
    } catch (error) {
      throw error;
    }
  }

  async findAllByNome(nome: string): Promise<Array<ClienteUpdateDataObject>> {
    try {
      // Buscar todos os clientes pelo nome
      const clientes = await this.db.getAllAsync<ClienteObject>(
        `SELECT cliente.id, cliente.limite, cliente.id_endereco, pessoa.id as id_pessoa, pessoa.nome, pessoa.data_de_nascimento, pessoa.cpf
         FROM cliente
         INNER JOIN pessoa_cliente ON cliente.id = pessoa_cliente.id_cliente
         INNER JOIN pessoa ON pessoa_cliente.id_pessoa = pessoa.id
         WHERE pessoa.nome LIKE $nome`,
        { $nome: `%${nome}%` },
      );

      if (!clientes || clientes.length === 0) {
        throw new Error('Nenhum cliente encontrado com o nome informado!');
      }

      // Reutilizando a mesma lógica do método findAll para cada cliente encontrado
      return await Promise.all(
        clientes.map(async (cliente) => {
          // Buscar dados pessoa
          const pessoa = await this.db.getFirstAsync<PessoaObject>(
            `SELECT pessoa.id as id_pessoa, pessoa.nome, pessoa.data_de_nascimento, pessoa.cpf
             FROM pessoa
             INNER JOIN pessoa_cliente ON pessoa.id = pessoa_cliente.id_pessoa
             WHERE pessoa_cliente.id_cliente = $id_cliente`,
            { $id_cliente: cliente.id },
          );

          if (!pessoa) {
            throw new Error('Dados da pessoa não encontrados!');
          }

          // Buscar dados do endereço
          const endereco = await this.db.getFirstAsync<EnderecoObject>(
            `SELECT id, cep, logradouro, numero, complemento, bairro, cidade, uf
             FROM endereco
             WHERE id = $id_endereco`,
            { $id_endereco: cliente.id_endereco },
          );

          if (!endereco) {
            throw new Error('Endereço não encontrado!');
          }

          // Buscar emails do cliente
          const emails = await this.db.getAllAsync<EmailObject>(
            `SELECT email.id, email.endereco
             FROM email
             INNER JOIN cliente_email ON email.id = cliente_email.id_email
             WHERE cliente_email.id_cliente = $id_cliente`,
            { $id_cliente: cliente.id },
          );

          if (!emails || emails.length === 0) {
            throw new Error('Emails não encontrados!');
          }

          // Buscar telefones do cliente
          const telefones = await this.db.getAllAsync<TelefoneObject>(
            `SELECT telefone.id, telefone.numero
             FROM telefone
             INNER JOIN cliente_telefone ON telefone.id = cliente_telefone.id_telefone
             WHERE cliente_telefone.id_cliente = $id_cliente`,
            { $id_cliente: cliente.id },
          );

          if (!telefones || telefones.length === 0) {
            throw new Error('Telefones não encontrados!');
          }

          return {
            ...pessoa,
            id_pessoa: String(pessoa.id),
            ...cliente,
            endereco,
            emails,
            telefones,
          };
        }),
      );
    } catch (error) {
      throw error;
    }
  }

  async findByCpf(cpf: string): Promise<ClienteUpdateDataObject> {
    try {
      // Buscar o cliente pelo CPF
      const cliente = await this.db.getFirstAsync<ClienteObject>(
        `SELECT cliente.id, cliente.limite, cliente.id_endereco, pessoa.id as id_pessoa, pessoa.nome, pessoa.data_de_nascimento, pessoa.cpf
         FROM cliente
         INNER JOIN pessoa_cliente ON cliente.id = pessoa_cliente.id_cliente
         INNER JOIN pessoa ON pessoa_cliente.id_pessoa = pessoa.id
         WHERE pessoa.cpf = $cpf`,
        { $cpf: cpf },
      );

      if (!cliente) {
        throw new Error('Cliente não encontrado com o CPF informado!');
      }

      const pessoa = await this.db.getFirstAsync<PessoaObject>(
        `SELECT pessoa.id as id_pessoa, pessoa.nome, pessoa.data_de_nascimento, pessoa.cpf
         FROM pessoa
         INNER JOIN pessoa_cliente ON pessoa.id = pessoa_cliente.id_pessoa
         WHERE pessoa_cliente.id_cliente = $id_cliente`,
        { $id_cliente: cliente.id },
      );

      if (!pessoa) {
        throw new Error('Dados da pessoa não encontrados!');
      }

      // Buscar dados do endereço
      const endereco = await this.db.getFirstAsync<EnderecoObject>(
        `SELECT id, cep, logradouro, numero, complemento, bairro, cidade, uf
         FROM endereco
         WHERE id = $id_endereco`,
        { $id_endereco: cliente.id_endereco },
      );

      if (!endereco) {
        throw new Error('Endereço não encontrado!');
      }

      // Buscar emails do cliente
      const emails = await this.db.getAllAsync<EmailObject>(
        `SELECT email.id, email.endereco
         FROM email
         INNER JOIN cliente_email ON email.id = cliente_email.id_email
         WHERE cliente_email.id_cliente = $id_cliente`,
        { $id_cliente: cliente.id },
      );

      if (!emails || emails.length === 0) {
        throw new Error('Emails não encontrados!');
      }

      // Buscar telefones do cliente
      const telefones = await this.db.getAllAsync<TelefoneObject>(
        `SELECT telefone.id, telefone.numero
         FROM telefone
         INNER JOIN cliente_telefone ON telefone.id = cliente_telefone.id_telefone
         WHERE cliente_telefone.id_cliente = $id_cliente`,
        { $id_cliente: cliente.id },
      );

      if (!telefones || telefones.length === 0) {
        throw new Error('Telefones não encontrados!');
      }

      // Retornar o cliente com os dados completos
      return {
        ...pessoa,
        id_pessoa: String(pessoa.id),
        ...cliente,
        endereco,
        emails,
        telefones,
      };
    } catch (error) {
      throw error;
    }
  }

  async delete(id_cliente: number) {
    try {
      // Deletar relacionamento entre cliente e pessoa
      await this.db.runAsync(
        'DELETE FROM pessoa_cliente WHERE id_cliente = $id_cliente',
        { $id_cliente: id_cliente },
      );

      // Deletar emails associados ao cliente
      await this.db.runAsync(
        'DELETE FROM email WHERE id IN (SELECT id_email FROM cliente_email WHERE id_cliente = $id_cliente)',
        { $id_cliente: id_cliente },
      );

      // Deletar relacionamento entre cliente e emails
      await this.db.runAsync(
        'DELETE FROM cliente_email WHERE id_cliente = $id_cliente',
        { $id_cliente: id_cliente },
      );

      // Deletar telefones associados ao cliente
      await this.db.runAsync(
        'DELETE FROM telefone WHERE id IN (SELECT id_telefone FROM cliente_telefone WHERE id_cliente = $id_cliente)',
        { $id_cliente: id_cliente },
      );

      // Deletar relacionamento entre cliente e telefones
      await this.db.runAsync(
        'DELETE FROM cliente_telefone WHERE id_cliente = $id_cliente',
        { $id_cliente: id_cliente },
      );

      // Deletar cliente
      const res_cliente = await this.db.runAsync(
        'DELETE FROM cliente WHERE id = $id_cliente',
        { $id_cliente: id_cliente },
      );

      if (res_cliente.changes < 1) {
        throw new Error('Não foi possível deletar o cliente!');
      }
    } catch (error) {
      throw error;
    }
  }
}
