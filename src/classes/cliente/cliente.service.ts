import { SQLiteDatabase } from 'expo-sqlite';
import {
  IClienteCreate,
  IClienteUpdate,
  IEmail,
  IEmailUpdate,
  IEndereco,
  IEnderecoUpdate,
  ITelefone,
  ITelefoneUpdate,
} from './interfaces';
import { ClienteObject } from '@/types/screens/cliente';

export class ClienteService {
  private db: SQLiteDatabase;

  constructor(db: SQLiteDatabase) {
    this.db = db;
  }

  async create(data: IClienteCreate): Promise<void> {
    try {
      const idPessoa = await this.createOrFetchPessoa(data);
      const idEndereco = await this.createEndereco(data.endereco);
      const idCliente = await this.createCliente(
        data.limite,
        idEndereco,
        idPessoa,
      );
      await this.createEmails(data.emails, idCliente);
      await this.createTelefones(data.telefones, idCliente);
    } catch (error) {
      throw new Error(`Erro ao criar cliente: ${(error as Error).message}`);
    }
  }

  private async createOrFetchPessoa(data: IClienteCreate): Promise<number> {
    const pessoaExistente = await this.db.getFirstAsync<{ id: number }>(
      'SELECT id FROM pessoa WHERE cpf = $cpf',
      { $cpf: data.cpf },
    );

    if (pessoaExistente) {
      const clienteExistente = await this.db.getFirstAsync<{ id: number }>(
        'SELECT cliente.id FROM cliente INNER JOIN pessoa_cliente ON pessoa_cliente.id_cliente = cliente.id WHERE pessoa_cliente.id_pessoa = $id_pessoa',
        { $id_pessoa: pessoaExistente.id },
      );

      if (clienteExistente) {
        throw new Error('Cliente já cadastrado!');
      }

      return pessoaExistente.id;
    }

    const res = await this.db.runAsync(
      'INSERT INTO pessoa (nome, data_de_nascimento, cpf) VALUES ($nome, $data_de_nascimento, $cpf)',
      {
        $nome: data.nome,
        $data_de_nascimento: data.dataDeNascimento,
        $cpf: data.cpf,
      },
    );

    if (res.changes < 1) {
      throw new Error('Não foi possível criar a pessoa');
    }

    return res.lastInsertRowId;
  }

  private async createEndereco(endereco: IEndereco): Promise<number> {
    const res = await this.db.runAsync(
      'INSERT INTO endereco (cep, logradouro, numero, complemento, bairro, cidade, uf) VALUES ($cep, $logradouro, $numero, $complemento, $bairro, $cidade, $uf)',
      {
        $cep: endereco.cep,
        $logradouro: endereco.logradouro,
        $numero: endereco.numero,
        $complemento: endereco.complemento || '',
        $bairro: endereco.bairro,
        $cidade: endereco.cidade,
        $uf: endereco.uf,
      },
    );

    if (res.changes < 1) {
      throw new Error('Não foi possível criar o endereço');
    }

    return res.lastInsertRowId;
  }

  private async createCliente(
    limite: number,
    idEndereco: number,
    id_pessoa: number,
  ): Promise<number> {
    const res = await this.db.runAsync(
      'INSERT INTO cliente (limite, id_endereco, id_pessoa) VALUES ($limite, $id_endereco, $id_pessoa)',
      {
        $limite: limite,
        $id_endereco: idEndereco,
        $id_pessoa: id_pessoa,
      },
    );

    if (res.changes < 1) {
      throw new Error('Não foi possível criar o cliente');
    }

    return res.lastInsertRowId;
  }

  private async createEmails(
    emails: IEmail[],
    idCliente: number,
  ): Promise<void> {
    await Promise.all(
      emails.map(async (email) => {
        const resEmail = await this.db.runAsync(
          'INSERT INTO email (endereco) VALUES ($endereco)',
          { $endereco: email.endereco },
        );

        if (resEmail.changes < 1) {
          throw new Error('Não foi possível criar o e-mail');
        }

        const resClienteEmail = await this.db.runAsync(
          'INSERT INTO cliente_email (id_cliente, id_email) VALUES ($id_cliente, $id_email)',
          { $id_cliente: idCliente, $id_email: resEmail.lastInsertRowId },
        );

        if (resClienteEmail.changes < 1) {
          throw new Error('Não foi possível vincular o e-mail ao cliente');
        }
      }),
    );
  }

  private async createTelefones(
    telefones: ITelefone[],
    idCliente: number,
  ): Promise<void> {
    await Promise.all(
      telefones.map(async (telefone) => {
        const resTelefone = await this.db.runAsync(
          'INSERT INTO telefone (numero) VALUES ($numero)',
          { $numero: telefone.numero },
        );

        if (resTelefone.changes < 1) {
          throw new Error('Não foi possível criar o telefone');
        }

        const resClienteTelefone = await this.db.runAsync(
          'INSERT INTO cliente_telefone (id_cliente, id_telefone) VALUES ($id_cliente, $id_telefone)',
          { $id_cliente: idCliente, $id_telefone: resTelefone.lastInsertRowId },
        );

        if (resClienteTelefone.changes < 1) {
          throw new Error('Não foi possível vincular o telefone ao cliente');
        }
      }),
    );
  }

  async update(data: IClienteUpdate): Promise<void> {
    try {
      await this.updateCliente(data);
      await this.updatePessoa(data);
      await this.updateEndereco(data.endereco);
      await this.updateEmails(data.emails);
      await this.updateTelefones(data.telefones);
    } catch (error) {
      throw new Error(`Erro ao atualizar cliente: ${(error as Error).message}`);
    }
  }

