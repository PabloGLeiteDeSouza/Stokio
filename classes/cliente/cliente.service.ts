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

export class ClienteService {
  private db: SQLiteDatabase;

  constructor(db: SQLiteDatabase) {
    this.db = db;
  }

  async create(data: IClienteCreate): Promise<void> {
    try {
      const idPessoa = await this.createOrFetchPessoa(data);
      const idEndereco = await this.createEndereco(data.endereco);
      const idCliente = await this.createCliente(data.limite, idEndereco);
      await this.linkPessoaToCliente(idPessoa, idCliente);
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
  ): Promise<number> {
    const res = await this.db.runAsync(
      'INSERT INTO cliente (limite, id_endereco) VALUES ($limite, $id_endereco)',
      {
        $limite: limite,
        $id_endereco: idEndereco,
      },
    );

    if (res.changes < 1) {
      throw new Error('Não foi possível criar o cliente');
    }

    return res.lastInsertRowId;
  }

  private async linkPessoaToCliente(
    idPessoa: number,
    idCliente: number,
  ): Promise<void> {
    const res = await this.db.runAsync(
      'INSERT INTO pessoa_cliente (id_pessoa, id_cliente) VALUES ($id_pessoa, $id_cliente)',
      {
        $id_pessoa: idPessoa,
        $id_cliente: idCliente,
      },
    );

    if (res.changes < 1) {
      throw new Error('Não foi possível vincular a pessoa ao cliente');
    }
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
}