  private async updateCliente(data: IClienteUpdate): Promise<void> {
    const res = await this.db.runAsync(
      'UPDATE cliente SET limite = $limite, id_endereco = $id_endereco WHERE id = $id',
      {
        $id: data.id,
        $limite: data.limite,
        $id_endereco: data.endereco.id,
      },
    );

    if (res.changes < 1) {
      throw new Error('Não foi possível atualizar o cliente');
    }
  }

  private async updatePessoa(data: IClienteUpdate): Promise<void> {
    const res = await this.db.runAsync(
      'UPDATE pessoa SET nome = $nome, data_de_nascimento = $data_de_nascimento, cpf = $cpf WHERE id = $id',
      {
        $nome: data.nome,
        $data_de_nascimento: data.dataDeNascimento,
        $cpf: data.cpf,
        $id: data.idPessoa,
      },
    );

    if (res.changes < 1) {
      throw new Error('Não foi possível atualizar a pessoa');
    }
  }

  private async updateEndereco(endereco: IEnderecoUpdate): Promise<void> {
    const res = await this.db.runAsync(
      'UPDATE endereco SET logradouro = $logradouro, numero = $numero, complemento = $complemento, bairro = $bairro, cidade = $cidade, uf = $uf WHERE id = $id',
      {
        $logradouro: endereco.logradouro,
        $numero: endereco.numero,
        $complemento: endereco.complemento || '',
        $bairro: endereco.bairro,
        $cidade: endereco.cidade,
        $uf: endereco.uf,
        $id: endereco.id,
      },
    );

    if (res.changes < 1) {
      throw new Error('Não foi possível atualizar o endereço');
    }
  }

  private async updateEmails(emails: IEmailUpdate[]): Promise<void> {
    await Promise.all(
      emails.map(async (email) => {
        const res = await this.db.runAsync(
          'UPDATE email SET endereco = $endereco WHERE id = $id',
          { $endereco: email.endereco, $id: email.id },
        );

        if (res.changes < 1) {
          throw new Error('Não foi possível atualizar o e-mail');
        }
      }),
    );
  }

  private async updateTelefones(telefones: ITelefoneUpdate[]): Promise<void> {
    await Promise.all(
      telefones.map(async (telefone) => {
        const res = await this.db.runAsync(
          'UPDATE telefone SET numero = $numero WHERE id = $id',
          { $numero: telefone.numero, $id: telefone.id },
        );

        if (res.changes < 1) {
          throw new Error('Não foi possível atualizar o telefone');
        }
      }),
    );
  }

  // Método de deleção de cliente
  async deleteCliente(id: number): Promise<void> {
    try {
      await this.db.runAsync(
        'DELETE FROM cliente_telefone WHERE id_cliente = $id',
        { $id: id },
      );
      await this.db.runAsync(
        'DELETE FROM cliente_email WHERE id_cliente = $id',
        { $id: id },
      );

      const enderecoResult = await this.db.getFirstAsync<{
        id_endereco: number;
      }>('SELECT id_endereco FROM cliente WHERE id = $id', { $id: id });

      await this.db.runAsync('DELETE FROM endereco WHERE id = $id_endereco', {
        $id_endereco: Number(enderecoResult?.id_endereco),
      });

      await this.db.runAsync(
        'DELETE FROM pessoa WHERE id = (SELECT id_pessoa FROM cliente WHERE id = $id)',
        { $id: id },
      );
      await this.db.runAsync('DELETE FROM cliente WHERE id = $id', { $id: id });
    } catch (error) {
      throw new Error(`Erro ao deletar cliente: ${(error as Error).message}`);
    }
  }

  // Consultas personalizadas
  async findClienteByName(nome: string): Promise<Array<unknown>> {
    try {
      const result = await this.db.getAllAsync(
        `SELECT * FROM cliente 
         INNER JOIN pessoa ON cliente.id_pessoa = pessoa.id 
         WHERE pessoa.nome LIKE '%' || $nome || '%'`,
        { $nome: nome },
      );
      return result;
    } catch (error) {
      throw new Error(
        `Erro ao buscar cliente por nome: ${(error as Error).message}`,
      );
    }
  }

  async findClienteByCPF(cpf: string): Promise<unknown> {
    try {
      const result = await this.db.getAllAsync(
        `SELECT * FROM cliente 
         INNER JOIN pessoa ON cliente.id_pessoa = pessoa.id 
         WHERE pessoa.cpf = $cpf`,
        { $cpf: cpf },
      );
      return result;
    } catch (error) {
      throw new Error(
        `Erro ao buscar cliente por CPF: ${(error as Error).message}`,
      );
    }
  }

  async findClienteByDataNascimento(
    dataDeNascimento: string,
  ): Promise<unknown> {
    try {
      const result = await this.db.getAllAsync(
        `SELECT * FROM cliente 
         INNER JOIN pessoa ON cliente.id_pessoa = pessoa.id 
         WHERE pessoa.data_de_nascimento = $dataDeNascimento`,
        { $dataDeNascimento: dataDeNascimento },
      );
      return result;
    } catch (error) {
      throw new Error(
        `Erro ao buscar cliente por data de nascimento: ${(error as Error).message}`,
      );
    }
  }

  async findAllClientes(): Promise<Array<ClienteObject>> {
    try {
      const result = await this.db.getAllAsync(
        `SELECT cliente.*, pessoa.nome, pessoa.cpf, pessoa.data_de_nascimento
         FROM cliente
         INNER JOIN pessoa ON cliente.id_pessoa = pessoa.id`,
      );
      return result;
    } catch (error) {
      throw new Error(
        `Erro ao buscar todos os clientes: ${(error as Error).message}`,
      );
    }
  }
}
